<template>
  <div class="detail-container">
    <table class="table table-hover align-middle">
      <thead>
        <th>장비 ID</th>
        <th>일자</th>
        <th>데이터 취득률</th>
        <th>용접 시간</th>
        <th>평균 전력</th>
        <th>평균 전압</th>
        <th>실제 사용 전압</th>
        <th>와이어 사용 속도</th>
        <th>사용 전 와이어</th>
        <th>와이어 사용량</th>
        <th>사용 후 와이어</th>
        <th>사용 전력량</th>
      </thead>
      <tbody>
        <tr v-for="data in state.datas" :key="data">
          <td>{{ data.eqp_id }}</td>
          <td>{{ data.date }}</td>
          <td>{{ data.acquisition_rate }}</td>
          <td>{{ data.welding_time }}</td>
          <td>{{ data.avg_amp }}</td>
          <td>{{ data.avg_volt }}</td>
          <td>{{ data.avg_welding_volt }}</td>
          <td>{{ data.avg_wirespeed }}</td>
          <td>{{ data.sum_wire }}</td>
          <td>{{ data.sum_inching_wire }}</td>
          <td>{{ data.sum_total_wire }}</td>
          <td>{{ (data.avg_volt * data.avg_amp).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { onMounted } from 'vue-demi';
import api from '../../../api/api';
import axios from 'axios';

export default {
  components: {},
  props: ['data'],
  setup(props) {
    let store = useStore();
    let url = store.getters.url;

    let state = reactive({
      url: url,
      detail: props.data,
      datas: [],
    });

    onMounted(async () => {
      if (props.data.eqp_id === undefined) {
        return;
      }

      let kind;
      if (props.data.eqp_id.slice(0, 3) === 'GBS') {
        kind = 'gbs03';
      } else {
        kind = 'tbar';
      }

      await axios
        .get(
          url + '/welding/' + kind + '/measure?eqp_id=' + props.data.eqp_id,
          {
            headers: {
              Authorization: 'Bearer ' + api.getCookie('auth'),
            },
          }
        )
        .then((response) => {
          state.datas = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return { state };
  },
};
</script>

<style scoped>
.detail-container {
  display: grid;
  column-gap: 10px;
}

.container-fluid {
  height: 500px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.container-fluid::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.form-control {
  background-color: white !important;
}

.location {
  grid-column: 1 / 3;
}

.form-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  width: 100%;
}

.label-input {
  grid-column: 1 / 3;
}

.btn {
  height: 58px;
}

.div_date {
  width: 50%;
  display: inline;
}

.divide {
  width: 23%;
  margin-left: 2%;
  display: inline;
}
</style>

<template>
  <div class="welding-list">
    <div class="container-fluid">
      <div class="table-top">
        <h4 style="float: left">GBS03</h4>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="width: 40%; float: right; margin-right: 0px"
        />
      </div>
      <table class="table table-hover align-middle">
        <thead>
          <th>용접기 ID</th>
          <th>최종사용 시간</th>
          <th>사용부서</th>
          <th>대여</th>
          <th>예약</th>
        </thead>
        <tbody>
          <tr v-for="data in state.gbs03" :key="data">
            <td v-on:click="click(data)">{{ data.eqp_id }}</td>
            <td v-on:click="click(data)">{{ data.last_timestamp }}</td>
            <td v-on:click="click(data)" style="width: 25%">
              {{ data.department }}
            </td>
            <td v-if="data.use_yn === 0">
              <button class="btn btn-primary" v-on:click="rent.click(data)">
                대여하기
              </button>
            </td>
            <td style="width: 120px" v-else-if="checkDepartment(data)">
              <button class="btn btn-warning" v-on:click="returnWelding(data)">
                반납하기
              </button>
            </td>
            <td style="width: 120px" v-else>
              <button class="btn btn-secondary" disabled>사용중</button>
            </td>
            <td style="width: 120px">
              <button class="btn btn-success" v-on:click="reserve.click(data)">
                예약하기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container-fluid">
      <div class="table-top">
        <h4 style="float: left">TBAR</h4>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="width: 40%; float: right; margin-right: 0px"
        />
      </div>
      <table class="table table-hover align-middle">
        <thead>
          <th>용접기 ID</th>
          <th>최종사용 시간</th>
          <th>사용부서</th>
          <th>대여</th>
          <th>예약</th>
        </thead>
        <tbody>
          <tr v-for="data in state.tbar" :key="data">
            <td v-on:click="click(data)">{{ data.eqp_id }}</td>
            <td v-on:click="click(data)">{{ data.last_timestamp }}</td>
            <td v-on:click="click(data)">{{ data.department }}</td>
            <td v-if="data.use_yn === 0">
              <button class="btn btn-primary" v-on:click="rent.click(data)">
                대여하기
              </button>
            </td>
            <td style="width: 120px" v-else-if="checkDepartment(data)">
              <button class="btn btn-warning" v-on:click="returnWelding(data)">
                반납하기
              </button>
            </td>
            <td style="width: 120px" v-else>
              <button class="btn btn-secondary" disabled>사용중</button>
            </td>
            <td style="width: 120px">
              <button class="btn btn-success" v-on:click="reserve.click(data)">
                예약하기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="custom-modal" v-on:click="closeModal" ref="custom_modal">
      dtd
    </div>
    <div class="modal-content" ref="modal_content">
      <WeldingDetail :data="detail.data" :key="detail.data" />
    </div>
    <div class="rent-content" ref="rent_content">
      <WeldingRent
        :data="detail.data"
        :key="detail.data"
        @closeModal="closeModal"
      />
    </div>
    <div class="reserve-content" ref="reserve_content">
      <Reservation :data="reserve.data" :key="reserve.data" />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue-demi';
import { reactive, ref } from 'vue';
import WeldingDetail from './detail/WeldingDetail.vue';
import WeldingRent from './WeldingRent.vue';
import Reservation from './Reservation.vue';
import axios from 'axios';
import api from '../../api/api';
import { useStore } from 'vuex';
export default {
  components: { WeldingDetail, WeldingRent, Reservation },
  props: {
    state: Object,
  },
  setup() {
    let store = useStore();
    const url = store.getters.url;
    //ref를 통해 돔 조작
    const custom_modal = ref(null);
    const modal_content = ref(null);
    const reserve_content = ref(null);
    const rent_content = ref(null);

    onMounted(() => {});

    let detail = reactive({
      data: '',
    });

    let reserve = reactive({
      data: {},
      click: (data) => {
        reserve.data = data;
        custom_modal.value.style.display = 'block';
        reserve_content.value.style.display = 'block';
      },
    });

    let click = (data) => {
      detail.data = data;
      custom_modal.value.style.display = 'block';
      modal_content.value.style.display = 'block';
    };

    let checkDepartment = (data) => {
      if (localStorage.getItem('department') === data.department) {
        return true;
      } else {
        return false;
      }
    };

    let returnWelding = (data) => {
      if (confirm('반납하시겠습니까?')) {
        axios({
          method: 'put',
          url: url + '/welding/return',
          headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
          data: {
            eqp_id: data.eqp_id,
            type: data.eqp_id.slice(0, 4) === 'TBAR' ? 'tbar' : 'gbs03',
          },
        })
          .then((response) => {
            if (response.data.affectedRows !== 1) {
              ('에러가 발생했습니다 다시 시도해 주세요');
            } else {
              alert('반납을 완료했습니다.');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    let closeModal = () => {
      custom_modal.value.style.display = 'none';
      modal_content.value.style.display = 'none';
      document.getElementsByClassName('reserve-content')[0].style.display =
        'none';
      rent_content.value.style.display = 'none';
    };

    let rent = reactive({
      click: (data) => {
        detail.data = data;
        custom_modal.value.style.display = 'block';
        rent_content.value.style.display = 'block';
      },
    });

    return {
      closeModal,
      click,
      custom_modal,
      modal_content,
      reserve_content,
      rent_content,
      detail,
      rent,
      checkDepartment,
      returnWelding,
      reserve,
    };
  },
};
</script>

<style scoped>
.table-top {
  padding: 5px 0px 0px 5px;
  height: 40px;
  margin-bottom: 10px;
}
.welding-list {
  display: grid;
  padding: 15px;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.container-fluid {
  background: white;
  border-radius: 5px;
  height: 91vh;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.container-fluid::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

table {
  border-collapse: collapse;
  border: 1px solid black;
}

td {
  -webkit-animation: blink-2 0.8s ease-in both;
  animation: blink-2 0.8s ease-in both;
  border: 1px solid #eeeeee;
  padding: 5px;
  text-align: center;
}

th {
  padding: 5px;
  border: 1px solid #eeeeee;
  text-align: center;
}

.custom-modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  display: none; /* Hidden by default */
  padding: 10px;
  position: fixed; /* Stay in place */
  background-color: #fefefe;
  z-index: 101; /* Sit on top */
  margin-left: 3%;
  border: 1px solid #888;
  width: 80%;
  height: 550px;
  top: 20vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: fadein 0.4s;
  -moz-animation: fadein 0.4s; /* Firefox */
  -webkit-animation: fadein 0.4s; /* Safari and Chrome */
  -o-animation: fadein 0.4s; /* Opera */
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.modal-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.reserve-content {
  display: none; /* Hidden by default */
  padding: 10px;
  position: fixed; /* Stay in place */
  background-color: #fefefe;
  z-index: 101; /* Sit on top */
  margin-left: 20%;
  border: 1px solid #888;
  width: 50%;
  height: 60vh;
  top: 15vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: fadein 0.4s;
  -moz-animation: fadein 0.4s; /* Firefox */
  -webkit-animation: fadein 0.4s; /* Safari and Chrome */
  -o-animation: fadein 0.4s; /* Opera */
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.reserve-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.rent-content {
  display: none; /* Hidden by default */
  padding: 10px;
  position: fixed; /* Stay in place */
  background-color: #fefefe;
  z-index: 101; /* Sit on top */
  margin-left: 28%;
  border: 1px solid #888;
  width: 30%;
  height: 425px;
  top: 15vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: fadein 0.4s;
  -moz-animation: fadein 0.4s; /* Firefox */
  -webkit-animation: fadein 0.4s; /* Safari and Chrome */
  -o-animation: fadein 0.4s; /* Opera */
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.rent-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadein {
  /* Firefox */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {
  /* Safari and Chrome */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-o-keyframes fadein {
  /* Opera */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.blink-2 {
  -webkit-animation: blink-2 0.8s ease-in both;
  animation: blink-2 0.8s ease-in both;
}

@-webkit-keyframes blink-2 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
@keyframes blink-2 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>

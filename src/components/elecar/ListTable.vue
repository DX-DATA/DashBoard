<template>
  <div>
    <div class="d-flex justify-content-end">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        style="width: 15%"
      />
      <button class="btn btn-outline-primary">Search</button>
    </div>
    <table class="table table-hover align-middle">
      <thead>
        <th>고소차 ID</th>
        <th>경도</th>
        <th>위도</th>
        <th>사용부서</th>
        <th>최종 업데이트 시간</th>
        <th>대여</th>
        <th>예약</th>
      </thead>
      <tbody :key="state.datas">
        <tr v-for="data in state.datas" v-bind:key="data">
          <td v-on:click="state.click(data)">
            {{ data.eqp_id }}
          </td>
          <td v-on:click="state.click(data)">
            {{ data.current_gps_lon }}
          </td>
          <td v-on:click="state.click(data)">
            {{ data.current_gps_lat }}
          </td>
          <td v-on:click="state.click(data)">
            {{ data.department }}
          </td>
          <td v-on:click="state.click(data)">
            {{ data.last_timestamp }}
          </td>
          <td v-if="data.useYN === 0">
            <button class="btn btn-primary" v-on:click="state.click(data)">
              대여하기
            </button>
          </td>
          <td style="width: 120px" v-else-if="state.checkDepartment(data)">
            <button
              class="btn btn-warning"
              v-on:click="state.returnElecar(data)"
            >
              반납하기
            </button>
          </td>
          <td style="width: 120px" v-else>
            <button class="btn btn-secondary" disabled>사용중</button>
          </td>
          <td style="width: 120px">
            <button class="btn btn-success">예약하기</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="custom-modal" v-on:click="closeModal"></div>
    <div class="modal-content">
      <ElecarDetail :data="state.detail" :key="state.detail" />
    </div>
  </div>
</template>

<script>
import ElecarDetail from './detail/ElecarDetail.vue';
// import axios from 'axios';
// import { useStore } from 'vuex';
// import api from '../../api/api';
export default {
  components: { ElecarDetail },
  props: {
    state: Object,
  },
  setup() {
    // let store = useStore();
    // let url = store.getters.url;

    let closeModal = () => {
      document.getElementsByClassName('custom-modal')[0].style.display = 'none';
      document.getElementsByClassName('modal-content')[0].style.display =
        'none';
    };

    return { closeModal };
  },
};
</script>

<style scoped>
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

.d-flex {
  padding: 10px;
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
  margin-left: 5%;
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

@media (max-width: 768px) {
  .modal-content {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    background-color: #fefefe;
    z-index: 101; /* Sit on top */
    margin-left: 1%;
    padding: 0;
    border: 1px solid #888;
    width: 98%;
    top: 10%;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    animation: fadein 0.4s;
    -moz-animation: fadein 0.4s; /* Firefox */
    -webkit-animation: fadein 0.4s; /* Safari and Chrome */
    -o-animation: fadein 0.4s; /* Opera */
  }
}
</style>

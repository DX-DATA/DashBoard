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
      </thead>
      <tbody :key="state.datas">
        <tr
          v-for="data in state.datas"
          v-bind:key="data.eqp_id"
          v-on:click="state.click(data)"
        >
          <td>
            {{ data.eqp_id }}
          </td>
          <td>
            {{ data.current_gps_lon }}
          </td>
          <td>
            {{ data.current_gps_lat }}
          </td>
          <td>
            {{ data.department }}
          </td>
          <td>
            {{ data.last_timestamp }}
          </td>
          <td v-if="data.useYN === 0">
            <button class="btn btn-primary">대여하기</button>
          </td>
          <td v-else>
            <button class="btn btn-secondary">사용중</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="custom-modal" v-on:click="closeModal"></div>
    <div class="modal-content">
      <KakaoMap
        :options="state.mapOption"
        :positions="state.positions"
        :key="state.mapOption.center.lat"
      />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import api from '../../api/api';
import io from 'socket.io/client-dist/socket.io';
import { onMounted, onUnmounted } from '@vue/runtime-core';
import KakaoMap from '../modules/KakaoMap.vue';

export default {
  props: ['datas'],
  components: { KakaoMap },

  setup(props) {
    //socket
    let socket = io('http://127.0.0.1:3333');

    let setData = (data) => {
      console.log(data);
      for (let i = 0; i < state.datas.length; i++) {
        if (state.datas[i].eqp_id === data[0]) {
          state.datas[i].eqp_id = data[0];
          state.datas[i].current_gps_lat = data[1];
          state.datas[i].current_gps_lon = data[2];
          state.datas[i].department = data[4];
          state.datas[i].last_timestamp = data[7];
        }
      }
    };
    onMounted(() => {
      axios
        .get('/api/elecar/current', {
          headers: {
            Authorization: 'Bearer ' + api.getCookie('auth'),
          },
        })
        .then((response) => {
          response.data.forEach((element) => {
            if (element.current_gps_lon != 0) {
              state.datas.push(element);
            }
          });
          console.log(state.datas);
          state.originData = state.datas;
        })
        .catch((error) => {
          console.log(error);
        });

      socket.on('new_elecar', function (data) {
        setData(data);
      });
    });

    let state = reactive({
      datas: props.datas,
      mapOption: {
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        level: 6,
      },
      positions: [],
      click: (data) => {
        let param = data.eqp_id + '_' + data.last_timestamp.slice(0, 10);
        document.getElementsByClassName('custom-modal')[0].style.display =
          'block';
        document.getElementsByClassName('modal-content')[0].style.display =
          'block';
        axios
          .get('/api/elecar/locations?key=' + param)
          .then((response) => {
            state.positions = response.data;
            state.mapOption.center.lat = data.current_gps_lat;
            state.mapOption.center.lng = data.current_gps_lon;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

    onUnmounted(() => {
      socket.disconnect();
    });

    let closeModal = () => {
      document.getElementsByClassName('custom-modal')[0].style.display = 'none';
      document.getElementsByClassName('modal-content')[0].style.display =
        'none';
    };

    return { state, closeModal };
  },
  watch: {},
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
  position: fixed; /* Stay in place */
  background-color: #fefefe;
  z-index: 101; /* Sit on top */
  margin-left: 13%;
  padding: 0;
  border: 1px solid #888;
  width: 60%;
  top: 20vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: fadein 0.4s;
  -moz-animation: fadein 0.4s; /* Firefox */
  -webkit-animation: fadein 0.4s; /* Safari and Chrome */
  -o-animation: fadein 0.4s; /* Opera */
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
</style>

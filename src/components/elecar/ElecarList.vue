<template>
  <div class="container-fluid">
    <table class="table table-hover align-middle">
      <thead>
        <th>고소차 ID</th>
        <th>경도</th>
        <th>위도</th>
        <th>사용부서</th>
        <th>최종 업데이트 시간</th>
        <th>대여</th>
      </thead>
      <tbody>
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

    <KakaoMap
      :options="state.mapOption"
      :positions="state.positions"
      :key="state.mapOption.center.lat"
    />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted, onUnmounted } from '@vue/runtime-core';
import KakaoMap from '../modules/KakaoMap.vue';
import axios from 'axios';
import api from '../../api/api';
import io from 'socket.io/client-dist/socket.io';

export default {
  components: { KakaoMap },
  setup() {
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
        })
        .catch((error) => {
          console.log(error);
        });

      socket.on('new_elecar', function (data) {
        setData(data);
      });
    });

    let state = reactive({
      datas: [],
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

    return { state };
  },
};
</script>

<style scoped>
.container-fluid {
  widows: 99%;
  background: white;
  margin-top: 20px;
  padding: 0px;
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

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
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

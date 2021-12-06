<template>
  <div class="elecar-container">
    <div class="header">
      <ElecarHeader />
    </div>
    <div class="content">
      <router-view :routeData="state"></router-view>
    </div>
  </div>
</template>

<script>
import ElecarHeader from './ElecarHeader.vue';
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import api from '../../api/api';
import io from 'socket.io/client-dist/socket.io';
import { onMounted, onUnmounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  components: { ElecarHeader },

  setup() {
    const store = useStore();
    const url = store.getters.url;
    //socket
    let socket = io('http://api.dxdata.co.kr:3333');

    let setData = (data) => {
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

    let updataData = (data) => {
      for (let i = 0; i < state.datas.length; i++) {
        if (state.datas[i].eqp_id === data.eqp_id) {
          state.datas[i].eqp_id = data.eqp_id;
          state.datas[i].current_gps_lat = data.current_gps_lat;
          state.datas[i].current_gps_lon = data.current_gps_lon;
          state.datas[i].department = data.department;
          state.datas[i].last_timestamp = data.last_timestamp;
          state.datas[i].start_time = data.start_time;
          state.datas[i].end_time = data.end_time;
          state.datas[i].useYN = data.useYN;
        }
      }
    };

    onMounted(async () => {
      await axios
        .get(url + '/elecar/current', {
          headers: {
            Authorization: 'Bearer ' + api.getCookie('auth'),
          },
        })
        .then((response) => {
          // console.log(response.data);
          response.data.forEach((element) => {
            if (element.current_gps_lon != 0) {
              state.datas.push(element);
            }
          });
          state.originData = state.datas;
        })
        .catch((error) => {
          console.log(error);
        });

      socket.on('new_elecar', function (data) {
        setData(data);
      });

      socket.on('update_elecar', function (data) {
        console.log('update');
        updataData(data[0]);
      });
    });

    let state = reactive({
      datas: [],
      detail: '',
      click: (data) => {
        state.detail = data;
        document.getElementsByClassName('custom-modal')[0].style.display =
          'block';
        document.getElementsByClassName('modal-content')[0].style.display =
          'grid';
      },
      checkDepartment: (data) => {
        if (localStorage.getItem('department') === data.department) {
          return true;
        } else {
          return false;
        }
      },
      returnElecar: (data) => {
        if (confirm('반납하시겠습니까?')) {
          axios({
            method: 'post',
            url: url + '/elecar/return',
            headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
            data: { eqp_id: data.eqp_id },
          })
            .then((response) => {
              console.log(response);
              alert('반납을 완료했습니다.');
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
.header {
  grid-area: header;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 3px 3px 5px 1px;
}
</style>

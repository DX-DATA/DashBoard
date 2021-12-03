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
      detail: '',
      positions: [],
      click: (data) => {
        let param = data.eqp_id + '_' + data.last_timestamp.slice(0, 10);
        document.getElementsByClassName('custom-modal')[0].style.display =
          'block';
        document.getElementsByClassName('modal-content')[0].style.display =
          'grid';
        state.detail = data;

        axios
          .get(url + '/elecar/locations?key=' + param)
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
.header {
  grid-area: header;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 3px 3px 5px 1px;
}
</style>

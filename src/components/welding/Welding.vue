<template>
  <div class="welding-container">
    <div class="header"><WeldingHeader /></div>
    <div class="content">
      <router-view :state="state"></router-view>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive } from 'vue-demi';
import WeldingHeader from './WeldingHeader.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import api from '../../api/api';
import io from 'socket.io/client-dist/socket.io';

export default {
  components: { WeldingHeader },

  setup() {
    let store = useStore();
    const url = store.getters.url;
    let socket = io('http://api.dxdata.co.kr:3333');

    let state = reactive({
      tbar: [],
      gbs03: [],
    });

    onMounted(async () => {
      await axios
        .get(url + '/welding/gbs03/current', {
          headers: {
            Authorization: 'Bearer ' + api.getCookie('auth'),
          },
        })
        .then((response) => {
          state.gbs03 = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      await axios
        .get(url + '/welding/tbar/current', {
          headers: {
            Authorization: 'Bearer ' + api.getCookie('auth'),
          },
        })
        .then((response) => {
          state.tbar = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      socket.on('rent_welding', function (data) {
        console.log(data);
        updateData(data[0]);
      });
    });

    let updateData = (data) => {
      if (data.eqp_id.slice(0, 4) === 'TBAR') {
        state.tbar.find((v) => {
          if (v.eqp_id === data.eqp_id) {
            v.department = data.department;
            v.use_yn = data.use_yn;
            v.start_time = data.start_time;
            v.end_time = data.end_time;
          }
        });
      } else {
        state.gbs03.find((v) => {
          if (v.eqp_id === data.eqp_id) {
            v.department = data.department;
            v.use_yn = data.use_yn;
            v.start_time = data.start_time;
            v.end_time = data.end_time;
          }
        });
      }
    };

    onUnmounted(() => {
      socket.disconnect();
    });

    return { state };
  },
};
</script>

<style scoped></style>

<template>
  <div class="welding-container">
    <div class="header"><WeldingHeader /></div>
    <div class="content">
      <router-view :state="state"></router-view>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue-demi';
import WeldingHeader from './WeldingHeader.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import api from '../../api/api';
export default {
  components: { WeldingHeader },

  setup() {
    let store = useStore();
    const url = store.getters.url;

    let state = reactive({
      tbar: '',
      gbs03: '',
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
    });

    return { state };
  },
};
</script>

<style scoped></style>

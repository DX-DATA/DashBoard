<template>
  <div id="app" class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
// import DashBoard from './components/DashBoard.vue';
// import Login from './components/user/Login.vue';
import axios from 'axios';
import api from './api/api';
import { useStore } from 'vuex';
import { onMounted, reactive } from 'vue-demi';

export default {
  name: 'App',
  components: {
    //HelloWorld
    // DashBoard,
    // Login,
  },
  setup() {
    const store = useStore();
    const url = store.getters.url;
    onMounted(() => {
      check();
    });

    let state = reactive({
      logined: false,
    });

    function check() {
      axios({
        method: 'post',
        url: url + '/auth/check',
        headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
      }).then((response) => {
        if (response.data === 1) {
          store.commit('setLogin', true);
          state.logined = true;
        } else {
          store.commit('setLogin', false);
          state.logined = false;
        }
      });
    }

    store.watch(
      (getters) => getters.token,
      () => {
        state.logined = !state.logined;
      }
    );

    return { state };
  },
};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
</style>

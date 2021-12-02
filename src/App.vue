<template>
  <div id="app" class="wrapper">
    <div v-if="state.logined">
      <DashBoard></DashBoard>
    </div>
    <div v-else>
      <Login></Login>
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import DashBoard from './components/DashBoard.vue';
import Login from './components/user/Login.vue';
import axios from 'axios';
import api from './api/api';
import { useStore } from 'vuex';
import { onMounted, reactive } from 'vue-demi';

export default {
  name: 'App',
  components: {
    //HelloWorld
    DashBoard,
    Login,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      check();
    });

    let state = reactive({
      logined: false,
    });

    function check() {
      console.log(api.getCookie('auth'));
      axios({
        method: 'post',
        url: '/api/auth/check',
        headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
      }).then((response) => {
        console.log(response);
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

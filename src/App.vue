<template>
  <div id="app" class="wrapper">
    <div v-if="Logined">
      <DashBoard></DashBoard>
    </div>
    <div v-if="!Logined">
      <Login></Login>
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import DashBoard from './components/DashBoard.vue'
import Login from './components/user/Login.vue';
import axios from 'axios'
import api from './api/api'
export default {
  name: 'App',
  components: {
    //HelloWorld
    DashBoard,
    Login,
  },
  mounted() {
    this.check();
  },
  data() {
    return {
      Logined : false,
    }
  },
  methods : {
    check : function() {
      console.log(api.getCookie('auth'));
      axios({
        method : 'post',
        url : "/api/auth/check",
        headers : {'Authorization': 'Bearer ' + api.getCookie('auth')}
      }).then(response => {
        console.log(response)
        if(response.data === 1) {
          this.Logined = true;
        } else {
          this.Logined = false;
        }
      });
    },
    ch : function() {
      this.Logined = !this.Logined
    }
  }
}
</script>

<style>

* {
  padding : 0px;
  margin : 0px;
}


</style>

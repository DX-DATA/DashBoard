<template>
  <div class="nav_component d-flex flex-column">
    <div class="nav-title">
      <h1>DXDATA DashBoard</h1>
    </div>
    <ul class="nav nav-pills flex-column mb-auto">
      <!-- <li>
        <router-link to="/home" class="nav_link text-white">
          <i class="fas fa-home"></i> Home
        </router-link>
      </li> -->
      <li>
        <router-link to="/notice" class="nav_link text-white">
          <i class="fas fa-bell"></i> 공지사항</router-link
        >
      </li>
      <li>
        <router-link to="/vaccine" class="nav_link text-white"
          ><i class="fas fa-syringe"></i> 백신</router-link
        >
      </li>
      <li>
        <router-link to="/elecar" class="nav_link text-white"
          ><i class="fas fa-level-up-alt"></i> 고소차</router-link
        >
      </li>
      <li>
        <router-link to="/crane" class="nav_link text-white"
          ><i class="fas fa-cubes"></i> 크레인</router-link
        >
      </li>
      <li>
        <router-link to="/welding" class="nav_link text-white">
          <i class="fas fa-bolt"></i> 용접기</router-link
        >
      </li>
      <li>
        <router-link to="/newboard/notice" class="nav_link text-white">
          <i class="fas fa-external-link-alt"></i> NewDesign</router-link
        >
      </li>
      <li>
        <a href="#" v-on:click="logout" class="nav_link text-white">로그아웃</a>
      </li>
    </ul>
    <div v-if="admin == 1">
      <router-link to="/userManage" class="nav_link text-white">
        <i class="fas fa-cog"></i> 회원 관리</router-link
      >
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  data() {
    return {
      store: useStore(),
      admin: localStorage.getItem('admin'),
    };
  },
  methods: {
    logout: async function () {
      let setcookie = async () => {
        document.cookie =
          'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      };
      await setcookie();
      localStorage.setItem('department', '');
      localStorage.setItem('admin', '');
      this.store.commit('setToken', '');
    },
  },
  watch: {
    $route: {
      handler(val) {
        console.log(val.path);
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.nav-title > h1 {
  font-size: 18px;
  font-weight: lighter;
}

.nav_component {
  background: none;
  height: 100vh;
}
.nav_component > ul {
  list-style: none;
  padding-left: 0px;
}

.nav_component > ul > li {
  padding: 10px 0px 10px 0px;
}

.nav_component > ul > li > a {
  text-decoration: none;
  background: 0 0;
  border: 0;
  border-radius: 0.25rem;
  animation-fill-mode: forwards;
}

.nav_link {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
}

.nav_component > ul > li > a:hover {
  background-color: #0d6dfd !important;
}

.nav a.router-link-active {
  color: #fff;
  background-color: #0d6efd !important;
}
</style>

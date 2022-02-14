<template>
  <div class="navbar">
    <div class="button-grp" v-on:click="onClickBar">
      <i class="fas fa-bars"></i>
    </div>

    <!-- <div class="brand">
      <i class="fas fa-level-up-alt"></i> {{ props.name }}
    </div> -->

    <ul class="list-navbar">
      <li v-for="link in props.links" :key="link">
        <router-link :to="{ path: link.link }">{{ link.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  props: ['links', 'name'],
  setup(props) {
    const store = useStore();
    console.log(props.links);

    function onClickBar() {
      store.commit('setMenu', !store.getters.menu);
    }

    return { onClickBar, props };
  },
};
</script>

<style scoped>
.navbar {
  height: 48px;
  padding-left: 8px;
  padding-right: 8px;
  box-shadow: 0 0.7px 1.4px rgb(0 0 0 / 7%), 0 1.9px 4px rgb(0 0 0 / 5%),
    0 4.5px 10px rgb(0 0 0 / 5%);
  border-bottom: 1px solid #cdd3df;
  z-index: 1000;
  position: fixed;
  top: 48px;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
}

.brand {
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #434343;
}

.list-navbar {
  list-style: none;
  padding: 0px;
  margin: 0px 10px 0px 20px;
}

.list-navbar > li {
  display: inline;
  margin-right: 10px;
  margin-bottom: 0px;
}

.list-navbar > li > a {
  text-decoration: none;
  color: #838383;
}

.list-navbar > li > a:hover {
  text-decoration: none;
  color: black;
}

.list-navbar > li > a:active {
  text-decoration: none;
  color: black;
}

.button-grp {
  cursor: pointer;
}

.router-link-exact-active {
  color: black !important;
}
</style>

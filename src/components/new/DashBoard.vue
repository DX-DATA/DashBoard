<template>
  <div>
    <Header />
    <!-- <Navbar /> -->
    <Nav v-if="store.getters.menu" />
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './layout/Header.vue';
// import Navbar from './layout/Navbar.vue';

import Nav from './layout/Nav.vue';
import { reactive } from 'vue-demi';
import { useStore } from 'vuex';

export default {
  components: { Header, Nav },
  setup() {
    let store = useStore();

    let state = reactive({
      nav: false,
    });

    return { state, store };
  },
};
</script>

<style scoped>
.view {
  margin-top: 96px;
}
</style>

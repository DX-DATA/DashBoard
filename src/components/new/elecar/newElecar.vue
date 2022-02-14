<template>
  <div class="elecar-container">
    <div class="header">
      <Navbar :name="state.name" :links="state.list" />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue-demi';
import Navbar from '../layout/Navbar.vue';
export default {
  components: { Navbar },
  setup() {
    let state = reactive({
      name: '고소차',
      list: [
        {
          link: '/newboard/elecar/',
          name: 'Main',
        },
        {
          link: '/newboard/elecar/list',
          name: 'List',
        },
      ],
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

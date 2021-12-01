<template>
  <div class="elecar-container">
    <div class="header">
      <ElecarHeader />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ElecarHeader from './ElecarHeader.vue';

export default {
  components: { ElecarHeader },
  setup() {},
};
</script>

<style scoped>
.header {
  grid-area: header;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 3px 3px 5px 1px;
}
</style>

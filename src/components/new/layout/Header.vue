<template>
  <div class="header">
    <div class="logo">DXDATA DashBoard</div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped>
.header {
  color: white;
  background: #25282f;
  height: 48px;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.logo {
  font-size: 16px;
}
</style>

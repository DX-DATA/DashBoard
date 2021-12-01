<template>
  <div class="container">
    <input type="text" v-model="state.name" />
    <input type="text" />
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue-demi';
// import axios from 'axios';
export default {
  setup() {
    onMounted(() => {});

    let state = reactive({
      name: 'ㅇㅅㅇ',
    });

    let rent = () => {};

    return { state, rent };
  },
};
</script>

<style scoped>
.container {
  background: white;
  margin: 10px auto;
  height: 40vh;
  text-align: center;
}
</style>

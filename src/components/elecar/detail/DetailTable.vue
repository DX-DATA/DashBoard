<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <th>위도</th>
        <th>경도</th>
        <th>업데이트 시간</th>
      </thead>
      <tbody>
        <tr v-for="data in state.datas" :key="data">
          <td>{{ data.gps_lat }}</td>
          <td>{{ data.gps_lon }}</td>
          <td>{{ data.use_timestamp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive } from 'vue-demi';
export default {
  props: ['data'],
  setup(props) {
    let state = reactive({
      datas: props.data,
    });

    return { state };
  },
};
</script>

<style scoped></style>

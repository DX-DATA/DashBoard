<template>
  <section class="card using">
    <h4>사용중인 용접기</h4>
    <table class="table table-hover">
      <thead>
        <th>용접기 ID</th>
        <th>사용부서</th>
        <th>사용 시작 시간</th>
        <th>사용 종료 시간</th>
      </thead>
      <!-- <tbody :key="elecarFilter">
        <tr v-for="elecar in elecarFilter" :key="elecar">
          <td>{{ elecar.eqp_id }}</td>
          <td>{{ elecar.department }}</td>
          <td>{{ elecar.start_time }}</td>
          <td>{{ elecar.end_time }}</td>
        </tr>
      </tbody> -->
    </table>
  </section>
</template>

<script>
import { toRefs } from 'vue';

export default {
  name: 'UsingTable',
  props: ['state'],
  setup(props) {
    let { state } = toRefs(props);

    console.log(state.value);

    return {};
  },
  // data() {
  //   return {
  //     useElecar: [],
  //   };
  // },
  // beforeMount() {
  //   this.useElecar = this.state.datas.filter((v) => v.useYN == 1);
  //   console.log(this.useElecar);
  // },
};
</script>

<style>
.using {
  height: 460px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

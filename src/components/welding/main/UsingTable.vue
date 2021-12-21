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
      <tbody :key="state">
        <tr v-for="welding in state" :key="welding">
          <td>{{ welding.eqp_id }}</td>
          <td>{{ welding.department }}</td>
          <td>{{ welding.start_time }}</td>
          <td>{{ welding.end_time }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'UsingTable',
  props: {
    state: Array,
  },
  mounted() {
    console.log(this.state);
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

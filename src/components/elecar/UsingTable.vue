<template>
  <section class="card grid-item using">
    <h4>현재 사용중인 고소차</h4>
    <table class="table table-hover">
      <thead>
        <th>고소차 ID</th>
        <th>사용부서</th>
        <th>사용 시작 시간</th>
        <th>사용 종료 시간</th>
      </thead>
      <tbody :key="elecarFilter">
        <tr v-for="elecar in elecarFilter" :key="elecar">
          <td>{{ elecar.eqp_id }}</td>
          <td>{{ elecar.department }}</td>
          <td>{{ elecar.start_time }}</td>
          <td>{{ elecar.end_time }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { computed, toRefs } from 'vue';

export default {
  name: 'UsingTable',
  props: ['routeData'],
  setup(props) {
    let { routeData } = toRefs(props);

    const elecarFilter = computed(() => {
      return routeData.value.datas.filter((v) => v.useYN == 1);
    });

    return { elecarFilter };
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
  height: 450px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.using::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>

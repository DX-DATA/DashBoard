<template>
  <div class="container-fluid">
    <UsingTable :routeData="routeData" />
    <article class="card grid-item">
      <h4>실시간 고소차 위치</h4>
      <table class="table table-hover">
        카카오맵
      </table>
    </article>
    <article id="usage" class="card grid-item">
      <h4>주간 고소차 사용량</h4>
      <table class="table table-hover">
        대충 그래프 들어있다는 내용
      </table>
    </article>
  </div>
</template>

<script>
import UsingTable from './UsingTable.vue';

export default {
  components: {
    UsingTable,
  },
  props: {
    routeData: Object,
  },
};
</script>

<style scoped>
.container-fluid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 3fr 2fr;
}

.grid-item {
  margin: 10px;
  padding: 5px;
}

#usage {
  grid-column-start: 1;
  grid-column-end: 3;
}

@media (max-width: 768px) {
  .container-fluid {
    display: flex;
    flex-direction: column;
  }
}
</style>

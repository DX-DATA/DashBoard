<template>
  <div class="container-fluid">
    <UsingTable :routeData="routeData" />
    <section class="card grid-item">
      <h4>실시간 고소차 위치</h4>
      <KakaoMap />
    </section>
    <AmountUsed />
  </div>
</template>

<script>
import UsingTable from './UsingTable.vue';
import KakaoMap from '../modules/usingElecarMap.vue';
import AmountUsed from './AmountUsed.vue';

export default {
  components: {
    UsingTable,
    KakaoMap,
    AmountUsed,
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

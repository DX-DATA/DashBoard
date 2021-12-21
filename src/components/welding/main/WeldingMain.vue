<template>
  <h1 class="font-align">GBS03</h1>
  <div class="container-fluid font-align">
    <UsingTable :state="getUsingGBS" />
    <div class="card"><h4>사용률 순위 그래프</h4></div>
    <div class="card"><h4>주간 전력 사용률</h4></div>
    <div class="card"><h4>전날 전력 사용률</h4></div>
  </div>
  <h1 class="font-align">TBAR</h1>
  <div class="container-fluid font-align">
    <UsingTable :state="getUsingTBAR" />
    <div class="card"><h4>사용률 순위 그래프</h4></div>
    <div class="card"><h4>주간 전력 사용률</h4></div>
    <div class="card"><h4>전날 전력 사용률</h4></div>
  </div>
</template>

<script>
import UsingTable from './UsingTable.vue';

export default {
  name: 'WeldingMain',
  components: { UsingTable },
  props: {
    state: Object,
  },
  data() {
    return {};
  },
  computed: {
    getUsingGBS() {
      const usingGBS = this.state.gbs03.filter((v) => v.use_yn == 1);
      return usingGBS;
    },
    getUsingTBAR() {
      const usingTBAR = this.state.tbar.filter((v) => v.use_yn == 1);
      return usingTBAR;
    },
  },
  methods: {},
};
</script>

<style scoped>
.container-fluid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
}

.card {
  padding: 10px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  height: 300px;
}

.container-fluid >>> h4 {
  font-weight: bold;
}

.font-align {
  text-align: center;
}

.grid-item {
  margin: 10px;
  padding: 10px;
}

/* #usage {
  grid-column-start: 1;
  grid-column-end: 3;
} */

/* @media (max-width: 768px) {
  .container-fluid {
    display: flex;
    flex-direction: column;
  }
} */
</style>

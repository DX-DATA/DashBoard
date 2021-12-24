<template>
  <h1 class="font-align">GBS03</h1>
  <div class="container-fluid font-align">
    <UsingTable :state="getUsingGBS" />
    <AmountUsed type="gbs03" />
    <YesterdayUsage type="gbs03" />
  </div>
  <h1 class="font-align" style="margin-top: 30px">TBAR</h1>
  <div class="container-fluid font-align">
    <UsingTable :state="getUsingTBAR" />
    <AmountUsed type="tbar" />
    <YesterdayUsage type="tbar" />
  </div>
</template>

<script>
import UsingTable from './UsingTable.vue';
import AmountUsed from './AmountUsed.vue';
import YesterdayUsage from './YesterdayUsage.vue';

export default {
  name: 'WeldingMain',
  components: { UsingTable, AmountUsed, YesterdayUsage },
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
/* .container-fluid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
} */

.card {
  margin: 20px 0;
  padding: 10px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
}

.container-fluid >>> h4 {
  font-weight: bold;
}

.font-align {
  text-align: center;
}
</style>

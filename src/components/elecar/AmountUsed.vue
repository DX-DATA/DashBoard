<template>
  <section id="usage" class="card grid-item">
    <h4>주간 고소차 사용량</h4>
    <article class="chart_card line">
      <LineChart :chartData="lineData" :options="lineOption" />
    </article>
  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue';

import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
  name: 'VacTotalChart',
  components: {
    LineChart,
  },
  setup() {
    const label = ref([]);
    const used = ref([]);

    onMounted(async () => {
      const tempLabel = [];
      const tempUsed = [];
      let reverseData = [];
      await axios
        .get('http://api.dxdata.co.kr:3333/elecar/usage')
        .then((res) => {
          reverseData = res.data;
          reverseData.reverse();

          reverseData.map((v) => {
            tempLabel.push(v.date);
            tempUsed.push(v.amount);
          });
        });

      label.value = tempLabel;
      used.value = tempUsed;
    });

    const lineData = computed(() => ({
      labels: label.value,
      datasets: [
        {
          label: '사용량',
          data: used.value,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#77CEFF',
          pointBorderColor: 'black',
        },
      ],
    }));
    const lineOption = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: '주간 사용량',
          position: 'top',
        },
      },
    });

    return { lineData, lineOption };
  },
};
</script>

<style scoped>
.chart_card {
  margin-top: 0px;
}
</style>

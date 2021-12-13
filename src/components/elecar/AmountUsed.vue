<template>
  <section id="usage" class="card grid-item">
    <h4>주간 고소차 사용량</h4>
    <article class="chart_card line">
      <LineChart :chartData="lineData" :options="lineOption" />
    </article>
  </section>
</template>

<script>
import { computed, ref } from 'vue';

import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'VacTotalChart',
  components: {
    LineChart,
  },
  setup() {
    const label = ref([
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일',
    ]);

    const used = ref([30, 40, 34, 50, 43, 20, 15]);

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

<template>
  <section class="chart_card line">
    <LineChart :chartData="lineData" :options="lineOption" />
  </section>
</template>

<script>
import { computed, ref, toRefs } from 'vue';

import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'VacTotalChart',
  components: {
    LineChart,
  },
  props: {
    vacLabel: Object,
    firstData: Object,
    secondData: Object,
    thirdData: Object,
  },
  setup(props) {
    let { vacLabel, firstData, secondData, thirdData } = toRefs(props);
    // Doughnut용
    const lineData = computed(() => ({
      labels: vacLabel.value,
      datasets: [
        {
          label: '1차 백신',
          data: firstData.value,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#77CEFF',
          pointBorderColor: 'black',
        },
        {
          label: '2차 백신',
          data: secondData.value,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'red',
          pointBorderColor: 'black',
        },
        {
          label: '3차 백신',
          data: thirdData.value,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#333333',
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
          text: '차수별 접종 추이',
          position: 'top',
        },
      },
    });

    return { lineData, lineOption };
  },
};
</script>

<style>
.line {
}
</style>

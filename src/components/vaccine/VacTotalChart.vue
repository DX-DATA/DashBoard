<template>
  <section class="chart_card doughnut">
    <DoughnutChart :chartData="doughnutData" :options="doughnutOption" />
  </section>
</template>

<script>
import { computed, ref, toRefs } from 'vue';

import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'VacTotalChart',
  components: {
    DoughnutChart,
  },
  props: {
    vaccineTotalData: Object,
  },
  setup(props) {
    let { vaccineTotalData } = toRefs(props);
    // Doughnut용
    const doughnutData = computed(() => ({
      labels: ['1차 백신', '2차 백신', '3차 백신'],
      datasets: [
        {
          data: vaccineTotalData.value,
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B'],
        },
      ],
    }));
    const doughnutOption = ref({
      responsive: true,
      plugins: {
        // 각 요소의 색상
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          position: 'top',
          text: '백신 차수별 총 접종 그래프',
        },
      },
    });

    return { doughnutData, doughnutOption };
  },
};
</script>

<style>
.doughnut {
}
</style>

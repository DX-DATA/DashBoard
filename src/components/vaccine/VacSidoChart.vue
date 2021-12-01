<template>
  <section class="chart_card bar">
    <BarChart :chartData="barData" :options="barOption" />
  </section>
</template>

<script>
import { computed, ref, toRefs } from 'vue';

import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'VacTotalChart',
  components: {
    BarChart,
  },
  props: {
    label: Object,
    todayCovid: Object,
  },
  setup(props) {
    let { label, todayCovid } = toRefs(props);
    // Bar용
    const barData = computed(() => ({
      labels: label.value,
      datasets: [
        {
          data: todayCovid.value,
          backgroundColor: 'rgba(178, 34, 34, 1.0)',
          //   borderColor: [
          //     'rgba(255,99,132,1)',
          //     'rgba(54, 162, 235, 1)',
          //     'rgba(255, 206, 86, 1)',
          //     'rgba(75, 192, 192, 1)',
          //     'rgba(153, 102, 255, 1)',
          //     'rgba(255, 159, 64, 1)',
          //   ],
          //   borderWidth: 1,
        },
      ],
    }));
    const barOption = ref({
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'bottom',
        },
        title: {
          display: true,
          text: '지역별 전날 확진자 수',
          position: 'top',
        },
      },
    });

    return { barData, barOption };
  },
};
</script>

<style>
.bar {
}
</style>

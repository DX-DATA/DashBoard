<template>
  <section class="card grid-item">
    <h4>전날 전력량 사용 비율</h4>
    <article class="chart_card doughnut">
      <DoughnutChart :chartData="doughnutData" :options="doughnutOption" />
    </article>
  </section>
</template>

<script>
import { onMounted, computed, ref, toRefs } from 'vue';

import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import api from '../../../api/api';

Chart.register(...registerables);

export default {
  name: 'YesterdayUsage',
  components: {
    DoughnutChart,
  },
  props: ['type'],
  setup(props) {
    let { type } = toRefs(props);

    const label = ref([]);
    const usage = ref([]);

    onMounted(async () => {
      const tempLabel = [];
      const tempUsage = [];
      await axios
        .get(
          'http://api.dxdata.co.kr:3333/welding/watts/rank?type=' + type.value,
          {
            headers: {
              Authorization: 'Bearer ' + api.getCookie('auth'),
            },
          }
        )
        .then((res) => {
          res.data.map((v) => {
            if (v.watt != 0) {
              tempLabel.push(v.eqp_id);
              tempUsage.push(v.watt);
            }
          });
        });

      label.value = tempLabel;
      usage.value = tempUsage;
    });

    // Doughnut용
    const doughnutData = computed(() => ({
      labels: label.value,
      datasets: [
        {
          data: usage.value,
          backgroundColor: [
            '#000080',
            '#0000CD',
            '#0000FF',
            '#4169E1',
            '#6495ED',
            '#1E90FF',
            '#00BFFF',
            '#00FFFF',
            '#00CED1',
            '#87CEFA',
          ],
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
          text: '전력 사용량',
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

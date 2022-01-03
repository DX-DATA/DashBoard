<template>
  <section class="card grid-item">
    <h4>전날 전력 사용량 순위 (10개)</h4>
    <div class="row">
      <div class="col table-scroll">
        <table class="table table-hover">
          <thead>
            <th>용접기 ID</th>
            <th>전력량</th>
            <th>사용 시간</th>
            <th>평균 전류량</th>
            <th>평균 전압량</th>
            <th>와이어 사용량</th>
          </thead>
          <tbody :key="weldings">
            <tr v-for="welding in weldings" :key="welding">
              <td>{{ welding.eqp_id }}</td>
              <td>
                {{ welding.watt != 0 ? welding.watt.toFixed(2) : welding.watt }}
              </td>
              <td>{{ welding.welding_time }}</td>
              <td>{{ welding.avg_amp }}</td>
              <td>{{ welding.avg_volt }}</td>
              <td>{{ welding.sum_inching_wire }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <article class="col col-lg-3 chart_card doughnut">
        <DoughnutChart :chartData="doughnutData" :options="doughnutOption" />
      </article>
    </div>
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
    const weldings = ref([]);

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
          weldings.value = res.data;
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

    return { doughnutData, doughnutOption, weldings };
  },
};
</script>

<style scoped>
.table-scroll {
  height: 380px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

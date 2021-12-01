<template>
  <section class="dashboard_body">
    <!-- <DoughnutChart :chartData="doughnutTestData" :options="doughnutOption" /> -->
    <!-- <LineChart :chartData="vaccineLineData" :options="lineOption" /> -->
    <header class="category_title"><h1>백신 관련 정보</h1></header>
    <article class="vaccine_info">
      <VacTotalChart :vaccineTotalData="vaccineTotalData" />
      <VacDayChart
        :vacLabel="vacLabel"
        :firstData="firstData"
        :secondData="secondData"
        :thirdData="thirdData"
      />
    </article>
    <header class="category_title"><h1>확진자 관련 정보</h1></header>
    <VacSidoChart :label="regionName" :todayCovid="todayCovid" />
  </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';

import { Chart, registerables } from 'chart.js';

import VacTotalChart from './VacTotalChart.vue';
import VacDayChart from './VacDayChart.vue';
import VacSidoChart from './VacSidoChart.vue';

Chart.register(...registerables);

export default {
  name: 'Main',
  components: {
    VacTotalChart,
    VacDayChart,
    VacSidoChart,
  },
  props: {},
  setup() {
    const vacLabel = ref([]);
    const firstData = ref([]);
    const secondData = ref([]);
    const thirdData = ref([]);
    const vaccineTotalData = ref([]);

    async function getVaccine() {
      const tempTotalData = [];
      const tempFirstData = [];
      const tempSecondData = [];
      const tempThirdData = [];

      await axios
        .get('http://192.168.0.21:3000/api/vaccine?sido=전국')
        .then((res) => {
          // 차수 별 총 접종 수를 최신 일자로 가져오기
          let newInfo = res.data[res.data.length - 1];
          tempTotalData.push(
            newInfo.total_first,
            newInfo.total_second,
            newInfo.total_third
          );

          // 날짜 순으로 차수 별 접종 data 가져오기
          res.data.map((v) => {
            const date = new Date(v.date);
            const fixdate = new Date(date.setDate(date.getDate() - 1));

            vacLabel.value.push(
              fixdate.getMonth() + 1 + '월' + fixdate.getDate() + '일'
            );
            tempFirstData.push(v.first);
            tempSecondData.push(v.second);
            tempThirdData.push(v.third);
          });
        })
        .catch((e) => console.log(e));

      firstData.value = tempFirstData;
      secondData.value = tempSecondData;
      thirdData.value = tempThirdData;
      vaccineTotalData.value = tempTotalData;
    }

    const regionName = ref([]);
    const todayCovid = ref([]);

    async function getCovid() {
      const tempTodayData = [];

      await axios.get('http://192.168.0.21:3000/api/infection').then((res) => {
        let afterfilter = [];
        // sido에서 검역과 합계인 데이터 삭제
        afterfilter = res.data.filter((v) => {
          if (v.sido !== '검역' && v.sido !== '합계') {
            return true;
          }
        });

        afterfilter.map((v) => {
          // labeling
          regionName.value.push(v.sido);

          // 당일 확진자 수 데이터 불러오기
          tempTodayData.push(v.inc_dec);
        });

        console.log(afterfilter);
      });

      todayCovid.value = tempTodayData;
    }

    onMounted(async () => {
      await getVaccine();
      await getCovid();
    });

    return {
      vaccineTotalData,
      vacLabel,
      firstData,
      secondData,
      thirdData,
      regionName,
      todayCovid,
    };
  },
};
</script>

<style>
.dashboard_body {
  padding: 15px;
  background-color: rgb(236, 236, 236);
}
.category_title {
  text-align: center;
}
.vaccine_info {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.chart_card {
  margin: 15px;
  border-radius: 10px;
  background-color: white;
}
</style>

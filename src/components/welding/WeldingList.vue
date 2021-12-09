<template>
  <div class="welding-list">
    <div class="container-fluid">
      <div class="table-top">
        <h4 style="float: left">GBS03</h4>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="width: 40%; float: right; margin-right: 0px"
        />
      </div>
      <table class="table table-hover align-middle">
        <thead>
          <th>용접기 ID</th>
          <th>최종사용 날짜</th>
          <th>사용부서</th>
          <th>대여</th>
          <th>예약</th>
        </thead>
        <tbody>
          <tr v-for="data in state.gbs03" :key="data">
            <td>{{ data.eqp_id }}</td>
            <td>{{ data.last_timesstamp }}</td>
            <td style="width: 25%">{{ data.department }}</td>
            <td><button class="btn btn-primary">사용신청</button></td>
            <td><button class="btn btn-primary">예약하기</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container-fluid">
      <div class="table-top">
        <h4 style="float: left">TBAR</h4>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="width: 40%; float: right; margin-right: 0px"
        />
      </div>
      <table class="table table-hover align-middle">
        <thead>
          <th>용접기 ID</th>
          <th>최종사용 날짜</th>
          <th>사용부서</th>
          <th>대여</th>
          <th>예약</th>
        </thead>
        <tbody>
          <tr v-for="data in state.tbar" :key="data">
            <td>{{ data.eqp_id }}</td>
            <td>{{ data.last_timesstamp }}</td>
            <td>{{ data.department }}</td>
            <td><button class="btn btn-primary">사용신청</button></td>
            <td><button class="btn btn-primary">예약하기</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue-demi';
export default {
  components: {},
  props: {
    state: Object,
  },
  setup(props) {
    onMounted(() => {
      console.log(props.state);
    });
  },
};
</script>

<style scoped>
.table-top {
  padding: 5px 0px 0px 5px;
  height: 40px;
  margin-bottom: 10px;
}
.welding-list {
  display: grid;
  padding: 15px;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.container-fluid {
  background: white;
  border-radius: 5px;
  height: 91vh;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.container-fluid::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
table {
  border-collapse: collapse;
  border: 1px solid black;
}

td {
  -webkit-animation: blink-2 0.8s ease-in both;
  animation: blink-2 0.8s ease-in both;
  border: 1px solid #eeeeee;
  padding: 5px;
  text-align: center;
}

th {
  padding: 5px;
  border: 1px solid #eeeeee;
  text-align: center;
}
</style>

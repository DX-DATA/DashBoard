<template>
  <div class="container-fluid">
    <h4>고소차 상세 조회</h4>
    <div class="form-group">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="eqp_id"
          v-model="state.data.eqp_id"
          readonly
        />
        <label for="eqp_id">ID</label>
      </div>

      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="update"
          v-model="state.data.last_timestamp"
          readonly
        />
        <label for="update">최종 업데이트 시간</label>
      </div>

      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="use"
          v-model="state.useYN"
          readonly
        />
        <label for="use">사용여부</label>
      </div>

      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="department"
          v-model="state.data.department"
          readonly
        />
        <label for="department">사용부서</label>
      </div>

      <div class="form-floating location">
        <input
          type="text"
          class="form-control"
          id="location"
          v-model="state.location"
          readonly
        />
        <label for="location">현재위치</label>
      </div>

      <label class="label-input">경로 상세 조회</label>
      <div class="form-floating">
        <input type="date" class="form-control" />
        <label for="location">일자</label>
      </div>
      <button class="btn btn-primary">상세조회</button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';

export default {
  props: ['data'],
  setup(props) {
    console.log(props.data);

    let state = reactive({
      data: props.data,
      useYN: props.data.useYN === 1 ? '사용' : '미사용',
      location: props.data.current_gps_lat + ' / ' + props.data.current_gps_lon,
    });

    return { state };
  },
};
</script>

<style scoped>
.form-control {
  background-color: white !important;
}

.location {
  grid-column: 1 / 3;
}

.form-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  width: 100%;
}

.label-input {
  grid-column: 1 / 3;
}
</style>

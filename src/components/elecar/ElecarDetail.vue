<template>
  <div>
    <div class="form-floating">
      <input
        type="text"
        class="form-control"
        id="floatingInputValue"
        v-model="state.data.eqp_id" readonly
      />
      <label for="floatingInputValue">ID</label>
    </div>

    <div class="form-floating">
      <input
        type="text"
        class="form-control"
        id="floatingInputValue2"
        v-model="state.data.eqp_id" readonly
      />
      <label for="floatingInputValue2">사용여부</label>
    </div>

    <div class="form-floating">
      <input
        type="text"
        class="form-control"
        id="floatingInputValue2"
        v-model="state.data.eqp_id" readonly
      />
      <label for="floatingInputValue2">현재위치</label>
    </div>


    <label>경로 상세 조회</label>
    <input type="date" class="form-control" />
    <button class="btn btn-primary">상세조회</button>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';

export default {
  props: ["data"],
  setup(props) {
    console.log(props.data);

    let state = reactive({
      data : props.data,
    })

    return {state}
  },
};
</script>

<style scoped>
.form-control {
  background-color : white !important;
}

</style>

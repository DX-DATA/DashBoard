<template>
  <div class="container-fluid font-align">
    <div class="card"><h4>사용중인 용접기</h4></div>
    <div class="card"><h4>사용률 상위</h4></div>
    <div class="card"><h4>주간 전력 사용률</h4></div>
    <div class="card"><h4>전날 전력 사용률</h4></div>
  </div>
</template>

<script>
export default {
  name: 'WeldingMain',
  components: {},
  props: {},
};
</script>

<style scoped>
.container-fluid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
}

.card {
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  height: 300px;
}

.container-fluid >>> h4 {
  font-weight: bold;
}

.font-align {
  text-align: center;
}

.grid-item {
  margin: 10px;
  padding: 10px;
}

/* #usage {
  grid-column-start: 1;
  grid-column-end: 3;
} */

/* @media (max-width: 768px) {
  .container-fluid {
    display: flex;
    flex-direction: column;
  }
} */
</style>

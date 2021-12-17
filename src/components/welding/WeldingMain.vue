<template>
  <div class="container-fluid font-align">
    <div class="container">사용중인 용접기</div>
    <div class="container">사용률 상위</div>
    <div class="container">현재 전력 사용률 그래프</div>
    <div class="container">일일 전력 사용률 그래프</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
};
</script>

<style scoped>
.container-fluid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 10px;
}

.container {
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

#usage {
  grid-column-start: 1;
  grid-column-end: 3;
}

@media (max-width: 768px) {
  .container-fluid {
    display: flex;
    flex-direction: column;
  }
}
</style>

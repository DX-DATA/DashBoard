<template>
  <div class="container-fluid text-center">
    <div>
      <h5>고소차 목록</h5>
    </div>
    <Table :state="routeData" />
  </div>
</template>

<script>
// import { reactive } from '@vue/reactivity';
import Table from './ListTable.vue';

export default {
  components: { Table },
  props: {
    routeData: Object,
  },
  setup() {
    return {};
  },
  computed: {},
};
</script>

<style scoped>
.container-fluid {
  widows: 99%;
  background: white;
  margin-top: 20px;
  padding: 0px;
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

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.blink-2 {
  -webkit-animation: blink-2 0.8s ease-in both;
  animation: blink-2 0.8s ease-in both;
}

@-webkit-keyframes blink-2 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
@keyframes blink-2 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>

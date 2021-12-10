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
          <th>최종사용 시간</th>
          <th>사용부서</th>
          <th>대여</th>
          <th>예약</th>
        </thead>
        <tbody>
          <tr v-for="data in state.gbs03" :key="data" v-on:click="click(data)">
            <td>{{ data.eqp_id }}</td>
            <td>{{ data.last_timestamp }}</td>
            <td style="width: 25%">{{ data.department }}</td>
            <td>
              <button class="btn btn-primary" v-on:click="click(data)">
                사용신청
              </button>
            </td>
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
          <th>최종사용 시간</th>
          <th>사용부서</th>
          <th>대여</th>
          <th>예약</th>
        </thead>
        <tbody>
          <tr v-for="data in state.tbar" :key="data" v-on:click="click(data)">
            <td>{{ data.eqp_id }}</td>
            <td>{{ data.last_timestamp }}</td>
            <td>{{ data.department }}</td>
            <td>
              <button class="btn btn-primary" v-on:click="click(data)">
                사용신청
              </button>
            </td>
            <td><button class="btn btn-primary">예약하기</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="custom-modal" v-on:click="closeModal" ref="custom_modal">
      dtd
    </div>
    <div class="modal-content" ref="modal_content">
      <!-- <ElecarDetail :data="state.detail" :key="state.detail" /> -->
    </div>
    <div class="reserve-content" ref="reserve_content">
      <!-- <Reservation :data="state.reserveDetail" :key="state.reserveDetail" /> -->
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue-demi';
import { ref } from 'vue';
export default {
  components: {},
  props: {
    state: Object,
  },
  setup(props) {
    //ref를 통해 돔 조작
    const custom_modal = ref(null);
    const modal_content = ref(null);
    const reserve_content = ref(null);

    onMounted(() => {});

    let click = (data) => {
      console.log(data);
      console.log(props);
      custom_modal.value.style.display = 'block';
      modal_content.value.style.display = 'block';
    };

    let closeModal = () => {
      document.getElementsByClassName('custom-modal')[0].style.display = 'none';
      document.getElementsByClassName('modal-content')[0].style.display =
        'none';
      document.getElementsByClassName('reserve-content')[0].style.display =
        'none';
    };

    return { closeModal, click, custom_modal, modal_content, reserve_content };
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

.custom-modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  display: none; /* Hidden by default */
  padding: 10px;
  position: fixed; /* Stay in place */
  background-color: #fefefe;
  z-index: 101; /* Sit on top */
  margin-left: 5%;
  border: 1px solid #888;
  width: 80%;
  height: 550px;
  top: 20vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: fadein 0.4s;
  -moz-animation: fadein 0.4s; /* Firefox */
  -webkit-animation: fadein 0.4s; /* Safari and Chrome */
  -o-animation: fadein 0.4s; /* Opera */
  overflow: auto;
}

.reserve-content {
  display: none; /* Hidden by default */
  padding: 10px;
  position: fixed; /* Stay in place */
  background-color: #fefefe;
  z-index: 101; /* Sit on top */
  margin-left: 20%;
  border: 1px solid #888;
  width: 50%;
  height: 60vh;
  top: 15vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: fadein 0.4s;
  -moz-animation: fadein 0.4s; /* Firefox */
  -webkit-animation: fadein 0.4s; /* Safari and Chrome */
  -o-animation: fadein 0.4s; /* Opera */
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.reserve-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadein {
  /* Firefox */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {
  /* Safari and Chrome */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-o-keyframes fadein {
  /* Opera */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

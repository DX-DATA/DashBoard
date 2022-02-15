<template>
  <div class="rent-container">
    <div class="container-fluid align-middle">
      <h4 style="display: inline; margin-left: 40px">
        <i
          class="fas fa-chevron-left"
          style="cursor: pointer"
          v-on:click="reserve.onClickLeft"
        ></i>
        {{ reserve.day }}
        <i
          class="fas fa-chevron-right"
          style="cursor: pointer"
          v-on:click="reserve.onClickRight"
        ></i>
      </h4>
      <span
        class="badge bg-secondary"
        style="cursor: pointer; margin-left: 5px"
        v-on:click="reserve.toToday"
        >오늘</span
      >
    </div>
    <div class="timeTable">
      <table class="table table-hover table-bordered align-middle">
        <thead style="border-color: white">
          <th width="10%">시간</th>
          <th width="45%">예약현황</th>
          <th width="45%">예약부서</th>
        </thead>
        <tbody>
          <tr v-for="n in 25" :key="n">
            <td>{{ n - 1 }}</td>
            <td
              style="padding: 0px"
              v-if="reserve.times[n - 1]"
              class="reserved"
              v-on:click="reserve.cancleReserve(n - 1)"
            >
              예약중
            </td>
            <td
              v-else
              v-on:click="reserve.postReserve(n - 1)"
              class="reserve"
            ></td>
            <td
              style="padding: 0px"
              v-if="reserve.times[n - 1]"
              class="reserved"
              v-on:click="reserve.cancleReserve(n - 1)"
            >
              <div>{{ reserve.info[n - 1].department }}</div>
            </td>
            <td
              v-else
              class="reserve"
              v-on:click="reserve.postReserve(n - 1)"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="reserve-select">
      <div class="do-reserv-container">
        <span style="padding-top: 5px">예약 시작</span>
        <input
          type="date"
          class="form-control align-middle"
          v-model="reserve.day"
        />
        <select class="form-select divide" v-model="reserve.param.start_time">
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
          <option>21</option>
          <option>22</option>
          <option>23</option>
          <option>24</option>
        </select>
        <span style="padding-top: 5px">예약 종료</span>
        <input
          type="date"
          class="form-control align-middle"
          v-model="reserve.day"
        />
        <select class="form-select divide" v-model="reserve.param.end_time">
          <option>0</option>

          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
          <option>21</option>
          <option>22</option>
          <option>23</option>
          <option>24</option>
        </select>
      </div>
      <div class="button-group container">
        <button v-on:click="reserve.back" class="btn btn-primary">
          뒤로가기
        </button>

        <button class="btn btn-primary" v-on:click="reserve.doReserve">
          예약하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive } from 'vue-demi';
import axios from 'axios';
import { useStore } from 'vuex';
import api from '../../../../api/api';

export default {
  props: ['data'],
  setup(props) {
    const store = useStore();
    const url = store.getters.url;

    let reserve = reactive({
      day: getToday(),
      times: new Array(24),
      info: new Array(24),
      //이미 예약되어있는 시간 저장
      reserved_time: [],
      param: {
        start_time: '',
        end_time: '',
      },
      postReserve: (n) => {
        document.getElementsByClassName('timeTable')[0].style.display = 'none';
        document.getElementsByClassName('reserve-select')[0].style.display =
          'block';
        reserve.param.start_time = n;
        reserve.param.end_time = n + 1;
      },
      doReserve: () => {
        if (reserve.param.start_time >= reserve.param.end_time) {
          alert('올바른 시간대를 입력해 주세요');
          return;
        }

        let start = parseInt(reserve.param.start_time);
        let end = parseInt(reserve.param.end_time);

        for (let i = 0; i < reserve.reserved_time.length; i++) {
          if (
            reserve.reserved_time[i] >= start &&
            reserve.reserved_time[i] < end
          ) {
            alert('이미 예약되어있는 시간입니다.');
            return;
          }
        }

        //예약을 시작합니다.
        let param = {
          eqp_id: props.data.eqp_id,
          date: reserve.day,
          start_time: start + ':00',
          end_time: end + ':00',
          department: localStorage.getItem('department'),
          type: props.data.eqp_id.slice(0, 4) === 'TBAR' ? 'tbar' : 'gbs03',
        };

        axios({
          method: 'post',
          url: url + '/welding/reservation',
          headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
          data: param,
        })
          .then((response) => {
            if (response.data.affectedRows === 1) {
              alert('예약을 완료했습니다.');
            } else {
              alert('오류가 발생했습니다.');
            }
            getReservation(getToday());
            reserve.back();
          })
          .catch((e) => {
            console.log(e);
          });
      },
      cancleReserve: (n) => {
        if (localStorage.getItem('department') === reserve.info[n].department) {
          if (confirm('예약을 취소하시겠습니까?')) {
            axios({
              method: 'delete',
              url: url + '/welding/canclereserve',
              headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
              data: { reserv_id: reserve.info[n].reserv_id },
            })
              .then((response) => {
                if (response.data.affectedRows !== 1) {
                  alert('오류가 발생했습니다');
                } else {
                  alert('예약을 취소했습니다.');
                }
                getReservation(getToday());
              })
              .catch((e) => {
                console.log(e);
              });
          }
        } else {
          alert('소속부서의 예약만 취소 할 수 있습니다.');
        }
      },
      back: () => {
        document.getElementsByClassName('timeTable')[0].style.display = 'block';
        document.getElementsByClassName('reserve-select')[0].style.display =
          'none';
      },
      onClickLeft: () => {
        let temp = new Date(reserve.day);
        temp.setDate(temp.getDate() - 1);

        let month = temp.getMonth() + 1;
        if (month < 10) {
          month = '0' + month;
        }
        let day = temp.getDate();
        if (day < 10) {
          day = '0' + day;
        }
        reserve.day = temp.getFullYear() + '-' + month + '-' + day;
        getReservation(reserve.day);
      },
      onClickRight: () => {
        let temp = new Date(reserve.day);
        temp.setDate(temp.getDate() + 1);

        let month = temp.getMonth() + 1;
        if (month < 10) {
          month = '0' + month;
        }
        let day = temp.getDate();
        if (day < 10) {
          day = '0' + day;
        }
        reserve.day = temp.getFullYear() + '-' + month + '-' + day;
        getReservation(reserve.day);
      },
      toToday: () => {
        reserve.day = getToday();
        getReservation(reserve.day);
      },
    });

    function getToday() {
      let today = new Date();
      let month = today.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      let day = today.getDate();
      if (day < 10) {
        day = '0' + day;
      }
      return today.getFullYear() + '-' + month + '-' + day;
    }

    onMounted(() => {
      let today = getToday();

      getReservation(today);
    });

    onUnmounted(() => {
      reserve.times = new Array(24);
      reserve.info = new Array(24);
    });

    function getReservation(date) {
      reserve.times = new Array(24);
      reserve.info = new Array(24);
      reserve.param = {
        start_time: '',
        end_time: '',
      };
      reserve.reserved_time = [];
      axios
        .get(
          url +
            '/welding/reservation?eqp_id=' +
            props.data.eqp_id +
            '&date=' +
            date
        )
        .then((response) => {
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            let start = parseInt(data[i].start_time.slice(0, 2));
            let end = parseInt(data[i].end_time.slice(0, 2));

            for (let k = start; k < end; k++) {
              reserve.times[k] = true;
              reserve.info[k] = { department: '', reserv_id: '' };
              reserve.info[k].department = data[i].department;
              reserve.info[k].reserv_id = data[i].reserv_id;
              reserve.reserved_time.push(k);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    return { reserve };
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
.rent-container {
  display: flex;
  flex-direction: column;
}

.container-fluid {
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  text-align: center;
}

.container-fluid::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.reserve-select {
  display: none;
  margin-top: 50px;
}

.do-reserv-container {
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.4fr;
  gap: 10px;
  width: 60%;
  margin: 0 auto;
  border: 1px solid #eeeeee;
  padding: 10px;
  border-radius: 5px;
}

.reserve {
  cursor: pointer;
}

.reserved {
  background: #eeeeee;
}

.button-group {
  margin-top: 10px;
}
.button-group > button {
  margin: 5px;
}
</style>

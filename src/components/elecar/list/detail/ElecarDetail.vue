<template>
  <div class="detail-container">
    <div class="container-fluid">
      <h4>고소차 대여 및 상세 조회</h4>
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

        <div class="form-floating" v-if="state.bool">
          <input
            type="text"
            class="form-control"
            id="start"
            v-model="state.data.start_time"
            readonly
          />
          <label for="start">사용시작시간</label>
        </div>
        <div v-else>
          <input
            type="date"
            class="form-control div_date"
            v-model="rent.start_time.date"
          />
          <select class="form-select divide" v-model="rent.start_time.hour">
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
          <select class="form-select divide" v-model="rent.start_time.time">
            <option selected>0</option>
            <option selected>30</option>
          </select>
        </div>

        <div class="form-floating" v-if="state.bool">
          <input
            type="text"
            class="form-control"
            id="return"
            v-model="state.data.end_time"
            readonly
          />
          <label for="start">사용종료시간</label>
        </div>
        <div v-else>
          <input
            type="date"
            class="form-control div_date"
            v-model="rent.end_time.date"
          />
          <select class="form-select divide" v-model="rent.end_time.hour">
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
          <select class="form-select divide" v-model="rent.end_time.time">
            <option selected>0</option>
            <option selected>30</option>
          </select>
        </div>
        <button
          class="btn btn-primary"
          v-if="!state.bool"
          v-on:click="rent.postRent"
          style="grid-column: 1 / 3"
        >
          대여하기
        </button>
        <button
          class="btn btn-warning"
          v-else-if="checkDepartment()"
          v-on:click="returnElecar()"
          style="grid-column: 1 / 3"
        >
          반납하기
        </button>
        <button
          class="btn btn-secondary"
          v-else
          disabled
          style="grid-column: 1 / 3"
        >
          사용중
        </button>

        <label class="label-input">경로 상세 조회</label>

        <div class="form-floating">
          <input type="date" class="form-control" v-model="search.date" />
          <label for="location">일자</label>
        </div>
        <button class="btn btn-primary" v-on:click="search.query(data)">
          상세조회
        </button>
      </div>
      <DetailTable :data="search.data" :key="search.data" />
    </div>
    <KakaoMap
      :options="state.mapOption"
      :key="state.mapOption.center.lat"
      :positions="search.positions"
    />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import DetailTable from './DetailTable';
import KakaoMap from '../../../modules/KakaoMap.vue';
import axios from 'axios';
import { useStore } from 'vuex';
import api from '../../../../api/api';
export default {
  components: { DetailTable, KakaoMap },
  props: ['data'],
  setup(props) {
    let store = useStore();
    let url = store.getters.url;

    //정보들 state
    let state = reactive({
      data: props.data,
      useYN: props.data.useYN === 1 ? '사용' : '미사용',
      bool: props.data.useYN === 1 ? true : false,
      location: props.data.current_gps_lat + ' / ' + props.data.current_gps_lon,

      mapOption: {
        center: {
          lat: props.data.current_gps_lat,
          lng: props.data.current_gps_lon,
        },
        level: 6,
      },
    });

    let rent = reactive({
      start_time: {
        date: getToday(),
        hour: new Date().getHours(),
        time: 0,
      },
      end_time: {
        date: getToday(),
        hour: new Date().getHours() + 1,
        time: 0,
      },
      initialization_time: () => {
        rent.start_time = {
          date: getToday(),
          hour: new Date().getHours(),
          time: 0,
        };
        rent.end_time = {
          date: getToday(),
          hour: new Date().getHours() + 1,
          time: 0,
        };
      },
      postRent: () => {
        if (rent.start_time.hour < 10) {
          rent.start_time.hour = '0' + rent.start_time.hour;
        }

        if (rent.start_time.time < 10) {
          rent.start_time.time = '0' + rent.start_time.time;
        }

        if (rent.end_time.hour < 10) {
          rent.end_time.hour = '0' + rent.end_time.hour;
        }

        if (rent.end_time.time < 10) {
          rent.end_time.time = '0' + rent.end_time.time;
        }

        let params = {
          eqp_id: state.data.eqp_id,
          start_time:
            rent.start_time.date +
            ' ' +
            rent.start_time.hour +
            ':' +
            rent.start_time.time +
            ':00',
          end_time:
            rent.end_time.date +
            ' ' +
            rent.end_time.hour +
            ':' +
            rent.end_time.time +
            ':00',
        };

        let now = new Date();
        let start = new Date(params.start_time);
        if (now > start) {
          alert('시간을 확인해 주세요.');
          rent.initialization_time();
          return;
        }

        if (
          confirm(
            '고소차 ID : ' +
              params.eqp_id +
              '\n대여 시작 시각 : ' +
              params.start_time +
              '\n대여 종료 시각 : ' +
              params.end_time +
              '\n대여 하시겠습니까?'
          )
        ) {
          axios({
            method: 'post',
            url: url + '/elecar/rent',
            headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
            data: params,
          })
            .then((response) => {
              if (response.data.affectedRows !== 1) {
                ('에러가 발생했습니다 다시 시도해 주세요');
              } else {
                alert('대여를 완료했습니다.');
                // window.location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          rent.initialization_time();
        }
      },
    });
    //상세 조회 param
    let search = reactive({
      date: getToday(),
      data: [], //테이블 데이터들임니다람쥐!!
      positions: undefined,

      query: (data) => {
        let param = data.eqp_id + '_' + search.date;
        axios
          .get(url + '/elecar/locations?key=' + param)
          .then((response) => {
            search.positions = response.data;
            search.data = response.data;
            state.mapOption.center.lat = response.data[1].gps_lat;
            state.mapOption.center.lng = response.data[1].gps_lon;
          })
          .catch((err) => {
            console.log(err);
          });
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

    let checkDepartment = () => {
      if (localStorage.getItem('department') === state.data.department) {
        return true;
      } else {
        return false;
      }
    };

    let returnElecar = () => {
      if (confirm('반납하시겠습니까?')) {
        axios({
          method: 'post',
          url: url + '/elecar/return',
          headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
          data: { eqp_id: state.data.eqp_id },
        })
          .then((response) => {
            if (response.data.affectedRows === 1) {
              alert('반납을 완료했습니다.');
            } else {
              alert('오류가 발생했습니다.');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    return { state, rent, search, checkDepartment, returnElecar };
  },
};
</script>

<style scoped>
.detail-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
}

.container-fluid {
  height: 500px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.container-fluid::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

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

.btn {
  height: 58px;
}

.div_date {
  width: 50%;
  display: inline;
}

.divide {
  width: 23%;
  margin-left: 2%;
  display: inline;
}
</style>

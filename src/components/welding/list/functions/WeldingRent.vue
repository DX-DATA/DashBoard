<template>
  <div class="container">
    <h3>용접기 대여</h3>
    <div class="form-floating">
      <input
        type="text"
        class="form-control readonly-white"
        id="eqp_id"
        v-model="state.data.eqp_id"
        readonly
      />
      <label for="eqp_id">장비 ID</label>
    </div>
    <div class="form-floating">
      <input
        type="text"
        class="form-control readonly-white"
        id="department"
        v-model="state.department"
        readonly
      />
      <label for="department">신청 부서</label>
    </div>
    <label for="start" class="label-input">사용 시작 시간</label>
    <div class="date-input">
      <input
        type="date"
        id="start"
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

    <label for="end" class="label-input">사용 종료 시간</label>
    <div class="date-input">
      <input
        id="end"
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
      v-on:click="rent.postRent"
      style="grid-column: 1 / 3"
    >
      대여하기
    </button>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import api from '../../../../api/api';
import { useStore } from 'vuex';

// import axios from 'axios';
export default {
  props: ['data'],
  setup(props, context) {
    const store = useStore();
    const url = store.getters.url;

    onMounted(() => {});

    let state = reactive({
      data: props.data,
      department: localStorage.getItem('department'),
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
          type: state.data.eqp_id.slice(0, 4) === 'TBAR' ? 'tbar' : 'gbs03',
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
            '용접기 ID : ' +
              params.eqp_id +
              '\n대여 시작 시각 : ' +
              params.start_time +
              '\n대여 종료 시각 : ' +
              params.end_time +
              '\n대여 하시겠습니까?'
          )
        ) {
          axios({
            method: 'put',
            url: url + '/welding/rent',
            headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
            data: params,
          })
            .then((response) => {
              if (response.data.affectedRows !== 1) {
                ('에러가 발생했습니다 다시 시도해 주세요');
              } else {
                alert('대여를 완료했습니다.');
                context.emit('closeModal');
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

    return { state, rent };
  },
};
</script>

<style scoped>
.container {
  background: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  display: grid;
  gap: 5px;
  width: 100%;
}

.btn {
  height: 58px;
}

.div_date {
  width: 49.5%;
  display: inline;
}

.divide {
  width: 24.25%;
  margin-left: 1%;
  display: inline;
}

.date-input {
  grid-column: 1/3;
}

.readonly-white {
  background: white;
}

.label-input {
  text-align: left;
  margin-left: 3px;
  color: gray;
  font-size: 14px;
  margin-bottom: -10px;
}
</style>

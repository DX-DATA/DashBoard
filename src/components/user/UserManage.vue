<template>
  <section class="card">
    <h4>사용자 목록</h4>
    <table class="table table-hover align-middle">
      <thead>
        <!-- <tr v-for="elecar in elecarFilter" :key="elecar">
          <td>{{ elecar.eqp_id }}</td>
          <td>{{ elecar.department }}</td>
          <td>{{ elecar.start_time }}</td>
          <td>{{ elecar.end_time }}</td>
        </tr> -->
        <tr>
          <td>No</td>
          <td>유저 ID</td>
          <td style="width: 30%">부서</td>
          <td>권한</td>
          <td>삭제</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user">
          <td>{{ index }}</td>
          <td>{{ user.user_id }}</td>
          <td v-if="focused[index]">
            <input
              type="text"
              class="form-control"
              @blur="focused[index] = false"
              v-model="user.department"
              style="width: 70%; display: inline; margin: 0"
              @change="onChangeAuth(user)"
            />
          </td>
          <td v-else v-on:click="focused[index] = true">
            {{ user.department }}
          </td>

          <td>
            <select
              class="form-select"
              v-model="user.admin"
              @change="onChangeAuth(user)"
            >
              <option value="0">일반 사용자</option>
              <option value="1">관리자</option>
            </select>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              @click="onDelete(user.user_id)"
            >
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary" @click="onSave">저장</button>
  </section>
</template>

<script>
import axios from 'axios';
import api from '../../api/api';

export default {
  name: 'UserManage',
  data() {
    return {
      users: [],
      changeUsers: [],
      focused: [],
    };
  },
  methods: {
    getUsers() {
      axios.get('http://api.dxdata.co.kr:3333/auth/list').then((res) => {
        this.users = res.data;
        for (let i = 0; i < res.data.length; i++) {
          this.focused.push(false);
        }
      });
    },
    onChangeAuth(user) {
      this.changeUsers = this.changeUsers.filter(
        (v, idx) => this.changeUsers[idx].user_id != user.user_id
      );
      this.changeUsers.push(user);
    },
    onSave() {
      axios({
        method: 'put',
        url: 'http://api.dxdata.co.kr:3333/auth/modify_auth',
        headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
        data: this.changeUsers,
      })
        .then((res) =>
          res.data.status == 1 ? alert('사용자 정보가 수정되었습니다.') : {}
        )
        .catch((e) => console.log(e));
    },
    onDelete(id) {
      if (confirm('삭제하시겠습니까?')) {
        axios({
          method: 'delete',
          url: 'http://api.dxdata.co.kr:3333/auth/delete',
          headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
          data: { id: id },
        })
          .then(
            (res) =>
              res.data.status == 1
                ? alert('사용자 삭제가 완료되었습니다.')
                : {},
            location.reload()
          )
          .catch((e) => console.log(e));
      }
    },
    log(e) {
      console.log(e);
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style scoped>
.card {
  max-width: 1000px;
  margin: auto;
  padding: 10px;
  text-align: center;
}
.card h4,
thead {
  font-weight: bold;
}
.card button {
  align-self: flex-end;
  width: 100px;
}
</style>

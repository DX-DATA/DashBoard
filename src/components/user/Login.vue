<template>
  <div class="container">
    <div class="logo-header"><img src="/logo2.png" /></div>

    <div class="banner">
      <h3 style="color: #777777">NOTICE</h3>

      <hr />

      <div class="banner-content">
        <table class="table">
          <tbody>
            <tr v-for="data in states.notice" :key="data">
              <td style="width: 30%">{{ data.date.slice(0, 16) }}</td>
              <td style="width: 50%">{{ data.title }}</td>
              <td style="width: 20%">{{ data.user_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="form">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="ID"
          v-model="states.id"
        />
        <label for="floatingInput">ID</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="states.password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating mb-3">
        <button class="btn btn-primary login-button" v-on:click="login">
          Sign In
        </button>
      </div>
      <br />
      <div class="forget form-floating mb-3">
        <router-link to="/signUp"
          ><button class="btn btn-sign">회원가입</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import axios from 'axios';
import { onMounted } from 'vue-demi';

export default {
  setup() {
    const store = useStore();
    const url = store.getters.url;

    onMounted(() => {
      axios.get(url + '/board/notice/login').then((response) => {
        states.notice = response.data;
      });
    });

    let states = reactive({
      id: '',
      password: '',
      notice: '',
    });

    let login = async () => {
      axios
        .post(url + '/auth/login', {
          id: states.id,
          password: states.password,
        })
        .then(async (response) => {
          if (response.data === -1 || response.data === 0) {
            alert('로그인 정보를 다시 확인해 주세요');
          } else {
            let setcookie = async (response) => {
              document.cookie = 'auth=' + response.data.token + '; path=/;';
            };
            await setcookie(response);
            localStorage.setItem('department', response.data.department);
            localStorage.setItem('admin', response.data.admin);
            location.href = '/';
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return { states, login };
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  display: grid;
  grid-template-columns: 800px 450px;
  grid-template-areas:
    'logo-header banner'
    'form banner';
  column-gap: 70px;
  row-gap: 10px;
  align-items: center;
  height: 600px;
  margin-top: 17vh;
}

.form-control {
  width: 80%;
}

.form-floating {
  margin-left: 10%;
}
.logo-header {
  text-align: left;
  grid-area: logo-header;
}

.form-control {
  width: 80%;
}

.form-floating {
  margin-left: 10%;
}
.logo-header {
  text-align: left;
  grid-area: logo-header;
}

.banner {
  grid-row: 1 / 3;
  grid-area: banner;
  height: 580px;
  width: 100%;
  box-shadow: rgba(149, 157, 165, 0.4) 1px 5px 24px;
  border-radius: 5px;
  padding: 10px;
}

.table {
  color: #555555;
}

.table > tbody > tr > td {
  font-size: 14px;
}

.banner-content {
  text-align: left;
}

.banner-table-tr {
  padding: 10px;
  margin-bottom: 10px;
}

.form {
  width: 100%;
  margin: 0 auto;
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
  border-radius: 10px;
  height: 450px;
  padding: 70px 20px 20px 20px;
  grid-area: form;
  text-align: left;
}

input:focus,
input:not(:placeholder-shown) {
  border-bottom: solid 1px #8aa1a1;
  outline: none;
}

.forget {
  font-size: smaller;
  padding-top: 0px;
}

.btn-sign {
  width: 30%;
  margin-left: 60%;
  color: #aaaaaa;
}

.btn-sign:hover {
  color: black;
}

.login-button {
  margin-top: 30px;
  height: 70px;
  width: 80%;
  font-size: 16px;
}

@media (max-width: 768px) {
  img {
    width: 50vh;
  }
  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .banner {
    display: none;
  }

  .form {
    width: 80vh;
    margin: 0 auto;
    box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
    border-radius: 10px;
    height: 375px;
    padding: 20px;
  }
}
</style>

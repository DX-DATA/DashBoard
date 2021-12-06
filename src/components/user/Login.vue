<template>
  <div class="container">
    <div class="form">
      <img src="/logo.png" />
      <div class="input-box">
        <input type="text" id="id" v-model="states.id" placeholder="id" />
        <label for="id">ID</label>
      </div>
      <div class="input-box">
        <input
          type="password"
          id="pw"
          placeholder="password"
          v-model="states.password"
        />
        <label for="pw">PW</label>
      </div>
      <button class="btn btn-primary" v-on:click="login">로그인</button>

      <br />
      <div class="forget">
        <a href="#">비밀번호를 잊어버리셨나요?</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  setup() {
    const store = useStore();
    const url = store.getters.url;

    let states = reactive({
      id: '',
      password: '',
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
            location.href = '/home';
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
  display: flex;
  align-items: center;
  height: 100vh;
}

.form {
  width: 40vh;
  margin: 0 auto;
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
  border-radius: 10px;
  height: 375px;
  padding: 20px;
}

.input-box {
  position: relative;
  margin: 20px 10px 20px 10px;
}
.input-box > input {
  background: transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 20px 0px 5px 0px;
  font-size: 14pt;
  width: 100%;
}
input::placeholder {
  color: transparent;
}
input:placeholder-shown + label {
  color: #aaa;
  font-size: 14pt;
  top: 15px;
}
input:focus + label,
label {
  color: #8aa1a1;
  font-size: 10pt;
  pointer-events: none;
  position: absolute;
  left: 0px;
  top: 0px;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
}

input:focus,
input:not(:placeholder-shown) {
  border-bottom: solid 1px #8aa1a1;
  outline: none;
}

.forget {
  text-align: right;
  font-size: smaller;
  padding-top: 50px;
}

@media (max-width: 768px) {
  .form {
    width: 40vh;
    margin: 0 auto;
    box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
    border-radius: 10px;
    height: 375px;
    padding: 20px;
  }
}
</style>

<template>
  <div class="container">
    <div class="form">
      <img src="/logo.png" />
      <div class="input">
        <div class="title">ID</div>
        <input
          type="text"
          class="form-control"
          placeholder="ID를 입력해주세요"
          v-model="ID"
        />
      </div>
      <div class="input">
        <div class="title">PW</div>
        <input
          type="text"
          class="form-control"
          placeholder="비밀번호를 입력해주세요"
          v-model="PW"
        />
      </div>
      <div class="input">
        <div class="title">부서</div>
        <input
          type="text"
          class="form-control"
          placeholder="소속된 부서를 입력해주세요"
          v-model="department"
        />
      </div>
      <div class="select">
        <button type="button" class="btn btn-primary" @click="console">
          가입
        </button>
        <button type="button" class="btn btn-light" @click="back">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      ID: '',
      PW: '',
      department: '',
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
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
  padding: 20px;
}
.form img {
  margin-bottom: 10px;
}
.input {
  margin: 20px 0px;
  display: flex;
  align-items: center;
}
.title {
  text-align: left;
  font-weight: bold;
  width: 70px;
}
.select button {
  margin: 0 20px;
}
.btn-light {
  border: 1px solid rgb(196, 196, 196);
  color: #0d6efd;
}
</style>

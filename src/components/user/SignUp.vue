<template>
  <div class="container">
    <div class="form">
      <div class="input">
        <label class="title">ID</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-valid': isValid[0], 'is-invalid': isInValid[0] }"
          placeholder="Enter ID"
          v-model="ID"
          @change="valid(ID, 0)"
        />
        <div class="invalid-feedback">빈칸을 채워주세요</div>
      </div>
      <div class="input">
        <label class="title">PW</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-valid': isValid[1], 'is-invalid': isInValid[1] }"
          placeholder="Enter Password"
          v-model="PW"
          @change="valid(PW, 1)"
        />
        <div class="invalid-feedback">빈칸을 채워주세요</div>
      </div>
      <div class="input">
        <label class="title">부서</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-valid': isValid[2], 'is-invalid': isInValid[2] }"
          placeholder="Enter Department"
          v-model="department"
          @change="valid(department, 2)"
        />
        <div class="invalid-feedback">빈칸을 채워주세요</div>
      </div>
      <div class="select">
        <button type="button" class="btn btn-primary" @click="signUp">
          가입
        </button>
        <button type="button" class="btn btn-light" @click="back">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      ID: '',
      PW: '',
      department: '',
      isValid: [false, false, false],
      isInValid: [false, false, false],
    };
  },
  methods: {
    signUp() {
      const userInfo = {
        id: this.ID,
        password: this.PW,
        department: this.department,
      };
      if (this.ID == '' || this.PW == '' || this.department == '') {
        if (this.ID == '') this.isInValid[0] = true;
        if (this.PW == '') this.isInValid[1] = true;
        if (this.department == '') this.isInValid[2] = true;
      } else {
        axios({
          method: 'post',
          url: 'http://api.dxdata.co.kr:3333/auth/signup',
          data: userInfo,
        })
          .then((res) =>
            res.data.affectedRows == 1
              ? (alert('회원가입이 완료되었습니다.'), this.$router.go(-1))
              : res.data.code == 'ER_DUP_ENTRY'
              ? alert('ID가 중복됩니다.')
              : alert('알 수 없는 원인으로 회원가입에 실패했습니다.')
          )
          .catch((e) => console.log(e));
      }
    },
    back() {
      this.$router.go(-1);
    },
    valid(str, idx) {
      if (str == '') {
        this.isValid[idx] = false;
        this.isInValid[idx] = true;
      } else {
        this.isInValid[idx] = false;
        this.isValid[idx] = true;
      }
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
  box-shadow: rgba(149, 157, 165, 0.4) 0px 5px 24px;
  border-radius: 10px;
  padding: 20px;
}
.form img {
  margin-bottom: 10px;
}
.input {
  margin: 20px 0px;
  align-items: center;
  text-align: left;
}
.title {
  font-weight: bold;
}
.select button {
  margin: 0 20px;
}
.btn-light {
  border: 1px solid rgb(196, 196, 196);
  color: #0d6efd;
}
</style>

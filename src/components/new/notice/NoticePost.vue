<template>
  <div>
    <navbar></navbar>
  </div>
  <div class="custom-container">
    <div class="header-content">
      <span class="gray-text" v-if="state.isReadonly">NOTICE > Detail</span>
      <span class="gray-text" v-if="!state.isReadonly">NOTICE > Write</span>

      <!-- <hr /> -->
    </div>
    <div class="input-group">
      <input
        type="text"
        :readonly="state.isReadonly && !state.isAdmin"
        v-model="state.data.title"
        class="title"
        placeholder="제목을 입력해주세요"
      />
      <div class="info">
        <!-- <input
          type="text"
          readonly
          v-model="state.data.user_id"
          class="user_id"
          placeholder="작성자(자동 입력)"
        /> -->
        <div class="user_id">{{ state.data.user_id }}</div>
        <div class="date">{{ state.data.date }}</div>
        <!-- <input
          type="text"
          readonly
          v-model="state.data.date"
          class="date"
          placeholder="작성일자(자동 입력)"
        /> -->
      </div>
      <textarea
        type="text"
        :readonly="state.isReadonly && !state.isAdmin"
        v-model="state.data.content"
        class="content"
        placeholder="내용을 입력해주세요"
      />
    </div>

    <div class="btn-group">
      <button
        class="btn btn-primary"
        v-if="state.isReadonly"
        v-on:click="btnFunction.goback"
      >
        뒤로가기
      </button>
      <button
        class="btn btn-warning"
        v-if="state.isAdmin && state.isReadonly"
        v-on:click="btnFunction.modify"
      >
        수정하기
      </button>
      <button
        class="btn btn-danger"
        v-if="state.isAdmin && state.isReadonly"
        v-on:click="btnFunction.delete"
      >
        삭제하기
      </button>
      <button
        class="btn btn-primary"
        v-if="state.isAdmin && !state.isReadonly"
        v-on:click="btnFunction.write"
      >
        등록하기
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue-demi';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
import api from '../../../api/api';
import Navbar from '../layout/Navbar.vue';
export default {
  components: { Navbar },
  setup() {
    const store = useStore();
    const url = store.getters.url;
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      console.log(route.params);

      if (localStorage.getItem('admin') == 1) {
        state.isAdmin = true;
      }
      state.id = route.params.id;

      if (state.id == 'write') {
        state.isReadonly = false;
        return;
      }

      axios
        .get(url + '/board/notice/?board_idx=' + route.params.id, {
          headers: {
            Authorization: 'Bearer ' + api.getCookie('auth'),
          },
        })
        .then((response) => {
          state.data = response.data[0];
        });
    });

    let state = reactive({
      id: '',
      data: {
        board_idx: '',
        title: '',
        user_id: '',
        content: '',
        date: '',
      },
      isReadonly: true,
      isAdmin: false,
    });

    let btnFunction = {
      goback: () => {
        router.push({ name: 'notice' });
      },
      modify: () => {
        if (!confirm('수정하시겠습니까?')) {
          return;
        }
        axios({
          method: 'put',
          url: url + '/board/notice/',
          headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
          data: {
            title: state.data.title,
            content: state.data.content,
            board_idx: state.data.board_idx,
          },
        }).then((response) => {
          console.log(response);
          if (response.data.affectedRows == 1) {
            alert('수정이 완료되었습니다.');
            router.push({
              name: 'notice',
            });
          }
        });
      },
      delete: () => {
        if (!confirm('삭제하시겠습니까?')) {
          return;
        }
        axios({
          method: 'delete',
          url: url + '/board/notice/',
          headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
          data: {
            board_idx: state.data.board_idx,
          },
        }).then((response) => {
          console.log(response);
          if (response.data.affectedRows == 1) {
            alert('삭제가 완료되었습니다.');
            router.push({
              name: 'notice',
            });
          }
        });
      },
      write: () => {
        if (!confirm('공지를 등록하시겠습니까?')) {
          return;
        }
        axios({
          method: 'post',
          url: url + '/board/notice/',
          headers: { Authorization: 'Bearer ' + api.getCookie('auth') },
          data: {
            title: state.data.title,
            content: state.data.content,
          },
        }).then((response) => {
          console.log(response);
          if (response.data.affectedRows == 1) {
            alert('등록이 완료되었습니다.');
            router.push({
              name: 'notice',
            });
          }
        });
      },
    };

    return { state, btnFunction };
  },
};
</script>

<style scoped>
.custom-container {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  background: white;
}

.header-content {
  padding: 5px 10px;
  border-bottom: 1px solid black;
}

.gray-text {
  font-size: 22px;
  color: #444444;
}

.input-group {
  padding: 5px 10px;
  display: block;
}

input {
  outline: none;
  border: none;
  border-bottom: 1px solid #bbbbbb;
  display: block;
  height: 40px;
  color: #444444;
  margin: 5px 0px;
  padding-left: 5px;
}

input:focus {
  outline: none;
}

.title {
  width: 100%;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}

.title:focus {
  border: 1px solid black;
  border-radius: 3px;
}

.info {
  display: flex;
  justify-content: flex-end;
  color: gray;
  font-size: 15px;
}

.user_id {
  margin-right: 30px;
}

.date {
}

.content {
  outline: none;
  border: none;
  border-bottom: 1px solid #bbbbbb;
  display: block;
  width: 100%;
  height: 550px;
  resize: none;
  padding-top: 10px;
  padding-left: 5px;
}

.content:focus {
  border: 1px solid black;
  border-radius: 3px;
}

.btn-group {
  float: right;
}

.btn {
  margin: 5px 5px;
}
</style>

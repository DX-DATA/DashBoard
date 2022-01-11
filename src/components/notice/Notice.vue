<template>
  <div class="custom-container">
    <div class="header-content">
      <span class="gray-text">NOTICE</span>
      <span>
        <input
          class="search"
          type="text"
          placeholder="Search"
          v-model="search.data"
        />
      </span>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <td width="10%">No</td>
          <td width="55%">제목</td>
          <td width="20%">작성자</td>
          <td width="15%">작성일자</td>
        </thead>
        <tbody>
          <tr
            v-for="ele in state.data"
            :key="ele"
            v-on:click="state.route(ele.board_idx)"
          >
            <td style="padding-left: 5px">
              {{ ele.board_idx }}
            </td>
            <td>
              {{ ele.title }}
            </td>
            <td>
              {{ ele.user_id }}
            </td>
            <td>
              {{ ele.date.slice(0, 16) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btn-group">
      <button
        class="btn btn-primary"
        v-if="state.isAdmin"
        v-on:click="state.write"
      >
        공지 등록
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue-demi';
import { useStore } from 'vuex';
import axios from 'axios';
import api from '../../api/api';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const url = store.getters.url;

    onMounted(() => {
      if (localStorage.getItem('admin') == 1) {
        state.isAdmin = true;
      }
      axios
        .get(url + '/board/notice/list', {
          headers: {
            Authorization: 'Bearer ' + api.getCookie('auth'),
          },
        })
        .then((response) => {
          state.data = response.data;
          state.originData = response.data.reverse();
        });
    });

    let state = reactive({
      data: '',
      originData: '',
      isAdmin: false,
      route: (id) => {
        router.push({
          name: 'noticePost',
          params: { id: id, isReadonly: true },
        });
      },
      write: () => {
        router.push({
          name: 'noticePost',
          params: { id: 'write' },
        });
      },
    });

    let search = reactive({
      data: '',
      onSearch: () => {
        console.log();
      },
    });

    watch(search, () => {
      let temp = [];
      for (let i = 0; i < state.originData.length; i++) {
        if (
          state.originData[i].title
            .toLowerCase()
            .match(search.data.toLowerCase()) ||
          state.originData[i].user_id
            .toLowerCase()
            .match(search.data.toLowerCase()) ||
          state.originData[i].date
            .toLowerCase()
            .match(search.data.toLowerCase())
        ) {
          temp.push(state.originData[i]);
        }
      }

      state.data = temp;
    });

    return { state, search };
  },
};
</script>

<style scoped>
.custom-container {
  width: 90%;
  margin: 30px auto;
  padding: 20px;

  background: white;
}

.header-content {
  padding: 5px 10px;
}

.gray-text {
  font-size: 22px;
  color: #444444;
}

.search {
  float: right;
  border-top: none;
  border-left: none;
  border-right: none;
  width: 200px;
  border-bottom: 1px solid #aaaaaa;
}

.search:focus {
  outline: none;
  border-bottom: 1px solid #333333;
}

.custom-container > div > table {
  width: 100%;
  margin: 20px auto;
  padding: 10px;
  color: #555;
}

.table-wrap {
  height: 700px;
  overflow: auto;
}

.table-wrap::-webkit-scrollbar {
  width: 3px;
  background-color: #aaaaaa;
}

.custom-container > div > table > thead {
  width: 100%;
  border-bottom: 1px solid #dddddd;
  font-size: 18px;
  font-weight: bold;
}

.custom-container > div > table > tbody {
  width: 100%;
}

.custom-container > div > table > tbody > tr {
  border-bottom: 1px solid #dddddd;
  height: 50px;
  border-radius: 3px;
}

.custom-container > div > table > tbody > tr:hover {
  background: #eeeeee;
  cursor: pointer;
}

.btn-group {
  float: right;
}

.btn {
  margin: 10px 5px;
}
</style>

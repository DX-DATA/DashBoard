<template>
  <div class="custom-container">
    <div class="header-content">
      <span class="gray-text">NOTICE</span>
      <span>
        <input class="search" type="text" placeholder="Search" />
      </span>
    </div>
    <table>
      <thead>
        <td width="10%">No</td>
        <td width="55%">제목</td>
        <td width="20%">게시자</td>
        <td width="15%">날짜</td>
      </thead>
      <tbody>
        <tr
          v-for="ele in state.data"
          :key="ele"
          v-on:click="state.route(ele.board_idx)"
        >
          <td>
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
</template>

<script>
import { onMounted, reactive } from 'vue-demi';
import { useStore } from 'vuex';
import axios from 'axios';
import api from '../../api/api';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const url = store.getters.url;

    onMounted(() => {
      axios
        .get(url + '/board/notice/list', {
          headers: {
            Authorization: 'Bearer ' + api.getCookie('auth'),
          },
        })
        .then((response) => {
          state.data = response.data.reverse();
        });
    });

    let state = reactive({
      data: '',
      route: (id) => {
        console.log(id);
        router.push({ name: 'noticePost', params: { id: id } });
      },
    });

    return { state };
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
  color: #666666;
}

.search {
  float: right;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #aaaaaa;
}

.search:focus {
  outline: none;
  border-bottom: 1px solid #333333;
}

.custom-container > table {
  width: 100%;
  margin: 20px auto;
  padding: 10px;
  color: #666666;
}

.custom-container > table > thead {
  width: 100%;
  border-bottom: 1px solid #dddddd;
  font-size: 18px;
  font-weight: bold;
}

.custom-container > table > tbody {
  width: 100%;
}

.custom-container > table > tbody > tr {
  border-bottom: 1px solid #dddddd;
  height: 50px;
}

.custom-container > table > tbody > tr:hover {
  background: #eeeeee;
  cursor: pointer;
}
</style>

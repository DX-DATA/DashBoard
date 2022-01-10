<template>
  <div>
    {{ state.data }}
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue-demi';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
import api from '../../api/api';
export default {
  setup() {
    const store = useStore();
    const url = store.getters.url;
    const route = useRoute();

    onMounted(() => {
      console.log(route.params);
      state.id = route.params.id;

      axios
        .get(url + '/board/notice/?board_idx=' + route.params.id, {
          headers: {
            Authorization: 'Bearer ' + api.getCookie('auth'),
          },
        })
        .then((response) => {
          state.data = response.data;
        });
    });

    let state = reactive({
      id: '',
      data: '',
    });

    return { state };
  },
};
</script>

<style scoped></style>

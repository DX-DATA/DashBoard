import { createStore } from 'vuex';

export default createStore({
  state: {
    token: null,
    islogin: false,
    url: 'http://api.dxdata.co.kr:3333',
  },
  getters: {
    token(state) {
      return state.token;
    },
    islogin(state) {
      return state.islogin;
    },
    url(state) {
      return state.url;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setLogin(state, boolean) {
      state.login = boolean;
    },
  },
});

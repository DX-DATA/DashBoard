import { createStore } from 'vuex';

export default createStore({
  state: {
    token: null,
    login: false,
  },
  getters: {
    token(state) {
      return state.token;
    },
    login(state) {
      return state.login;
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

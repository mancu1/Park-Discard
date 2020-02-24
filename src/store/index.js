import Vue from "vue";
import Vuex from "vuex";
import login from "./login";
import parking from "./parking";
import notification from "./notification";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { login, parking, notification },
  plugins: [createPersistedState()]
});

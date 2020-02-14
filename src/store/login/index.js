import * as actions from "./actions";
import mutations from "./mutations";
import state from "./state";

export default {
  //namespace: true,
  mutations,
  getters: {
    isLogin: state => {
      return state.isLogin;
    }
  },
  actions,
  state
};

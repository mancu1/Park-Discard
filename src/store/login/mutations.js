import {
  SET_CODE,
  SET_LOGIN,
  SET_PHONE,
  SET_STEP,
  SET_TOKEN
} from "./mutation-types";

export default {
  /**
   * @param { object } state
   * @param { bool } isLogin
   */
  [SET_LOGIN](state, isLogin) {
    state.isLogin = isLogin;
  },
  /**
   * @param { object } state
   * @param { string } code
   */
  [SET_CODE](state, code) {
    state.code = code;
  },

  /**
   * @param { object } state
   * @param { string } phone
   */
  [SET_PHONE](state, phone) {
    state.phoneNumber = phone;
  },

  /**
   * @param { object } state
   * @param { number } step
   */
  [SET_STEP](state, step) {
    state.step = step;
  },

  /**
   * @param { object } state
   * @param { string } token
   */
  [SET_TOKEN](state, token) {
    state.token = token;
  }
};

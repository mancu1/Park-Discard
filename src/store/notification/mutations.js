import { SET_MESSAGE, SET_ERROR, SET_NOTIFICATION } from "./mutation-types";

export default {
  /**
   * @param { object } state
   * @param { string } message
   */ [SET_MESSAGE](state, message) {
    state.text = message;
    state.color = "success";
    state.snackbarStatus = true;
  },
  /**
   * @param { object } state
   * @param { string } message
   */ [SET_ERROR](state, message) {
    state.text = message;
    state.color = "error";
    state.snackbarStatus = true;
  },
  /**
   * @param { object } state
   * @param { boolean } result
   */
  [SET_NOTIFICATION](state, result) {
    state.snackbarStatus = result;
  }
};

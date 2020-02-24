import {
  SET_EXIT,
  SET_ENJOY,
  SET_TIME,
  SET_QR_CONFIRM,
  SET_PAYMENT_STATUS
} from "./mutation-types";

export default {
  /**
   * @param { object } state
   * @param { boolean } confirm
   */
  [SET_QR_CONFIRM](state, confirm) {
    state.qrConfirm = confirm;
  },
  /**
   * @param { object } state
   * @param { boolean } bool
   */ [SET_EXIT](state, bool) {
    state.status = bool;
  },
  /**
   * @param { object } state
   * @param { boolean } bool
   */ [SET_ENJOY](state, bool) {
    state.status = bool;
  },
  /**
   * @param { object } state
   * @param { number } time
   */ [SET_TIME](state, time) {
    state.time = time;
  },
  /**
   * @param { object } state
   * @param { boolean } result
   */
  [SET_PAYMENT_STATUS](state, result) {
    state.payStatus = result;
  }
};

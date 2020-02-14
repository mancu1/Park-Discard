import {
  SET_CODE,
  SET_LOGIN,
  SET_PHONE,
  SET_STEP,
  SET_TOKEN
} from "./mutation-types";
import router from "../../router";
//import Axios from "axios";

/**
 * @param { function } commit
 * @param { bool } isLogin
 */
export function fetchLogin({ commit }) {
  //Axios.post("/")
  commit(SET_LOGIN, true);
  commit(SET_TOKEN, "123");
  router.push("/");
}

// eslint-disable-next-line no-unused-vars
export function getCode({ commit, state }) {
  ///todo: write auth methods
  //Axios.post("/getCode", state.phoneNumber ) {
  //}
  commit(SET_STEP, 1);
}

export function logout({ commit }) {
  commit(SET_LOGIN, false);
  commit(SET_PHONE, "");
  commit(SET_CODE, "");
  commit(SET_TOKEN, "");
  router.push("/login");
}
export function editSteps({ commit }, step) {
  commit(SET_STEP, step);
}

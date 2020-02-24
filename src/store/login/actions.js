import {
  SET_CODE,
  SET_LOGIN,
  SET_PHONE,
  SET_STEP,
  SET_TOKEN
} from "./mutation-types";
import router from "../../router";
import Axios from "axios";
//import qs from "querystring";

/**
 * @param { function(mutationName:string, params:*) } commit
 * @param { object } state
 * @param { string } phoneNumber
 * @param { string } code
 */
// eslint-disable-next-line no-unused-vars
export function fetchLogin({ commit, state }, { phoneNumber, code }) {
  let formData = new FormData();
  formData.append("phoneNumber", phoneNumber);
  formData.append("code", code);
  Axios.post("/login", formData)
    .then(res => {
      if (res.status === 200) {
        commit(SET_LOGIN, true);
        router.push("/");
      } else {
        commit(SET_CODE, "");
      }
    })
    .catch(() => {
      commit(SET_CODE, "");
      //console.error(err);
    });
}

/**
 * @param { function(mutationName:string, params:*) } commit
 * @param { string } phoneNumber
 */
export function getCode({ commit }, { phoneNumber }) {
  let formData = new FormData();
  formData.append("phoneNumber", phoneNumber);
  Axios.post("/smsAuth", formData);
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

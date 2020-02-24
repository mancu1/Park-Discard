import { SET_MESSAGE, SET_ERROR } from "./mutation-types";
/**
 * @param { function } commit
 * @param { string } text
 */
export function pushMessage({ commit }, { text }) {
  commit(SET_MESSAGE, text);
}
/**
 * @param { function } commit
 * @param { string } text
 */
export function pushError({ commit }, { text }) {
  commit(SET_ERROR, text);
}

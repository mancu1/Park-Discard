import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
const login = () =>
  import(/* webpackChunkName: "login" */ "../components/LoginScreen.vue");
const home = () =>
  import(/* webpackChunkName: "home" */ "../components/MainScanner.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: home,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) {
        next();
        return;
      }
      next("/login");
    }
  },
  {
    path: "/login",
    name: "Login",
    component: login
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;

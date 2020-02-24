<template>
  <v-app>
    <Header />
    <v-container>
      <v-content>
        <router-view />
      </v-content>
    </v-container>
    <v-snackbar :color="color" top v-model="snackbarStatus" multi-line>
      {{ text }}
      <v-btn color="blue" outlined text @click="snackbarStatus = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Header from "./components/Header/Header";
import { SET_NOTIFICATION } from "./store/notification/mutation-types";

export default {
  name: "App",
  components: {
    Header
  },
  computed: {
    text: {
      get() {
        return this.$store.state.notification.text;
      }
    },
    color: {
      get() {
        return this.$store.state.notification.color;
      }
    },
    snackbarStatus: {
      get() {
        return this.$store.state.notification.snackbarStatus;
      },
      set(val) {
        this.$store.commit(SET_NOTIFICATION, val);
      }
    }
  }
};
</script>

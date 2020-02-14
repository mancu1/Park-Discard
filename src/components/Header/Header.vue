<template>
  <v-app-bar app absolute>
    <v-col>
      <v-row v-if="isLogin">
        <v-icon>mdi-car</v-icon>
        <v-spacer />
        <v-btn @click="logout">
          <v-icon>mdi-logout</v-icon>
          <span>Выйти</span>
        </v-btn>
      </v-row>
      <v-row v-else>
        <v-icon>mdi-car</v-icon>
        <v-spacer />
      </v-row>
    </v-col>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  computed: {
    isLogin() {
      return this.$store.state.login.isLogin;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

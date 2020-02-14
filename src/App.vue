<template>
  <v-app>
    <Header />
    <v-container>
      <v-content>
        <router-view />
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import Header from "./components/Header/Header";

export default {
  name: "App",

  components: {
    Header
  },

  data: () => ({
    //
  })
};
</script>

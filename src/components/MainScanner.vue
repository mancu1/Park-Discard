<template>
  <v-col cols="12">
    <v-row>
      <span>
        {{ message }}
      </span>
    </v-row>
    <v-flex class="justify-center align-center">
      <qrcode-stream
        style="width: 80vw; height: 80vw"
        class="ma-auto"
        @decode="onDecode"
      />
    </v-flex>
  </v-col>
</template>

<script>
export default {
  name: "MainScanner",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    onDecode(decodedString) {
      this.message = decodedString;
      // ...
    }
  }
};
</script>

<style scoped></style>

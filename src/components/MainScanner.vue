<template>
  <v-container>
    <v-col v-if="!qrConfirm" cols="12">
      <v-flex class="justify-center align-center">
        <qrcode-stream
          style="width: 80vw; height: 80vw"
          class="ma-auto"
          @decode="onDecode"
        />
      </v-flex>
    </v-col>
    <v-dialog v-model="qrConfirm" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Сейчас Будет нужна камера для QR ридера предоставте достут пожалуйста
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="qrConfirm = false">
            ОК
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "MainScanner",
  computed: {
    phoneNumber: {
      get() {
        return this.$store.state.login.phoneNumber;
      }
    },
    message: {
      get() {
        return this.$store.state.parking.message;
      }
    },
    parkingStatus: {
      get() {
        return this.$store.state.parking.status;
      }
    },
    time: {
      get() {
        return this.$store.state.parking.time;
      }
    },
    qrConfirm: {
      get() {
        return this.$store.state.parking.qrConfirm;
      },
      set(confirmRes) {
        this.$store.dispatch("confirmQr", { confirmRes: confirmRes });
      }
    }
  },
  methods: {
    onDecode(decodedString) {
      if (decodedString == "1") {
        this.$store.dispatch("fetchEnjoy", { phoneNumber: this.phoneNumber });
      } else if (decodedString == "2") {
        this.$store.dispatch("fetchExit", { phoneNumber: this.phoneNumber });
      }
    }
  }
};
</script>

<style scoped></style>

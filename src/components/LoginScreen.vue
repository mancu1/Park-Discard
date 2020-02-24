<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/parking.svg')"
          class="my-3"
          contain
          height="150"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Park Discard
        </h1>
      </v-col>
    </v-row>
    <v-col
      class="ma-auto align-center justify-center"
      v-if="step === 0"
      cols="12"
    >
      <v-row class="ma-auto">
        <v-col cols="10" class="ma-auto">
          <v-text-field
            rounded
            label="Номер телефона"
            :rules="[validations.phoneNumber]"
            outlined
            v-model="phoneNumber"
            flat
          />
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-btn
          class="ma-auto"
          color="primary"
          rounded
          outlined
          :disabled="validations.phoneNumber(phoneNumber) != 1"
          @click="fetchCode(phoneNumber)"
        >
          <v-icon>
            mdi-send
          </v-icon>
          <span>Получить смс</span>
        </v-btn>
        <v-spacer />
      </v-row>
    </v-col>
    <v-col v-else cols="12">
      <v-row>
        <v-btn color="primary" rounded outlined @click="goBack">
          <v-icon>
            mdi-arrow-back
          </v-icon>
          <span>Назад</span>
        </v-btn>
      </v-row>
      <v-row class="ma-auto">
        <v-col cols="10" class="ma-auto">
          <v-text-field
            label="Код из смс"
            rounded
            outlined
            v-model="code"
            flat
          />
        </v-col>
      </v-row>
      <v-row class="ma-auto align-center justify-center">
        <v-btn
          class="ma-auto"
          color="primary"
          rounded
          outlined
          @click="fetchLogin(phoneNumber, code)"
        >
          <v-icon>
            mdi-send
          </v-icon>
          <span>Войти</span>
        </v-btn>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { SET_CODE, SET_PHONE } from "../store/login/mutation-types";

export default {
  name: "LoginScreen",
  data() {
    return {
      validations: {
        phoneNumber: val => {
          const phoneNumberRegEx = /^((\+7|7|8)+([0-9]){10})$/;
          return phoneNumberRegEx.test(val) || "Неправильный номер телефона";
        }
      }
    };
  },
  computed: {
    phoneNumber: {
      get() {
        return this.$store.state.login.phoneNumber;
      },
      set(phone) {
        this.$store.commit(SET_PHONE, phone);
      }
    },
    code: {
      get() {
        return this.$store.state.login.code;
      },
      set(code) {
        //console.log("set(code)", code, SET_CODE);
        if (code.length >= 4) {
          this.fetchLogin({
            phoneNumber: this.$store.state.login.phoneNumber,
            code
          });
        }
        this.$store.commit(SET_CODE, code);
      }
    },
    step: {
      get() {
        return this.$store.state.login.step;
      },
      set(step) {
        //console.log("set(step)", step);
        this.$store.dispatch("editSteps", step);
      }
    }
  },
  methods: {
    fetchCode(phoneNumber) {
      //console.log("fetchCode", phoneNumber);
      if (this.validations.phoneNumber(phoneNumber) == 1)
        this.$store.dispatch("getCode", { phoneNumber });
    },
    fetchLogin(phoneNumber, code) {
      //console.log("fetchLogin");
      this.$store.dispatch("fetchLogin", phoneNumber, code);
    },
    goBack() {
      //console.log("goBack");
      this.$store.dispatch("editSteps", 0);
    }
  }
};
</script>

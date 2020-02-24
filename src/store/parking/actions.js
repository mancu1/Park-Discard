import {
  SET_QR_CONFIRM,
  SET_ENJOY,
  SET_EXIT,
  SET_PAYMENT_STATUS,
  SET_TIME
} from "./mutation-types";
import Axios from "axios";

/**
 * @param { function } commit
 * @param { function } dispatch
 * @param { string } phoneNumber
 */
export function fetchEnjoy({ commit, dispatch }, { phoneNumber }) {
  let formData = new FormData();
  formData.append("phoneNumber", phoneNumber);
  formData.append("status", String(true));
  Axios.post("/parkingEntry", formData)
    .then(() => {
      dispatch("pushMessage", { text: "Въезд успешен" });
      commit(SET_ENJOY, true);
    })
    .catch(err => {
      dispatch("pushError", { text: err.response.data.message });
    });
}
/**
 * @param { function } commit
 * @param { function } dispatch
 * @param { string } phoneNumber
 */
export function fetchExit({ commit, dispatch }, { phoneNumber }) {
  let formData = new FormData();
  formData.append("phoneNumber", phoneNumber);
  formData.append("status", String(false));
  Axios.post("/parkingEntry", formData)
    .then(res => {
      dispatch("pushMessage", { text: "Выезд успешен" });
      commit(SET_EXIT, false);
      commit(SET_TIME, res.data.time);
      dispatch("paymentReq", { time: res.data.time });
    })
    .catch(err => {
      dispatch("pushError", { text: err.response.data.message });
    });
}

/**
 * @param { function } commit
 * @param { boolean } confirmRes
 */
export function confirmQr({ commit }, { confirmRes }) {
  commit(SET_QR_CONFIRM, confirmRes);
}

/**
 * @param { function } commit
 * @param { function } dispatch
 * @param { number } time
 */
export function paymentReq({ commit, dispatch }, { time }) {
  const applePayMethod = {
    supportedMethods: "https://apple.com/apple-pay",
    data: {
      version: 3,
      merchantIdentifier: "merchant.com.example",
      merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
      supportedNetworks: ["amex", "discover", "masterCard", "visa"],
      countryCode: "RU"
    }
  };
  const basicCard = {
    supportedMethods: "basic-card",
    data: {
      supportedNetworks: ["visa", "mastercard", "mir"],
      supportedTypes: ["credit", "debit"]
    }
  };

  const googlePaym = {
    supportedMethods: "https://google.com/pay",
    data: {
      environment: "TEST",
      apiVersion: 1,
      allowedPaymentMethods: ["CARD", "TOKENIZED_CARD"],
      paymentMethodTokenizationParameters: {
        tokenizationType: "PAYMENT_GATEWAY",
        // Check with your payment gateway on the parameters to pass.
        parameters: {
          gateway: "example",
          gatewayMerchantId: "exampleGatewayMerchantId"
        }
      },
      cardRequirements: {
        allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
        billingAddressRequired: true,
        billingAddressFormat: "MIN"
      },
      phoneNumberRequired: true,
      emailRequired: true,
      shippingAddressRequired: true
    }
  };

  const methodData = [basicCard, googlePaym, applePayMethod];

  const details = {
    total: {
      label: "Итог",
      amount: { currency: "RUB", value: `${time}.00` }
    },
    displayItems: [
      {
        label: "Оплата парковки",
        amount: { currency: "RUB", value: `${time}.00` }
      }
    ]
  };

  const request = new PaymentRequest(methodData, details);

  request
    .show()
    .then(result => {
      commit(SET_PAYMENT_STATUS, true);
      dispatch("pushMessage", { text: "Успешная оплата" });
      result.complete("success");
    })
    .catch(err => {
      commit(SET_PAYMENT_STATUS, false);
      dispatch("pushError", { text: err.message });
    });
}

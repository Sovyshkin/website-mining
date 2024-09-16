<script>
import LoadingSpinner from "./LoadingSpinner.vue";
import axios from "axios";

export default {
  name: "AppPayment",
  components: { LoadingSpinner },
  data() {
    return {
      card: {},
      isLoading: false,
    };
  },
  methods: {
    async load_info() {
      try {
        this.isLoading = true;
        let response = await axios.get(
          `/billings/get?id=${this.$route.query.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        this.card = response.data.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    printType(type) {
      if (type == "hosting") {
        return "Плата за хостинг";
      } else if (type == "buy_request") {
        return "Покупка";
      }
      return "";
    },

    printStatus(state) {
      if (this.$i18n.locale == "RU") {
        if (state == "waiting") {
          return "В ожидании";
        } else if (state == "invoiced") {
          return "Запрос";
        } else if (state == "confirmation") {
          return "На подтверждении";
        } else if (state == "completed") {
          return "Оплачен";
        } else if (state == "canceled") {
          return "Отменен";
        }
      } else if (this.$i18n.locale == "EN") {
        if (state == "waiting") {
          return "Waiting";
        } else if (state == "invoiced") {
          return "Invoiced";
        } else if (state == "confirmation") {
          return "Confirmation";
        } else if (state == "completed") {
          return "Completed";
        } else if (state == "canceled") {
          return "Canceled";
        }
      } else if (this.$i18n.locale == "HE") {
        if (state == "waiting") {
          return "מחכה";
        } else if (state == "invoiced") {
          return "בקשה";
        } else if (state == "confirmation") {
          return "על אישור";
        } else if (state == "completed") {
          return "שולם";
        } else if (state == "canceled") {
          return "בוטל";
        }
      }
    },
  },
  mounted() {
    document.body.style.overflow = "auto";
    this.load_info();
  },
};
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="wrapper" v-else>
    <h2>{{ printType(type) }}</h2>
    <div class="group-payment">
      <span class="date">{{ $t("date") }}:</span>
      <span class="date">{{ card.date }}</span>
      <span class="time">{{ card.time }}</span>
    </div>
    <div class="group-payment">
      <span class="type">{{ $t("type") }}:</span>
      <span class="type">{{ printType(card.type) }}</span>
    </div>
    <div class="group-payment">
      <span class="sum_payment">{{ $t("amountPayment") }}:</span>
      <div class="payment-btc">{{ card.value }} {{ card.currency }}</div>
      <div class="payment-hashrate">{{ card.hash_rate }}</div>
    </div>
    <div class="group-payment">
      <span class="status">{{ $t("status") }}:</span>
      <div class="group-status">
        <div
          class="wait"
          :class="{
            online: card.state == 'completed',
            offline: card.state == 'canceled',
          }"
        ></div>
        <span class="status">{{ printStatus(card.state) }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card {
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 30px;
  cursor: auto;
}

.card:hover {
  transform: none;
  box-shadow: none;
}

.btn {
  width: 100%;
  border-radius: 10px;
  padding: 12px 17px;
  color: #fff;
  background-color: #cf0032;
}

.not_found {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 40%;
}

.not_found span {
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #272727;
}

.mypayments {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mypayment-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
}

.payment {
  background-color: #fff;
  border-radius: 20px;
  padding: 24px 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.group-payment {
  display: flex;
  align-items: center;
  gap: 15px;
}

.time,
.payment-hashrate {
  opacity: 40%;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #272727;
}

.group-status {
  display: flex;
  align-items: center;
  gap: 5px;
}

.wait {
  width: 8px;
  height: 8px;
  border-radius: 13px;
  background-color: yellow;
}

.online {
  background-color: #45ed0b;
}

.offline {
  background-color: #cf0032;
}

@media (max-width: 910px) {
  .profit {
    flex-direction: column;
  }

  .day,
  .month,
  .year {
    width: 100%;
  }
}

@media (max-width: 520px) {
  .time,
  .payment-hashrate,
  .payment-btc,
  .date,
  .mypayment-header span,
  .status,
  .type {
    font-size: 10px;
    line-height: 10px;
  }

  .payment,
  .mypayment-header {
    padding: 10px;
    border-radius: 10px;
  }
}

@media (max-width: 400px) {
  .card {
    padding: 15px;
  }
}
</style>

<script>
import axios from "axios";
import BlockCalculator from "./BlockCalculator.vue";
import BannerMain from "./BannerMain.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import BlockMiniMarket from "./BlockMiniMarket.vue";
export default {
  name: "AppMain",
  components: {
    BlockCalculator,
    BannerMain,
    LoadingSpinner,
    BlockMiniMarket,
  },
  data() {
    return {
      total_earn_value: 0,
      total_earn_value_usd: 0,
      expected_income: 0,
      expected_income_btc: 0,
      payments: [],
      paymentsSorted: [],
      isLoading: false,
    };
  },
  methods: {
    async load_info() {
      try {
        this.isLoading = true;
        let response = await axios.get(`/miners/information`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        this.total_earn_value = response.data.total_earn_value;
        this.total_earn_value_usd = response.data.total_earn_value_usd;
        this.expected_income = response.data.expected_income;
        this.expected_income_btc = response.data.expected_income_btc;

        let resPayments = await axios.get(`/miners/payments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.payments = resPayments.data.data;
        if (this.payments) {
          this.paymentsSorted = this.payments.filter(
            (item) => item.type == "reward" || item.type == "payout"
          );
        }
        // reward и payout
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    roundTwo(n) {
      if (n) {
        return Math.round(n * 100) / 100;
      }
    },

    roundSix(s) {
      s = String(s);
      if (s) {
        return s.slice(0, 8);
      }
    },

    roundFour(s) {
      s = String(s);
      if (s) {
        return s.slice(0, 6);
      }
    },

    printType(type) {
      if (type == "hosting") {
        return "Плата за хостинг";
      } else if (type == "reward") {
        return "Награда за майнинг";
      } else if (type == "payout") {
        return "Вывод средств";
      }
      return "";
    },
  },
  mounted() {
    this.load_info();
  },
};
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="wrapper" v-else>
    <BannerMain />
    <h2>Общая сумма заработанных активов</h2>
    <div class="total bx">
      <img src="../assets/btc.svg" alt="" />
      <span class="usd">{{ total_earn_value_usd }} $</span>
      <span class="btc">(~{{ roundFour(total_earn_value) }} BTC)</span>
    </div>
    <div class="profit">
      <div class="day bx">
        <span class="title">Ежедневный доход:</span>
        <div class="group">
          <span class="usd">{{ expected_income }} $</span>
          <div class="btc">(~{{ roundSix(expected_income_btc) }} BTC)</div>
        </div>
      </div>
      <div class="month bx">
        <div class="title">Ежемесячный доход:</div>
        <div class="group">
          <span class="usd">{{ roundTwo(expected_income * 31) }} $</span>
          <span class="btc"
            >(~{{ roundFour(expected_income_btc * 31) }} BTC)</span
          >
        </div>
      </div>
      <div class="year bx">
        <div class="title">Ежегодный доход:</div>
        <div class="group">
          <span class="usd">{{ roundTwo(expected_income * 365) }} $</span>
          <span class="btc"
            >(~{{ roundFour(expected_income_btc * 365) }} BTC)</span
          >
        </div>
      </div>
    </div>
    <BlockCalculator :white="true" />
    <BlockMiniMarket />
    <h2>Мои платежи</h2>
    <div class="mypayments">
      <div class="mypayment-header">
        <span class="date">Дата</span>
        <span class="type">Тип</span>
        <span class="sum_payment">Сумма платежа</span>
        <span class="status">Статус</span>
      </div>
      <div class="payment" v-for="card in paymentsSorted" :key="card.id">
        <div class="group-payment">
          <span class="date">{{ card.date }}</span>
          <span class="time">{{ card.time }}</span>
        </div>
        <span class="type">{{ printType(card.type) }}</span>
        <div class="group-payment">
          <div class="payment-btc">{{ card.value }} {{ card.currency }}</div>
          <div class="payment-hashrate" v-if="card.hash_rate">
            {{ card.hash_rate }} Th/s
          </div>
        </div>
        <div class="group-status">
          <div class="online"></div>
          <span class="status">Completed</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.total {
  width: 100%;
  padding: 25px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  background-color: #fff;
}

.usd {
  font-weight: 600;
  color: #272727;
  font-size: 20px;
  line-height: 20px;
}

.btc {
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  opacity: 50%;
  color: #272727;
}

.title {
  opacity: 50%;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #272727;
}

.profit {
  display: flex;
  align-items: stretch;
  gap: 10px;
}

.day,
.month,
.year {
  width: 33%;
  background-color: #fff;
  border-radius: 20px;
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.online,
.offline {
  width: 8px;
  height: 8px;
  border-radius: 13px;
}

.online {
  background-color: #45ed0b;
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

.mypayment-header span,
.date,
.payment-btc,
.status {
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: #272727;
}

.payment {
  background-color: #fff;
  border-radius: 20px;
  padding: 24px 30px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: all 500ms ease;
}

.payment:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 10px 0 #00000037;
}

.group-payment {
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.group-payment,
.type,
.group-status,
.date,
.status,
.sum_payment {
  flex: 22%;
}

@media (max-width: 1200px) {
  .usd,
  .btc {
    font-size: 16px;
  }
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

@media (max-width: 420px) {
  .total {
    padding: 20px;
    gap: 7px;
  }
}
</style>

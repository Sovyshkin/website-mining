<script>
import axios from "axios";
import ChartLine from "./ChartLine.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  name: "AppAccruals",
  components: { ChartLine, LoadingSpinner },
  data() {
    return {
      cards: [],
      value_usd: 0,
      btc: 0,
      history: [],
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#00CF91",
            borderColor: "#00CF91",
            pointRadius: 2,
            data: [],
          },
        ],
      },
      history_show: false,
      isLoading: false,
    };
  },
  methods: {
    async load_info() {
      try {
        this.isLoading = true;
        let resBalance = await axios.get(`/miners/balance`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(resBalance);
        this.value_usd = resBalance.data.value_usd || 0;
        this.btc = resBalance.data.value || 0;
        this.history = resBalance.data.history_usd;
        if (this.history) {
          this.chartData.labels = Object.keys(this.history);
          this.chartData.labels.reverse();
          this.chartData.datasets[0].data = Object.values(this.history);
          this.chartData.datasets[0].data.reverse();
          this.history_show = true;
        }
        let resPayments = await axios.get(`/miners/payments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(resPayments);
        let cards = resPayments.data.data;
        if (cards) {
          this.cards = cards.filter((item) => item.type != "reward");
        }
        // ВСЁ КРОМЕ reward
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
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
  async mounted() {
    document.body.style.overflow = "auto";
    await this.load_info();
  },
};
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="wrapper" v-else>
    <h2>Начисления и списания</h2>
    <div class="balance bx">
      <div class="info">
        <span class="name">Баланс</span>
        <div class="group">
          <span class="usd">{{ value_usd }} $</span>
          <span class="btc">(~{{ btc }} BTC)</span>
        </div>
      </div>
      <div class="wrap_btns">
        <button class="btn">Пополнить</button>
        <button class="btn withdraw">Вывести</button>
      </div>
    </div>
    <ChartLine v-if="history_show" :chartData="chartData" :name="'Баланс'" />
    <h2>История операций</h2>
    <div class="cards" v-if="this.cards.length > 0">
      <div class="card bx" v-for="card in cards" :key="card.id">
        <div class="info">
          <span class="card-name">{{ printType(card.type) }}</span>
          <span class="date">{{ card.date }}</span>
        </div>
        <div class="summ_info">
          <!-- <span class="summ plus" v-if="card.name == 'Пополнение'"
            >+{{ card.summ }}$</span>
          >
          <span class="summ minus" v-if="card.name != 'Пополнение'"
            >-{{ card.summ }}$</span
          >
          <img src="" alt="" /> -->
          <span class="summ">{{ card.value }} {{ card.currency }}</span>
        </div>
      </div>
    </div>
    <div class="not_found" v-else>
      <span>Ничего</span>
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
  margin-bottom: 100px;
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
  transition: all 500ms ease;
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

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-name {
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #272727;
}

.date {
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #272727;
  opacity: 40%;
}

.summ_info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.summ {
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
}

.minus {
  color: #ff104a;
}

.plus {
  color: #3ccc0a;
}

.balance {
  width: 100%;
  padding: 25px 30px;
  display: flex;
  gap: 20px;
  border-radius: 20px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
}

.name {
  font-weight: 500;
  opacity: 50%;
  font-size: 16px;
  line-height: 16px;
  color: #272727;
}

.group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.usd {
  font-weight: 600;
  color: #272727;
  font-size: 24px;
  line-height: 24px;
}
.btc {
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: #272727;
  opacity: 50%;
}

.wrap_btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  background-color: #cf0032;
  border: none;
  border-radius: 10px;
  padding: 17px 32px;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
}

.withdraw {
  color: #cf0032;
  border: 1px solid #cf0032;
  background-color: transparent;
}

.card:hover {
  transform: translateY(-3px);
}

@media (max-width: 940px) {
  .balance {
    flex-direction: column;
    align-items: start;
  }

  .wrap_btns {
    width: 100%;
  }

  .wrap_btns button {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .wrap_btns {
    flex-direction: column;
  }

  .wrap_btns button {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .card {
    padding: 15px;
  }
}
</style>

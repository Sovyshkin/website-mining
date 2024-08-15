<script>
import axios from "axios";

export default {
  name: "MyPayments",
  components: {},
  data() {
    return {
      payments: [],
    };
  },
  methods: {
    async load_info() {
      let response = await axios.get(`/miners/payments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      this.payments = response.data.data;
      console.log(response);
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

    checkSum(sum) {
      if (sum) {
        sum = Number(sum);
        if (sum > 0) {
          return true;
        }
        return false;
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
  <div class="wrapper">
    <h2>Мои платежи</h2>
    <div class="cards" v-if="this.payments.length > 0">
      <div class="card" v-for="card in payments" :key="card.id">
        <div class="info">
          <span class="name">{{ printType(card.type) }}</span>
          <span class="date">{{ card.date }}</span>
        </div>
        <div class="summ_info">
          <span class="summ plus" v-if="checkSum(card.value_usd)"
            >+{{ card.value_usd }}$</span
          >
          <span class="summ minus" v-if="!checkSum(card.value_usd)"
            >-{{ card.value_usd }}$</span
          >
          <img src="" alt="" />
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

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.name {
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

@media (max-width: 400px) {
  .card {
    padding: 15px;
  }
}
</style>

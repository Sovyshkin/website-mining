<script>
import axios from "axios";

export default {
  name: "AppMarket",
  components: {},
  data() {
    return {
      cards: [],
    };
  },
  methods: {
    goTry() {
      this.$emit("updateGoTry", true);
    },

    async load_info() {
      try {
        let response = await axios.get(`/market/miners`);
        this.cards = response.data;
      } catch (err) {
        console.log(err);
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
    <h2>Маркет</h2>
    <div class="cards">
      <div class="card" v-for="card in cards" :key="card.id">
        <img class="asic" src="../assets/asic.png" alt="" />
        <div class="scale"></div>
        <div class="time_profit">Время окупаемости:</div>
        <div class="info">
          <span class="price">${{ card.buy_cost / 100 }}</span>
          <span class="name">{{ card.name }}</span>
          <div class="group">
            <span class="group-name">Хешрейт:</span>
            <span class="group-value">{{ card.hashrate }}</span>
          </div>
          <div class="group">
            <span class="group-name">Доход:</span>
            <span class="group-value">${{ card.dohod }}/месяц</span>
          </div>
          <div class="group">
            <span class="group-name">Расход:</span>
            <span class="group-value">{{ card.rashod }} Вт</span>
          </div>
        </div>
        <button @click="goTry" class="btn">Заказать</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin-top: 40px;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.cards {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  min-height: 474px;
  flex: 48%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.card:hover {
  transform: scale(1.03);
}

.main-card {
  padding: 40px 20px 20px 20px;
  position: relative;
  background: transparent;
  z-index: 2;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("../assets/card.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  border-radius: 20px;
}

.time_profit {
  font-size: 12px;
  line-height: 12px;
  font-weight: 500;
  color: #a9a9a9;
}
.title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #fff;
}

.price {
  font-weight: 700;
  font-size: 22px;
  line-height: 22px;
}

.btn {
  width: 100%;
  border-radius: 10px;
  padding: 12px 17px;
  color: #fff;
  background-color: #cf0032;
}

.group {
  display: flex;
  align-items: center;
  gap: 5px;
}

.group-name {
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #0f0f0f;
  opacity: 40%;
}

.group-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #272727;
}

.asic {
  width: 75%;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.scale {
  height: 6px;
  width: 70%;
  background: linear-gradient(to right, #e11111 0%, #ecf02b 50%, #2ee111 100%);
}

@media (max-width: 1060px) {
  .cards {
    flex-wrap: wrap;
  }
}

@media (max-width: 812px) {
  .cards {
    justify-content: center;
  }

  .card {
    flex: 50%;
    width: auto;
    max-width: 45%;
  }
}

@media (max-width: 560px) {
  .card {
    flex: 100%;
    max-width: 80%;
  }
}

@media (max-width: 430px) {
  .card {
    max-width: 100%;
  }
}
</style>

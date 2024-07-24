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

    minus() {
      if (this.card.count > 1) {
        this.card.count -= 1;
      }
    },

    plus() {
      this.card.count++;
    },

    async load_info() {
      try {
        let response = await axios.get(`/workers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
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
    <h2>Мои майнеры</h2>
    <div class="cards" v-if="this.cards.length > 0">
      <div class="card" v-for="card in cards" :key="card.id">
        <img class="asic" src="../assets/asic.png" alt="" />
        <div class="info">
          <div class="title">
            <span class="name">{{ card.name }}</span>
            <div class="status" v-if="card.online">
              <div class="online"></div>
              Online
            </div>
            <div class="status" v-if="!card.online">
              <div class="offline"></div>
              Offline
            </div>
          </div>
          <div class="group">
            <span class="group-name">Хостинг:</span>
            <span class="group-value">${{ card.hosting }} / месяц</span>
            <span class="group-name">Доход:</span>
            <span class="group-value">${{ card.profit }} / месяц</span>
            <span class="group-name">Расход:</span>
            <span class="group-value">{{ card.power }} Вт / месяц</span>
            <span class="group-name">Прибыль:</span>
            <span class="group-value">${{ card.power }} / месяц</span>
          </div>
        </div>
        <!-- <button @click="goTry" class="btn">Оформить заказ</button> -->
      </div>
    </div>
    <div class="not_found" v-else>
      <img src="../assets/myminers.svg" alt="" />
      <span>У вас нет активных майнеров</span>
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

.itog {
  padding: 30px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background-color: #fff;
}

.card {
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 20px;
  cursor: auto;
}

.asic {
  width: 90px;
}

.card:hover {
  transform: none;
  box-shadow: none;
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
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #272727;
}

.price {
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: #0f0f0f;
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
  gap: 10px;
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

.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.scale {
  height: 6px;
  width: 70%;
  background: linear-gradient(to right, #e11111 0%, #ecf02b 50%, #2ee111 100%);
}

.result {
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  color: #272727;
}

.name {
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #272727;
}

.not_found {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 40%;
}

.not_found img {
  height: 42px;
  width: 42px;
}

.not_found span {
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #272727;
}

.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #272727;
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

.offline {
  background-color: #ff104a;
}

@media (max-width: 1100px) {
  .group {
    flex-wrap: wrap;
  }
}

@media (max-width: 800px) {
  .group {
    flex-direction: column;
    align-items: start;
  }
}

@media (max-width: 520px) {
  .name {
    font-size: 18px;
  }

  .info {
    gap: 10px;
  }

  .card {
    padding: 10px;
    gap: 10px;
    flex-direction: column;
  }
}

@media (max-width: 420px) {
  .wrapper {
    padding: 20px;
  }
}
</style>

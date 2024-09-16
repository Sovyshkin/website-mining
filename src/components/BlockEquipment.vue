<script>
import axios from "axios";
export default {
  name: "BlockEquipment",
  components: {},
  data() {
    return {
      cards: [],
      token: "",
    };
  },
  methods: {
    goTry(id) {
      if (this.token) {
        this.$router.push({ name: "product", query: { id: id } });
      } else {
        this.$emit("updateGoTry", true);
      }
    },

    goMarket() {
      if (this.token) {
        this.$router.push({ name: "marketplace" });
      } else {
        this.$emit("updateGoTry", true);
      }
    },

    async load_info() {
      try {
        let response = await axios.get(`/miners/get/all`);
        console.log(response);
        this.cards = response.data.miners_items;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.load_info();
    this.token = localStorage.getItem("token");
  },
};
</script>
<template>
  <div class="wrapper">
    <h2>{{ $t("equipment") }}</h2>
    <div class="cards">
      <div class="main-card card">
        <div class="background"></div>
        <div class="title">{{ $t("testPeriod") }}</div>
        <img class="asic" src="../assets/asic.png" alt="" />
        <button @click="goMarket" class="btn">{{ $t("try") }}</button>
      </div>
      <div
        class="card"
        v-for="card in cards"
        :key="card.id"
        @click="goTry(card.id)"
      >
        <img class="asic" v-if="card.image" :src="card.image.url" alt="" />
        <div class="wrap-scale">
          <div
            class="scale"
            :style="'width: ' + (100 - card.payback_percent) + '%'"
          ></div>
        </div>
        <div class="time_profit">
          {{ $t("timeProfit") }}: {{ card.payback }} {{ $t("months") }}
        </div>
        <div class="info">
          <span class="price">${{ card.price }}</span>
          <span class="name">{{ card.name }}</span>
          <div class="group">
            <span class="group-name">{{ $t("hash") }}:</span>
            <span class="group-value">{{ card.hash_rate_str }}</span>
          </div>
          <div class="group">
            <span class="group-name">{{ $t("dohod") }}:</span>
            <span class="group-value"
              >${{ card.income }}/{{ $t("monthOne") }}</span
            >
          </div>
          <div class="group">
            <span class="group-name">{{ $t("rashod") }}:</span>
            <span class="group-value"
              >{{ card.energy_consumption }} {{ $t("wt") }}</span
            >
          </div>
        </div>
        <button @click="goTry(card.id)" class="btn">{{ $t("order") }}</button>
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
}
.cards {
  width: 100%;
  display: flex;
  align-items: stretch;
  gap: 20px;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px 15px;
  scrollbar-width: none; /* Убирает полосу прокрутки */
  -ms-overflow-style: none; /* Для Internet Explorer */
}

.card {
  max-height: 500px;
  flex: 20%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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
  height: 200px;
  width: auto;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wrap-scale {
  position: relative;
  width: 70%;
  border-radius: 10px;
  height: 6px;
  background: linear-gradient(to right, #e11111 0%, #ecf02b 50%, #2ee111 100%);
  overflow: hidden;
}

.scale {
  position: absolute;
  right: 0;
  height: 6px;
  background-color: #a9a9a9;
}

@media (max-width: 1060px) {
  .cards {
    flex-wrap: wrap;
  }

  .card {
    width: 33%;
    max-width: 33%;
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

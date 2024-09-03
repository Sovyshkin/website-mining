<script>
import axios from "axios";

export default {
  name: "AppMarket",
  components: {},
  data() {
    return {
      cards: [],
      cart: false,
    };
  },
  methods: {
    async goTry(id) {
      try {
        this.$emit("updateGoTry", true);
        let response = await axios.get(
          `/market/cart/set?miner_item_id=${id}&count=1`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.status == "ok") {
          this.cart = true;
          setTimeout(() => {
            this.cart = false;
          }, 3000);
        }
      } catch (err) {
        console.log(err);
        this.cart = "Ошибка";
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

    open(id) {
      this.$router.push({ name: "product", query: { id: id } });
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
    <div class="cards">
      <div
        class="card"
        v-for="card in cards"
        :key="card.id"
        @click="open(card.id)"
      >
        <img class="asic" v-if="card.image" :src="card.image.url" alt="" />
        <div class="scale"></div>
        <div class="time_profit">Время окупаемости: {{ card.payback }}</div>
        <div class="info">
          <span class="price">${{ card.price }}</span>
          <span class="name">{{ card.name }}</span>
          <div class="group">
            <span class="group-name">Хешрейт:</span>
            <span class="group-value">{{ card.hash_rate_str }}</span>
          </div>
          <div class="group">
            <span class="group-name">Доход:</span>
            <span class="group-value">${{ card.income }}/месяц</span>
          </div>
          <div class="group">
            <span class="group-name">Расход:</span>
            <span class="group-value">{{ card.energy_consumption }} Вт</span>
          </div>
        </div>
        <button @click="goTry(card.id)" class="btn">Заказать</button>
      </div>
    </div>
  </div>
  <div
    v-if="cart && cart != 'Ошибка'"
    @click="this.$router.push({ name: 'cart' })"
    class="cart"
  >
    Добавлено в корзину
  </div>
  <div v-if="cart == 'Ошибка'" class="cart cart_error">Ошибка</div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 0px;
}
.cards {
  padding: 20px 0;
  display: flex;
  align-items: stretch;
  gap: 20px;
  overflow-y: hidden;
  overflow-x: scroll;
}

.card {
  min-height: 474px;
  flex: 20%;
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

.cart {
  width: fit-content;
  position: fixed;
  bottom: 5%;
  left: 45%;
  background-color: #2ee111;
  color: #fff;
  font-size: 16px;
  padding: 17px 24px;
  border-radius: 10px;
  font-weight: 600;
  z-index: 5;
  cursor: pointer;
}

.cart_error {
  background-color: #cf0032;
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

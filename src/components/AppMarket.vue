<script>
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  name: "AppMarket",
  components: { LoadingSpinner },
  data() {
    return {
      cards: [],
      cart: false,
      isLoading: false,
      categories: [],
      category_id: 1,
    };
  },
  methods: {
    async goTry(id) {
      try {
        if (!localStorage.getItem("token")) {
          this.$emit("updateGoTry", true);
        } else {
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
        }
      } catch (err) {
        console.log(err);
        this.cart = "Ошибка";
      }
    },
    async load_categories() {
      try {
        this.isLoading = true;
        let resCategories = await axios.get(`/miners/categories/get/all`);
        console.log(resCategories);
        this.categories = resCategories.data.miners_items_categories;
        this.category_id = this.categories[0].id;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    async load_info() {
      try {
        this.isLoading = true;
        let response = await axios.get(
          `/miners/get/all?category_id=${this.category_id}`
        );
        console.log(response);
        this.cards = response.data.miners_items;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    open(id) {
      this.$router.push({ name: "product", query: { id: id } });
    },

    async categoryClick(id) {
      this.category_id = id;
      this.load_info();
    },
  },
  mounted() {
    document.body.style.overflow = "auto";
    this.load_categories();
    this.load_info();
  },
};
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="wrapper" v-else>
    <h2>{{ $t("market") }}</h2>
    <div class="wrap-categories">
      <div
        class="category"
        :class="{ category_active: category.id == category_id }"
        v-for="category in categories"
        :key="category.id"
        @click="categoryClick(category.id)"
      >
        {{ category.name }}
      </div>
    </div>
    <div class="cards">
      <div
        class="card"
        v-for="card in cards"
        :key="card.id"
        @click="open(card.id)"
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
        <button @click.stop.prevent="goTry(card.id)" class="btn">
          {{ $t("order") }}
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="cart && cart != 'Ошибка'"
    @click="this.$router.push({ name: 'cart' })"
    class="cart"
  >
    {{ $t("addedCart") }}
  </div>
  <div v-if="cart == 'Ошибка'" class="cart cart_error">{{ $t("error") }}</div>
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
  flex: 30%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  max-width: 377px;
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

.wrap-categories {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.category {
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  background-color: #fff;
  color: #cf0032;
  text-align: center;
  padding: 12px 17px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 0 10px 0 #00000037;
  transition: all 500ms ease;
}

.category:hover {
  transform: translateY(-3px);
}

.category_active {
  background-color: #cf0032;
  color: #fff;
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

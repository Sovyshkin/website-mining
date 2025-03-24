<script>
import axios from "axios";

export default {
  name: "BlockBusiness",
  components: {},
  data() {
    return {
      cards: [
        {
          type: this.$t('beginer'),
          price: "23 300.00",
          name: "ANTMINER S19K PRO 120TH",
          hash_rate_str: "120",
          profit: "460",
          energy_consumption: 2760,
          time_profit: "5 месяцев",
          hosting: '$0.06',
          img: "asic",
          count: '26',
          color: 'red',
        },
        {
          type: this.$t('advanced'),
          price: "43 300.00",
          name: "ANTMINER S19K PRO 120TH",
          hash_rate_str: "120",
          profit: "460",
          energy_consumption: 2760,
          time_profit: "5 месяцев",
          hosting: '$0.06',
          img: "asic",
          count: '26',
          color: 'grey',
        },
        {
          type: this.$t('investor'),
          price: "93 300.00",
          name: "ANTMINER S19K PRO 120TH",
          hash_rate_str: "120 TH/s",
          profit: "460",
          energy_consumption: 2760,
          time_profit: "5 месяцев",
          hosting: '$0.06',
          img: "asic",
          count: '26',
          color: 'orange',
        },
      ],
    };
  },
  methods: {
    async load_info() {
      try {
        let response = await axios.get(`/miners/get/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("BUSINESS", response);
        this.cards = response.data.miners_items.slice(0, 3);
        this.cards[0].color = 'red';
        this.cards[1].color = 'grey'
        this.cards[2].color = 'orange'
      } catch (err) {
        console.log(err);
      }
    },
    goMarket() {
      let token = localStorage.getItem("token");
      if (token) {
        this.$router.push("marketplace");
      } else {
        this.$emit("updateLogin", true);
      }
    },
  },
  mounted() {
    // this.load_info();
  },
};
</script>
<template>
  <div class="wrapper">
    <h2>{{ $t("readyBusiness") }}</h2>
    <div class="cards">
      <div
        class="card"
        :class="{ red: card.color == 'red', grey: card.color == 'grey', orange: card.color == 'orange' }"
        v-for="card in cards"
        :key="card"
        @click="this.$emit('updateFormFeedback', true)"
      >
        <div class="info">
            <div class="title">{{ card.type }}</div>
            <div class="main-info">
              <div class="group">
                <span class="group-name">{{ $t("hash") }}:</span>
                <span class="group-value">{{ card.hash_rate_str }}</span>
              </div>
              <div class="group">
                <span class="group-name">{{ $t("dohod") }}:</span>
                <span class="group-value"
                  >${{ card.income }}/{{ $t("dayOne") }}</span
                >
              </div>
              <div class="group">
                <span class="group-name">{{ $t("rashod") }}:</span>
                <span class="group-value"
                  >{{ card.energy_consumption }} {{ $t("wt") }}</span
                >
              </div>
              <div class="group">
              <span class="group-name">{{ $t("hosting") }}:</span>
              <span class="group-value"
                >{{ card.hosting }}</span
              >
            </div>
            <div class="group">
              <span class="group-name">{{ $t("model_name") }}:</span>
              <span class="group-value"
                >{{ card.name }}</span
              >
            </div>
            <div class="group">
              <span class="group-name">{{ $t("count") }}:</span>
              <span class="group-value"
                >{{ card.count }}</span
              >
            </div>
          </div>
        </div>
        <div class="order">
          <div class="price">${{ card.price }}</div>
          <button class="btn">
            {{ $t("order") }}
          </button>
        </div>
        <img class="asic" src="../assets/asic_business.png" alt="" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  width: 100%;
  margin-top: 40px;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  width: 100%;
  position: relative;
  padding: 40px;
  border-radius: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  overflow: hidden;
  max-height: 376px;
}

.card:hover {
  transform: scale(1.02);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-info {
  width: 100%;
  max-width: 618px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.order {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  font-size: 24px;
  line-height: 100%;
  font-weight: 800;
  text-transform: uppercase;
  color: #fff;
}

.main .title {
  color: #fff;
}

.red {
  background-image: url("../assets/red_bg.svg");
}

.grey {
  background-image: url('../assets/grey_bg.svg');
}

.orange {
  background-image: url('../assets/orange_bg.svg');
}

.main .group-value {
  color: #fff;
}

.group {
  display: flex;
  align-items: center;
  gap: 5px;
}

.group-name {
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: #fff;
  opacity: 60%;
}

.main .group-name {
  color: #fff;
  opacity: 60%;
}

.group-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: #fff;
}

.btn {
  width: 240px;
  border-radius: 10px;
  padding: 12px 17px;
  color: #fff;
  background-color: #cf0032;
}

.price {
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
  color: #fff;
}

.main .price {
  color: #fff;
}
.asic {
  width: 50%;
  position: absolute;
  right: -18%;
  bottom: -80px;
}

@media (max-width: 500px) {
  .card {
    padding: 20px;
  }

  .main_info {
    gap: 10px;
  }

  .title {
    font-size: 28px;
    line-height: 28px;
  }

  .price {
    font-size: 26px;
    line-height: 26px;
  }
}
</style>

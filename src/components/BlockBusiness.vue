<script>
export default {
  name: "BlockBusiness",
  components: {},
  data() {
    return {
      cards: [
        {
          price: "6300.00",
          name: "ANTMINER S19K PRO 120TH",
          hashrate: "120",
          profit: "460",
          power: 2760,
          time_profit: "5 месяцев",
          img: "asic",
          main: true,
        },
        {
          price: "12 600.00",
          name: "ANTMINER S19K PRO 120TH",
          hashrate: "120",
          profit: "460",
          power: 2760,
          time_profit: "5 месяцев",
          img: "asic",
          main: false,
        },
        {
          price: "32 250.00",
          name: "ANTMINER S19K PRO 120TH",
          hashrate: "120",
          profit: "460",
          power: 2760,
          time_profit: "5 месяцев",
          img: "asic",
          main: false,
        },
      ],
    };
  },
};
</script>
<template>
  <div class="wrapper">
    <h2>{{ $t("readyBusiness") }}</h2>
    <div class="cards">
      <div
        class="card"
        :class="{ main: card.main }"
        v-for="card in cards"
        :key="card"
      >
        <div class="info">
          <div class="main_info">
            <div class="title">{{ card.name }}</div>
            <div class="group">
              <span class="group-name">{{ $t("hash") }}:</span>
              <span class="group-value">{{ card.hashrate }} TH/s</span>
            </div>
            <div class="group">
              <span class="group-name">{{ $t("dohod") }}:</span>
              <span class="group-value"
                >${{ card.profit }}/{{ $t("monthOne") }}</span
              >
            </div>
            <div class="group">
              <span class="group-name">{{ $t("rashod") }}:</span>
              <span class="group-value">{{ card.power }} {{ $t("wt") }}</span>
            </div>
          </div>
          <div class="order">
            <div class="price">${{ card.price }}</div>
            <button class="btn">{{ $t("order") }}</button>
          </div>
        </div>
        <img class="asic" src="../assets/asic.png" alt="" />
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
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  padding: 40px;
  border-radius: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  overflow: hidden;
  max-height: 376px;
}

.card:hover {
  transform: scale(1.02);
}

.info {
  width: 57%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main_info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  font-size: 36px;
  line-height: 36px;
  font-weight: 800;
  color: #0d0d0d;
}

.main .title {
  color: #fff;
}

.main {
  background-image: url("../assets/bg_card.png");
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
  line-height: 14px;
}

.main .group-name {
  color: #fff;
  opacity: 60%;
}

.group-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #272727;
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
  line-height: 32px;
}

.main .price {
  color: #fff;
}
.asic {
  width: 40%;
  transform: translateY(30px);
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

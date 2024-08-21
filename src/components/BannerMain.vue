<script>
export default {
  name: "BlockBusiness",
  components: {},
  data() {
    return {
      card: {
        price: "6300.00",
        name: "ANTMINER S19K PRO 120TH",
        hashrate: "120",
        profit: "460",
        power: 2760,
        time_profit: "5 месяцев",
        img: "asic",
      },
    };
  },
};
</script>
<template>
  <div class="card main">
    <div class="info">
      <div class="main_info">
        <div class="title">{{ card.name }}</div>
        <div class="group">
          <span class="group-name">Хешрейт:</span>
          <span class="group-value">{{ card.hashrate }} TH/s</span>
        </div>
        <div class="group">
          <span class="group-name">Доход:</span>
          <span class="group-value">${{ card.profit }}/месяц</span>
        </div>
        <div class="group">
          <span class="group-name">Расход:</span>
          <span class="group-value">{{ card.power }} Вт</span>
        </div>
      </div>
    </div>
    <img class="asic" src="../assets/asic.png" alt="" />
  </div>
</template>
<style scoped>
.card {
  padding: 10px 20px;
  border-radius: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  overflow: hidden;
  height: 140px;
  border: none;
}

.card:hover {
  transform: scale(1.01);
  box-shadow: 0 0 10px 0 #00000037;
}

.info {
  width: 57%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main_info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  font-size: 30px;
  line-height: 30px;
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
.asic {
  width: 30%;
  transform: translateY(30px);
}

@media (max-width: 700px) {
  .card {
    padding: 10px;
  }
  .title {
    font-size: 26px;
    line-height: 26px;
  }

  .asic {
    width: 30%;
  }
}

@media (max-width: 480px) {
  .main_info {
    gap: 5px;
  }

  .asic {
    width: 40%;
  }
}

@media (max-width: 440px) {
  .group-name,
  .group-value {
    font-size: 10px;
  }

  .title {
    font-size: 16px;
  }
}
</style>

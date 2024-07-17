<script>
import BlockCalculator from "./BlockCalculator.vue";
export default {
  name: "AppMain",
  components: {
    BlockCalculator,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<template>
  <div class="wrapper">
    <h2>Общая сумма заработанных активов</h2>
    <div class="total">
      <img src="../assets/btc.svg" alt="" />
      <span class="usd">1500$</span>
      <span class="btc">(~0.0036 BTC)</span>
    </div>
    <div class="profit">
      <div class="day">
        <span class="title">Ежедневный доход:</span>
        <div class="group">
          <span class="usd">0.09$</span>
          <div class="btc">(~0.000036 BTC)</div>
        </div>
      </div>
      <div class="month">
        <div class="title">Ежемесячный доход:</div>
        <div class="group">
          <span class="usd">1500$</span>
          <span class="btc">(~0.0036 BTC)</span>
        </div>
      </div>
      <div class="year">
        <div class="title">Ежегодный доход:</div>
        <div class="group">
          <span class="usd">155 000$</span>
          <span class="btc">(~1.0036 BTC)</span>
        </div>
      </div>
    </div>
    <BlockCalculator :white="true" />
  </div>
</template>
<style scoped>
.wrapper {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.total {
  width: 100%;
  padding: 25px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  background-color: #fff;
}

.usd {
  font-weight: 600;
  color: #272727;
  font-size: 20px;
  line-height: 20px;
}

.btc {
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  opacity: 50%;
  color: #272727;
}

.title {
  opacity: 50%;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #272727;
}

.profit {
  display: flex;
  align-items: stretch;
  gap: 10px;
}

.day,
.month,
.year {
  width: 33%;
  background-color: #fff;
  border-radius: 20px;
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.group {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 1200px) {
  .usd,
  .btc {
    font-size: 16px;
  }
}

@media (max-width: 910px) {
  .profit {
    flex-direction: column;
  }

  .day,
  .month,
  .year {
    width: 100%;
  }
}

@media (max-width: 420px) {
  .total {
    padding: 20px;
    gap: 7px;
  }
}
</style>

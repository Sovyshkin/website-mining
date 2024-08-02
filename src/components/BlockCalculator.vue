<script>
import axios from "axios";

export default {
  name: "BlockCalculator",
  components: {},
  data() {
    return {
      active: 1,
      invest: 3800,
      dohod: 0,
      rashod: 0.06 * 24 * 3.6,
      electricity: 0,
      hashrate: 234 * 10 ** 12,
      reward: 3.17,
      dif: 90666502495565,
      btc_price: 65000,
      hashrate_cost: 24,
    };
  },
  props: {
    white: Boolean,
  },
  methods: {
    calc() {
      let days = 1;
      if (this.active == 1) {
        days = 1;
      } else if (this.active == 2) {
        days = 30;
      } else if (this.active == 3) {
        days = 365;
      }
      let hashrate = this.invest / this.hashrate_cost;
      this.dohod =
        Math.round(
          ((hashrate * 10 ** 12 * this.reward * this.btc_price * 84000) /
            (this.dif * 2 ** 32)) *
            100
        ) / 100;
      this.electricity =
        Math.round(((hashrate * 15 * 24) / 1000) * days * 100) / 100;
      console.log(hashrate);
      this.rashod = Math.round(0.06 * this.electricity * 100) / 100;
      this.profit = this.dohod - this.rashod;
    },

    async load_info() {
      try {
        let response = await axios.get(`/market/calculator`);
        this.dif = response.data.difficulty;
        this.reward = response.data.reward;
        this.btc_price = response.data.btc_price;
        this.hashrate_cost = response.data.hashrate_cost;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.load_info();
  },
};
</script>
<template>
  <div class="wrapper" :class="{ insert: this.white }">
    <h2>Калькулятор доходности</h2>
    <div class="wrapper-btns">
      <button
        @click="this.active = 1"
        class="btn"
        :class="{ active: this.active == 1 }"
      >
        За день
      </button>
      <button
        @click="this.active = 2"
        class="btn"
        :class="{ active: this.active == 2 }"
      >
        За месяц
      </button>
      <button
        @click="this.active = 3"
        class="btn"
        :class="{ active: this.active == 3 }"
      >
        За год
      </button>
      <button
        @click="this.active = 4"
        class="btn"
        :class="{ active: this.active == 4 }"
      >
        Желаемый доход
      </button>
    </div>
    <div class="main">
      <div class="left">
        <div class="inputs_range" v-if="active != 4">
          <div class="group-range">
            <label class="group-label" for="range"
              ><span class="invest">Инвестиции</span>
              <span class="rangeUsd">{{ invest }} USD / 300000 USD</span></label
            >
            <input
              v-model="invest"
              @input="calc"
              min="3800"
              max="300000"
              type="range"
              class="range"
              id="range"
            />
          </div>
          <div class="group-range">
            <label class="group-label" for="range2"
              ><span class="invest">Bitcoin</span>
              <span class="rangeUsd">1 BTC = {{ btc_price }} USD</span></label
            >
            <input
              v-model="btc_price"
              @input="calc"
              min="30000"
              max="130000"
              type="range"
              class="range"
              id="range2"
            />
          </div>
        </div>
        <div class="inputs" v-if="active == 4">
          <input class="profit" placeholder="Укажите желаемый доход" />
          <select class="time" name="" id="">
            <option value="day">В день</option>
            <option value="month">В месяц</option>
            <option value="year">В год</option>
          </select>
        </div>
        <div class="info">
          <div class="group" v-if="active == 4">
            <span class="group-name">Инвестиции:</span>
            <span class="group-value">$8 999.00</span>
          </div>
          <div class="group" v-if="active != 4">
            <span class="group-name">Доход:</span>
            <span class="group-value">${{ dohod }}</span>
          </div>
          <div class="group">
            <span class="group-name">Расходы на хостинг:</span>
            <span class="group-value">${{ rashod }}</span>
          </div>
          <div class="group">
            <span class="group-name">Электричество</span>
            <span class="group-value">{{ electricity }}/kW</span>
          </div>
          <div class="group" v-if="active == 4">
            <span class="group-name">Bitcoin:</span>
            <span class="group-value">90 000 USD</span>
          </div>
        </div>
      </div>
      <div class="right" :class="{ white: this.white }">
        <div class="title">Ожидаемая прибыль</div>
        <div class="earn">
          <span class="title-earn">60.07 USD</span>
          <span class="procent">0.005%</span>
          <span class="btc">(0.00057 BTC)</span>
          <span class="btc">Возврат инвестиций</span>
        </div>
        <div class="earn-time">За день</div>
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

.insert {
  padding: 0 !important;
  margin: 0 !important;
}

.wrapper-btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  border-radius: 10px;
  background-color: #fff;
  padding: 17px 32px;
  box-shadow: none;
  transition: all 400ms ease;
}

.active {
  background-color: #cf0032;
  color: #fff;
}

.main {
  display: flex;
  gap: 20px;
}

.left {
  width: 57%;
  border-radius: 20px;
  padding: 40px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.right {
  background-color: #ecedf2;
  width: 43%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  border-radius: 20px;
}

.white {
  background-color: #fff;
}

.inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profit {
  width: 70%;
  border: 1px solid #f0f0f5;
  border-radius: 10px;
  padding: 17.5px 17px;
}

.profit::placeholder {
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
  color: #9298b4;
}

.time {
  width: 30%;
  padding: 17px;
  border: 1px solid #f0f0f5;
  border-radius: 10px;
}

.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.group-value {
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  color: #cf0032;
}

.group-name {
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  color: #0f0f0f;
}

.earn {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.earn-time {
  width: fit-content;
  border-radius: 20px;
  font-weight: 600;
  border: 1.5px solid #cf0032;
  color: #cf0032;
  padding: 12px 24px;
}

.title-earn {
  color: #cf0032;
  font-weight: 800;
  font-size: 32px;
  line-height: 44.8px;
}

.procent {
  color: #141414;
  font-size: 18px;
  line-height: 25.2px;
  font-weight: 600;
}

.btc {
  color: #9298b4;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.6px;
}

.title {
  font-weight: 600;
  font-size: 17px;
  line-height: 17px;
  color: #141414;
}

.range {
  accent-color: #cf0132;
  border: none !important;
  outline: none !important;
  cursor: pointer;
  width: 100%;
  height: 7px;
}

.inputs_range {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.group-range {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.group-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.invest {
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  color: #0f0f0f;
}

.rangeUsd {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #0f0f0f;
  opacity: 40%;
}

/* input[type="range"] {
  overflow-x: hidden;
  width: 100%;
  height: 7px;
  -webkit-appearance: none;
  background-color: #f5f5f8;
  border-radius: 5px;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 10px;
  -webkit-appearance: none;
  color: #13bba4;
  margin-top: -1px;
}

input[type="range"]::-webkit-slider-thumb {
  width: 15px;
  -webkit-appearance: none;
  height: 15px;
  cursor: ew-resize;
  border-radius: 100%;
  background: #cf0132;
  box-shadow: -2000px 0 0 2000px #cf0132;
}
input[type="range"]::-moz-range-progress {
  background-color: #cf0132;
}
input[type="range"]::-moz-range-track {
  background-color: #f5f5f8;
}
input[type="range"]::-ms-fill-lower {
  background-color: #cf0132;
}
input[type="range"]::-ms-fill-upper {
  background-color: #f5f5f8;
} */

@media (max-width: 880px) {
  .left,
  .right {
    width: 100%;
  }

  .main {
    flex-direction: column;
  }
}

@media (max-width: 570px) {
  .wrapper-btns {
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: stretch;
  }

  .wrapper-btns button {
    flex: 25%;
  }
}

@media (max-width: 520px) {
  .left {
    padding: 20px;
  }
}

@media (max-width: 460px) {
  .invest {
    font-size: 16px;
    line-height: 16px;
  }

  .rangeUsd {
    font-size: 14px;
    line-height: 14px;
  }
}

@media (max-width: 380px) {
  .wrapper-btns {
    flex-direction: column;
  }

  .rangeUsd {
    font-size: 12px;
    line-height: 12px;
  }
}
</style>

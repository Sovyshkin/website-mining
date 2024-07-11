<script>
export default {
  name: "BlockCalculator",
  components: {},
  data() {
    return {
      active: 4,
    };
  },
};
</script>
<template>
  <div class="wrapper">
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
        <div class="inputs">
          <input class="profit" placeholder="Укажите желаемый доход" />
          <select class="time" name="" id="">
            <option value="day">В день</option>
          </select>
        </div>
        <div class="info">
          <div class="group">
            <span class="group-name">Инвестиции:</span>
            <span class="group-value">$8 999.00</span>
          </div>
          <div class="group">
            <span class="group-name">Расходы на хостинг:</span>
            <span class="group-value">$38.93</span>
          </div>
          <div class="group">
            <span class="group-name">Электричество</span>
            <span class="group-value">618.86/kW</span>
          </div>
          <div class="group">
            <span class="group-name">Bitcoin:</span>
            <span class="group-value">90 000 USD</span>
          </div>
        </div>
      </div>
      <div class="right">
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

@media (max-width: 380px) {
  .wrapper-btns {
    flex-direction: column;
  }
}
</style>

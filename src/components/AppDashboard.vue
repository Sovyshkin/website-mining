<script>
export default {
  name: "AppDashboard",
  components: {},
  data() {
    return {};
  },
};
</script>
<template>
  <div class="wrapper">
    <h2>Приборная панель</h2>
    <div class="balance">
      <div class="info">
        <span class="name">Баланс</span>
        <div class="group">
          <span class="usd">0.09$</span>
          <span class="btc">(~0.000036 BTC)</span>
        </div>
      </div>
      <div class="wrap_btns">
        <button class="btn">Пополнить</button>
        <button class="btn withdraw">Вывести</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.balance {
  width: 100%;
  padding: 25px 30px;
  display: flex;
  gap: 20px;
  border-radius: 20px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
}

.name {
  font-weight: 500;
  opacity: 50%;
  font-size: 16px;
  line-height: 16px;
  color: #272727;
}

.group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.usd {
  font-weight: 600;
  color: #272727;
  font-size: 24px;
  line-height: 24px;
}
.btc {
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: #272727;
  opacity: 50%;
}

.wrap_btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  background-color: #cf0032;
  border: none;
  border-radius: 10px;
  padding: 17px 32px;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
}

.withdraw {
  color: #cf0032;
  border: 1px solid #cf0032;
  background-color: transparent;
}
</style>

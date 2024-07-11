<script>
export default {
  name: "Banner_1",
  components: {},
  data() {
    return {};
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="banner">
      <div class="background"></div>
      <div class="title">
        <span class="red">Желаете приобрести оборудование оптом?</span>
        <span
          >Мы на связи! Жмите на кнопку ниже, заполняйте форму и наш сотрудник
          перезвонит вам в удобное время.</span
        >
      </div>
      <button class="btn">Обратная связь</button>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin-top: 40px;
  padding: 0 40px;
}

.banner {
  position: relative;
  padding: 60px 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background: transparent;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/banner1.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  border-radius: 20px;
}

.title {
  color: #fff;
  font-weight: 600;
  font-size: 28px;
  line-height: 33.6px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.red {
  color: #cf0032;
}

.btn {
  padding: 17px 24px;
  border-radius: 10px;
  background-color: #cf0032;
  color: #fff;
  width: fit-content;
}

.btn,
.title {
  z-index: 2;
}
</style>

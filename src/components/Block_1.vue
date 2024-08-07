<script>
export default {
  name: "Block_1",
  components: {},
  data() {
    return {};
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="background"></div>
    <div class="left">
      <h2>
        Погрузитесь в мир майнинга Биткойна уже сегодня. Это проще чем кажется
      </h2>
      <p>
        Ознакомтесь с нашей системой майнинга биткойна получите пробный период
        по цене 31$ и сделайте правильный выбор
      </p>
      <div class="wrap-btns">
        <button class="btn learn">Ознакомиться</button>
        <button @click="this.$emit('updateLogin', true)" class="btn logsys">
          Войти в систему
        </button>
        <button class="btn youtube">
          Смотреть на Youtube
          <img src="../assets/youtube.png" alt="" />
        </button>
      </div>
    </div>
    <div class="right">
      <!-- <img class="asic asic1" src="../assets/asic.png" alt="" />
      <img class="asic asic2" src="../assets/asic.png" alt="" /> -->
      <video
        ref="player"
        src="../assets/asic.mp4"
        muted
        loop
        autoplay
        oncanplay="this.muted=true"
      >
        Ваш браузер не поддерживает HTML5 видео.
      </video>
    </div>
  </div>
</template>
<style scoped>
.youtube img {
  height: 24px;
  width: 24px;
}
.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 20px;
  position: relative;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.1;
}

.left,
.right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  z-index: 2;
}

.left {
  flex-direction: column;
  align-items: start;
}

.asic {
  height: 378px;
}

.asic1 {
  transform: translateX(175px);
}

.asic2 {
  z-index: 3;
}

.wrap-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.learn {
  background-color: #cf0032;
}

.logsys {
  border: 1.5px solid #cf0032;
  color: #cf0032 !important;
}

.youtube {
  background-color: black;
  color: #fff;
}

.wrap-btns button {
  color: #fff;
  flex: 48%;
  padding: 17px 24px;
  border-radius: 10px;
}

video {
  width: 100%;
  border-radius: 15px;
  pointer-events: none;
}

@media (max-width: 780px) {
  .wrapper {
    flex-direction: column;
  }

  .left,
  .right {
    width: 100%;
  }

  .right {
    gap: 0;
  }

  .asic1 {
    transform: none;
  }

  .asic1 {
    transform: translateX(80px);
  }

  .asic2 {
    transform: translateX(-80px);
  }

  .asic {
    height: 240px;
  }
}
</style>

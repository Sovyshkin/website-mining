<script>
import clock from "../assets/clock.svg";
import driverRefresh from "../assets/driver-refresh.svg";
import pcPhone from "../assets/pcPhone.svg";
import verify from "../assets/verify.svg";
import support from "../assets/24-support.svg";
export default {
  name: "BlockAdvantages",
  components: {},
  data() {
    return {
      cards: [
        {
          img: clock,
          title: "Uptime 24",
          desc: "Стабильное подключение к электроэнергии и интернету",
        },
        {
          img: support,
          title: "Тех. поддержка",
          desc: "Круглосуточное обслуживание оборудования",
        },
        {
          img: verify,
          title: "Гарантия",
          desc: "Заводская гарантия на все оборудование",
        },
        {
          img: driverRefresh,
          title: "Быстрое подключение",
          desc: "Быстрое подключение без ожидания доставки",
        },
        {
          img: pcPhone,
          title: "Удобное управление",
          desc: "Управляйте с любой точки мира",
        },
      ],
    };
  },
};
</script>
<template>
  <div class="wrapper">
    <h2>Наши преимущества</h2>
    <div class="cards">
      <div class="card" v-for="card in cards" :key="card">
        <img :src="card.img" alt="" class="icon" />
        <div class="title">{{ card.title }}</div>
        <div class="desc">{{ card.desc }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h2 {
  text-align: center;
}
.wrapper {
  margin-top: 40px;
  padding: 0 40px;
}

.cards {
  display: flex;
  align-items: stretch;
  gap: 10px;
}

.card {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
}

.title {
  color: #cf0032;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
}

.desc {
  color: #0f0f0f;
  opacity: 70%;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;
  text-align: center;
}

.icon {
  height: 40px;
  width: 40px;
}

@media (max-width: 870px) {
  .cards {
    flex-wrap: wrap;
    justify-content: stretch;
  }
  .card {
    width: 32%;
  }

  .card:nth-last-child(2),
  .card:nth-last-child(1) {
    width: 48%;
  }
}

@media (max-width: 580px) {
  .card {
    width: 48%;
  }

  .card:nth-last-child(1) {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .card {
    width: 100% !important;
  }
}
</style>

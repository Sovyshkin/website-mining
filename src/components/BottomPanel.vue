<script>
import main_active from "../assets/main_active.svg";
import main from "../assets/main.svg";
import dashboard_active from "../assets/dashboard_active.svg";
import dashboard from "../assets/dashboard.svg";
import payments from "../assets/payments.svg";
import payments_active from "../assets/payments_active.svg";
import marketplace from "../assets/marketplace.svg";
import marketplace_active from "../assets/marketplace_active.svg";
import myminers from "../assets/myminers.svg";
import myminers_active from "../assets/myminers_active.svg";
export default {
  name: "BottomPanel",
  data() {
    return {
      cards: [
        {
          img: main,
          img_active: main_active,
          name: "Главная",
          active: false,
          route: "main",
        },
        {
          img: dashboard,
          img_active: dashboard_active,
          name: "Дашборд",
          active: false,
          route: "dashboard",
        },
        {
          img: myminers,
          img_active: myminers_active,
          name: "Майнеры",
          active: false,
          route: "myminers",
        },
        {
          img: payments,
          img_active: payments_active,
          name: "Платежи",
          active: false,
          route: "mypayments",
        },
        {
          img: marketplace,
          img_active: marketplace_active,
          name: "Маркет",
          active: false,
          route: "marketplace",
        },
      ],
    };
  },
  methods: {
    cancel() {
      document.body.style.overflow = "auto";
      this.$emit("updateGoTry", false);
    },

    navClick(name) {
      try {
        for (let i = 0; i < this.cards.length; i++) {
          let item = this.cards[i];
          if (item.name == name) {
            item.active = true;
            this.$router.push({ name: item.route });
          } else {
            item.active = false;
          }
          this.cards[i] = item;
        }
      } catch (err) {
        this.$router.push({ name: "404" });
      }
    },
  },
  mounted() {},
};
</script>
<template>
  <div class="panel">
    <nav class="group-nav">
      <li
        class="nav-item"
        @click="navClick(item.name)"
        v-for="item in cards.slice(0, -1)"
        :key="item"
      >
        <img v-if="item.active" :src="item.img_active" alt="" />
        <img v-if="!item.active" :src="item.img" alt="" />
        <span :class="{ red: item.active }">{{ item.name }}</span>
      </li>
    </nav>
  </div>
</template>
<style scoped>
.panel {
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 3;
  min-height: 70px;
  padding: 12px 16px;
}

.logo {
  height: 60px;
  cursor: pointer;
}

.group-nav {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
}

.nav-item {
  cursor: pointer;
  display: flex;
  gap: 6px;
  align-items: center;
  flex-direction: column;
}

.nav-item img {
  height: 24px;
  width: 24px;
}

.nav-item span {
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: #0f0f0f;
  opacity: 40%;
}

.banner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
  padding: 15px 5px 5px 0;
  width: 220px;
  height: 220px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/banner3.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  border-radius: 20px;
}

.scale {
  height: 6px;
  width: 70%;
  background: linear-gradient(to right, #e11111 0%, #ecf02b 50%, #2ee111 100%);
}

.asic {
  height: 129px;
}

.red {
  color: #cf0032 !important;
}

.title,
.scale,
.asic {
  z-index: 2;
}

.title {
  color: #fff;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
}

.footer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

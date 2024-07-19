<script>
import main_active from "../assets/main_active.svg";
import main from "../assets/main.svg";
import dashboard_active from "../assets/dashboard_active.svg";
import dashboard from "../assets/dashboard.svg";
import payments from "../assets/payments.svg";
import payments_active from "../assets/payments_active.svg";
import marketplace from "../assets/marketplace.svg";
import marketplace_active from "../assets/marketplace_active.svg";
import accruals from "../assets/accruals.svg";
import accruals_active from "../assets/accruals_active.svg";
import cart from "../assets/cart.svg";
import cart_active from "../assets/cart_active.svg";
import partner from "../assets/partner.svg";
import partner_active from "../assets/partner_active.svg";
import support from "../assets/support.svg";
import support_active from "../assets/support_active.svg";
import myminers from "../assets/myminers.svg";
import myminers_active from "../assets/myminers_active.svg";
export default {
  name: "LeftPanel",
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
          name: "Мои майнеры",
          active: false,
          route: "myminers",
        },
        {
          img: payments,
          img_active: payments_active,
          name: "Мои платежи",
          active: false,
          route: "mypayments",
        },
        {
          img: marketplace,
          img_active: marketplace_active,
          name: "Маркетплейс",
          active: false,
          route: "marketplace",
        },
        {
          img: accruals,
          img_active: accruals_active,
          name: "Начисления и списания",
          active: false,
          route: "accruals",
        },
        {
          img: cart,
          img_active: cart_active,
          name: "Корзина",
          active: false,
          route: "cart",
        },
        {
          img: partner,
          img_active: partner_active,
          name: "Партнерская программа",
          active: false,
          route: "partner",
        },
        {
          img: support,
          img_active: support_active,
          name: "Справочный центр",
          active: false,
          route: "support",
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
      <li class="nav-item" @click="this.$router.push({ name: 'home' })">
        <img class="logo" src="../assets/logo.png" alt="" />
      </li>
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
    <div class="footer">
      <div class="banner">
        <div class="background"></div>
        <div class="title">ТЕСТОВЫЙ ПЕРИОД 7 ДНЕЙ</div>
        <div class="scale"></div>
        <img class="asic" src="../assets/asic.png" alt="" />
      </div>
      <div @click="navClick(this.cards.slice(-1)[0].name)" class="nav-item">
        <img
          v-if="!this.cards.slice(-1)[0].active"
          src="../assets/support.svg"
          alt=""
        />
        <img
          v-if="this.cards.slice(-1)[0].active"
          src="../assets/support_active.svg"
          alt=""
        />
        <span :class="{ red: this.cards.slice(-1)[0].active }">{{
          this.cards.slice(-1)[0].name
        }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.panel {
  width: 25%;
  background-color: #fff;
  padding: 0 40px 40px 40px;
}

.logo {
  height: 60px;
  cursor: pointer;
}

.group-nav {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-item {
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
}

.nav-item span {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #0f0f0f;
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

@media (max-width: 1160px) {
  .asic {
    height: 95px;
  }

  .banner {
    width: 170px;
    height: 170px;
  }
}

@media (max-width: 920px) {
  .panel {
    padding: 0 15px 15px 15px;
  }
}

@media (max-width: 800px) {
  .banner {
    display: none;
  }
}

@media (max-width: 644px) {
  .nav-item span {
    font-size: small;
  }
}

@media (max-width: 564px) {
  .nav-item span {
    display: none;
  }

  .nav-item {
    justify-content: center;
  }

  .group-nav {
    gap: 20px;
  }

  .panel {
    width: 7%;
  }

  img {
    height: 20px;
    width: 20px;
    max-width: none;
  }

  .logo {
    display: none;
  }
}
</style>

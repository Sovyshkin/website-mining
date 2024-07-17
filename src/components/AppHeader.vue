<script>
export default {
  name: "AppHeader",
  components: {},
  data() {
    return {
      lang: this.$i18n.locale,
      names: {
        marketplace: "Маркетплейс",
        main: "Главная",
        dashboard: "Дашбоард",
        myminers: "Мои майнеры",
        mypayments: "Мои платежи",
        accruals: "Начисления и накопления",
        cart: "Корзина",
        support: "Справочный центр",
        profile: "Профиль",
      },
    };
  },
  props: {
    login: Boolean,
  },
  methods: {
    scrollToBottom(name) {
      const element = document.getElementById(name);
      if (element) {
        window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
      } else {
        this.$router.push({ name: "main" });
      }
    },
  },
  mounted() {
    console.log(this.login);
  },
};
</script>
<template>
  <div class="wrapper" v-if="!login">
    <img
      @click="this.$router.push({ name: 'main' })"
      class="logo"
      src="../assets/logo.png"
      alt=""
    />
    <nav class="group-nav">
      <li @click="scrollToBottom('services')" class="item-nav">
        {{ $t("services") }}
      </li>
      <li @click="scrollToBottom('business')" class="item-nav">
        {{ $t("business") }}
      </li>
      <li @click="scrollToBottom('equipment')" class="item-nav">
        {{ $t("equipment") }}
      </li>
      <li @click="scrollToBottom('test')" class="item-nav">{{ $t("test") }}</li>
    </nav>
    <div class="contacts">
      <img src="../assets/WhatsApp.svg" alt="" />
      <img src="../assets/Telegram.svg" alt="" />
      <span class="number">+7 900 000 00 00</span>
    </div>
    <div class="lan">
      <img class="flag" :src="'../assets/' + lang + '.png'" alt="" />
      <span>{{ lang }}</span>
      <img src="" alt="" />
    </div>
    <button @click="this.$emit('updateLogin', true)" class="btn login">
      Войти
    </button>
  </div>
  <div class="wrapper marketplace" v-else>
    <span class="main"
      ><span>Главная</span><span>/</span>
      {{ this.names[this.$route.name] }}</span
    >
    <div class="info">
      <div class="lan">
        <img class="flag" :src="'../assets/' + lang + '.png'" alt="" />
        <span>{{ lang }}</span>
        <img src="" alt="" />
      </div>
      <div class="avatar">
        <img src="../assets/avatar.jpeg" alt="" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  width: 100%;
  min-height: 80px;
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 0 40px;
  justify-content: space-between;
  background-color: white;
}

.logo {
  height: 60px;
  cursor: pointer;
}

.flag {
  height: 14px;
}

.contacts img {
  height: 28px;
  width: 28px;
  cursor: pointer;
}

.group-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
}

.item-nav {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  cursor: pointer;
}

.contacts {
  display: flex;
  align-items: center;
  gap: 15px;
}

.lan {
  display: flex;
  align-items: center;
  gap: 6px;
}

.login {
  background-color: #cf0032;
  padding: 14px 24px;
  border-radius: 5px;
  color: #fff;
}

.item-nav::after {
  margin-top: 2px;
  background-color: #cf0032; /* Цвет линии при наведении на нее курсора мыши */
  display: block;
  content: "";
  height: 2px; /* Высота линии */
  width: 0%;
  -webkit-transition: width 0.4s ease-in-out;
  -moz--transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}
.item-nav:hover:after,
.item-nav:focus:after {
  width: 100%;
}

.main {
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
  color: #0f0f0f;
  display: flex;
  align-items: center;
  gap: 10px;
}

.main span {
  opacity: 30%;
}

.avatar {
  border-radius: 45px;
  overflow: hidden;
}

.avatar img {
  height: 52px;
  width: 52px;
  object-fit: cover;
}

.info {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 1000px) {
  .group-nav {
    display: none;
  }

  .login {
    padding: 7px 12px;
  }
}

@media (max-width: 650px) {
  .number {
    font-size: small;
  }

  .wrapper {
    gap: 10px;
    padding: 0 15px;
  }
}

@media (max-width: 460px) {
  .number {
    font-size: 11px;
  }

  .logo {
    height: 40px;
  }
}

@media (max-width: 400px) {
  .contacts {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
}
</style>

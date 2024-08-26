<script>
import axios from "axios";
export default {
  name: "AppHeader",
  components: {},
  data() {
    return {
      lang: this.$i18n.locale,
      names: {
        marketplace: "Маркет",
        main: "Главная",
        dashboard: "Приборная панель",
        myminers: "Мои майнеры",
        mypayments: "Мои платежи",
        accruals: "Начисления и списания",
        cart: "Корзина",
        support: "Центр помощи",
        profile: "Профиль",
      },
      id: null,
      avatar: "",
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

    async verify_token() {
      try {
        let response = await axios.post(
          `/auth/validate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        let message = response.data.message;
        console.log(response);
        if (message != "ok") {
          this.$router.push({ name: "home" });
        }
      } catch (err) {
        console.log(err);
        let token = this.$route.query.token;
        if (!token) {
          localStorage.clear();
          this.$router.push({ name: "home" });
        }
      }
    },

    async load_avatar() {
      try {
        let response = await axios.get(`/users/${localStorage.getItem("id")}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.avatar = response.data.user.image.url;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.verify_token();
    this.id = localStorage.getItem("id") || null;

    window.addEventListener("storage", () => {
      this.id = localStorage.getItem("id") || null;
    });
    this.load_avatar();
  },
};
</script>
<template>
  <div class="wrapper" v-if="!id">
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
    <button @click="this.$emit('updateSlider', true)" class="btn login">
      Войти
    </button>
  </div>
  <div class="wrapper" v-else>
    <img
      @click="this.$router.push({ name: 'main' })"
      class="logo logoAdap"
      src="../assets/logo.png"
      alt=""
    />
    <span class="main mainAdap"
      ><span>Главная</span><span>/</span>
      {{ this.names[this.$route.name] }}</span
    >
    <div class="info">
      <div class="lan">
        <img class="flag" :src="'../assets/' + lang + '.png'" alt="" />
        <span>{{ lang }}</span>
        <img src="" alt="" />
      </div>
      <div class="avatar" @click="this.$router.push({ name: 'profile' })">
        <img v-if="avatar" :src="avatar" alt="" />
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
  margin-bottom: 0px;
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
  cursor: pointer;
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

.logoAdap {
  display: none;
}

@media (max-width: 1000px) {
  .group-nav {
    display: none;
  }

  .login {
    padding: 7px 12px;
  }
}

@media (max-width: 768px) {
  .logoAdap {
    display: block;
  }
  .mainAdap {
    display: none;
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

@media (max-width: 400px) {
  .contacts {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
}
</style>

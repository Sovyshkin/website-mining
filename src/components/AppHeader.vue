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
      countries: ["RU", "EN", "HE"],
      active: false,
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
        this.lang = response.data.user.lang;
        this.$i18n.locale = this.lang;
        this.avatar = response.data.user.image.url;
      } catch (err) {
        console.log(err);
      }
    },

    async changeLang(lang) {
      try {
        this.lang = lang;
        let response = await axios.post(
          `/users/update/lang`,
          {
            lang: lang,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        if (response.data.status == "ok") {
          this.$i18n.locale = lang;
        }
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
  <div class="wrapper" v-if="$route.path == '/'">
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
      <a href="https://wa.me/+972508981614" target="_blank"
        ><img src="../assets/WhatsApp.svg" alt="WhatAapp"
      /></a>
      <a href="https://t.me/@Totalminers" target="_blank"
        ><img src="../assets/Telegram.svg" alt="Telegram"
      /></a>
      <span class="number">+972 50-8981614</span>
    </div>
    <div class="info" v-if="!id">
      <div class="lan" @click="active = !active">
        <img class="flag" :src="'../assets/' + lang + '.png'" alt="" />
        <span>{{ lang }}</span>
        <img class="arrow" src="../assets/arrow-down.png" alt="" />
        <div class="all_flags" v-if="active">
          <div
            class="group-country"
            @click="changeLang(item)"
            v-for="item in countries"
            :key="item"
          >
            <img class="flag" :src="'../assets/' + item + '.png'" alt="" />
            <span class="group-value">{{ item }}</span>
          </div>
        </div>
      </div>
      <button @click="this.$emit('updateLogin', true)" class="btn login">
        {{ $t("login") }}
      </button>
    </div>
    <div class="info" v-else>
      <div class="lan" @click="active = !active">
        <img class="flag" :src="'../assets/' + lang + '.png'" alt="" />
        <span>{{ lang }}</span>
        <img class="arrow" src="../assets/arrow-down.png" alt="" />
        <div class="all_flags" v-if="active">
          <div
            class="group-country"
            @click="changeLang(item)"
            v-for="item in countries"
            :key="item"
          >
            <img class="flag" :src="'../assets/' + item + '.png'" alt="" />
            <span class="group-value">{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="avatar" @click="this.$router.push({ name: 'profile' })">
        <img v-if="avatar" :src="avatar" alt="" />
        <img v-else src="../assets/profile.png" alt="" />
      </div>
    </div>
  </div>
  <div class="wrapper" v-else>
    <img
      @click="this.$router.push({ name: 'main' })"
      class="logo logoAdap"
      src="../assets/logo.png"
      alt=""
    />
    <span class="main mainAdap"
      ><span>{{ $t("main") }}</span
      ><span>/</span> {{ this.names[this.$route.name] }}</span
    >
    <div class="info">
      <div class="lan" @click="active = !active">
        <img class="flag" :src="'../assets/' + lang + '.png'" alt="" />
        <span>{{ lang }}</span>
        <img class="arrow" src="../assets/arrow-down.png" alt="" />
        <div class="all_flags" v-if="active">
          <div
            class="group-country"
            @click="changeLang(item)"
            v-for="item in countries"
            :key="item"
          >
            <img class="flag" :src="'../assets/' + item + '.png'" alt="" />
            <span class="group-value">{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="avatar" @click="this.$router.push({ name: 'profile' })">
        <img v-if="avatar" :src="avatar" alt="" />
        <img v-else src="../assets/profile.png" alt="" />
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
  position: relative;
  cursor: pointer;
}

.all_flags {
  position: absolute;
  padding: 3px 7px;
  transform: translateY(70px);
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 #00000037;
  z-index: 3;
}

.group-country {
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

.arrow {
  height: 20px;
  width: 20px;
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

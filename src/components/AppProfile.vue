<script>
import axios from "axios";
import Qrcode from "qrcode.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  name: "AppProfile",
  components: { Qrcode, LoadingSpinner },
  data() {
    return {
      active: 1,
      profiletype: "",
      image: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      country: "",
      address: "",
      inn: "",
      telegram: "",
      old_password: "",
      new_password: "",
      new_password2: "",
      code_2fa: "",
      wallet: "",
      walletNew: "",
      otp: "",
      countries: [],
      message: "",
      message2: "",
      message3: "",
      message4: "",
      message5: "",
      mfa_url: "",
      confirm2fa: false,
      mfa: false,
      isLoading: false,
    };
  },
  computed: {
    formatPhoneNumber() {
      return this.phone ? this.phone.replace(/[^+\d]/g, "") : "";
    },
  },
  methods: {
    updateValue(e) {
      let input = e.target.value.replace(/[^+\d]/g, "");
      if (input.length > 12) {
        input = input.slice(0, 12);
      }
      if (!input.startsWith("+")) {
        input = "+";
      }
      this.phone = input;
      e.target.value = this.formatPhoneNumber;
    },

    async load_info() {
      try {
        this.isLoading = true;
        let res = await axios.get(`/users/countries`);
        this.countries = res.data;
        let response = await axios.get(`/users/${localStorage.getItem("id")}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        this.email = response.data.user.email;
        this.phone = response.data.user.phone;
        this.firstname = response.data.user.firstname;
        this.lastname = response.data.user.lastname;
        this.country = response.data.user.country;
        this.profiletype = response.data.user.profileType;
        this.inn = response.data.user.inn;
        this.address = response.data.user.address;
        this.telegram = response.data.user.telegram;
        this.wallet = response.data.user.wallet;
        this.image = response.data.user.image.url;
        this.mfa = response.data.user.mfa_enabled;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    async updateProfile() {
      try {
        let response = await axios.post(
          "/users/updateProfile",
          {
            id: localStorage.getItem("id"),
            firstname: this.firstname,
            lastname: this.lastname,
            profiletype: this.profiletype,
            email: this.email,
            phone: this.phone,
            country: this.country,
            address: this.address,
            inn: this.inn,
            telegram: this.telegram,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        this.message = response.data.message;
        if (this.message == "ok") {
          this.message = "Успешно";
        } else {
          this.message = "Ошибка";
        }
        setTimeout(() => {
          this.message = "";
          this.load_info();
        }, 2500);
      } catch (err) {
        console.log(err);
      }
    },

    async updatePassword() {
      try {
        if (this.new_password == this.new_password2) {
          let response = await axios.post(
            `/users/updatePassword`,
            {
              old_password: this.old_password,
              new_password: this.new_password,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          this.message2 = response.data.message;
          if (this.message2 == "ok") {
            this.message2 = "Успешно";
          }
        } else {
          this.message2 = "Пароли не совпадают!";
        }
        setTimeout(() => {
          this.message2 = "";
        }, 2500);
      } catch (err) {
        console.log(err);
      }
    },

    async getmfa() {
      try {
        if (this.password) {
          let response = await axios.get(
            `/auth/getmfa?password=${this.password}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          this.mfa_url = response.data.mfa_url;
        } else {
          this.message5 = "Введите пароль";
          setTimeout(() => {
            this.message5 = "";
          }, 3000);
        }
      } catch (err) {
        console.log(err);
        this.message5 = "Пароль неверный";
        setTimeout(() => {
          this.message5 = "";
        }, 3000);
      }
    },

    async enablemfa() {
      try {
        if (this.code_2fa) {
          let response = await axios.post(
            `/auth/enablemfa?otp=${this.code_2fa}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          this.message3 = response.data.message;
          if (this.message3 == "ok") {
            this.message3 = "Успешно";
            this.load_info();
          }
        }
      } catch (err) {
        console.log(err);
        this.message3 = "Неверный код";
        setTimeout(() => {
          this.message3 = "";
        }, 3000);
      }
    },

    authComfirm() {
      this.confirm2fa = true;
      this.mfa_url = "";
    },

    async setWallet() {
      try {
        let response = await axios.post(
          `/users/setWallet`,
          {
            wallet: this.walletNew,
            otp: this.otp,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.message4 = response.data.message;
        if (this.message4 == "ok") {
          this.message4 = "Успешно";
          setTimeout(() => {
            this.message4 = "";
            this.load_info();
          }, 3000);
        }
      } catch (err) {
        console.log(err);
        this.message4 = "Неверный код";
        setTimeout(() => {
          this.message4 = "";
        }, 3000);
      }
    },

    exit() {
      localStorage.clear();
      this.checkToken();
    },

    checkToken() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "home" });
      }
    },

    goChange(b) {
      this.$emit("updateAvatar", b);
    },
  },
  mounted() {
    document.body.style.overflow = "auto";
    this.load_info();
    this.checkToken();
  },
};
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="wrapper" v-else>
    <h2>Профиль</h2>
    <div class="wrap_btns">
      <button
        @click="this.active = 1"
        class="btn"
        :class="{ active: this.active == 1 }"
      >
        Личная информация
      </button>
      <button
        @click="this.active = 2"
        class="btn"
        :class="{ active: this.active == 2 }"
      >
        Google 2Fa
      </button>
      <button
        @click="this.active = 3"
        class="btn"
        :class="{ active: this.active == 3 }"
      >
        Кошелек для выплат
      </button>
    </div>
    <div class="info" v-if="active == 1">
      <div class="personal">
        <h3>Личные данные</h3>
        <div class="personal_info">
          <div class="group-avatar">
            <img class="avatar" :src="image" alt="" />
            <span class="change_avatar" @click="goChange(true)"
              >Изменить фото</span
            >
          </div>
          <div class="group">
            <select v-model="profiletype" id="">
              <option value="id">Индивидуальный</option>
              <option value="business">Бизнес</option>
            </select>
            <span class="group-value">Тип профиля</span>
          </div>
          <div class="group">
            <input
              type="text"
              name="firstname"
              v-model="firstname"
              placeholder="Введите имя"
            />
            <span class="group-value">Имя</span>
          </div>
          <div class="group">
            <input
              type="text"
              name="lastname"
              v-model="lastname"
              placeholder="Введите фамилию"
            />
            <span class="group-value">Фамилия</span>
          </div>
          <div class="group">
            <input
              type="email"
              name="email"
              v-model="email"
              placeholder="Введите свою почту"
            />
            <span class="group-value">Email</span>
          </div>
          <div class="group">
            <input
              :value="formatPhoneNumber"
              @input="updateValue($event)"
              type="tel"
              size="20"
              maxlength="12"
              required
              name="number"
              placeholder="+7"
            />
            <span class="group-value">Телефон</span>
          </div>
          <div class="group">
            <select v-model="country">
              <option
                v-for="item in countries"
                :value="item.short_code"
                :key="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <span class="group-value">Страна</span>
          </div>
          <div class="group">
            <input
              type="text"
              name="address"
              v-model="address"
              placeholder="Введите свой адрес"
            />
            <span class="group-value">Адрес</span>
          </div>
          <div class="group">
            <input
              type="text"
              name="inn"
              v-model="inn"
              placeholder="Введите ИНН"
            />
            <span class="group-value">ИНН</span>
          </div>
          <div class="group">
            <input
              type="text"
              name="telegram"
              v-model="telegram"
              placeholder="Введите свой телеграм"
            />
            <span class="group-value">Telegram</span>
          </div>
          <button v-if="!this.message" class="btn" @click="updateProfile">
            Обновить информацию
          </button>
          <div
            class="msg"
            :class="{
              success: this.message == 'Успешно',
              error: this.message == 'Ошибка',
            }"
            v-if="message"
          >
            {{ message }}
          </div>
        </div>
        <button @click="exit()" class="btn exit">Выйти</button>
      </div>
      <div class="pass">
        <h3>Сменить пароль</h3>
        <div class="pass_info">
          <div class="group">
            <input
              type="password"
              name="password"
              v-model="old_password"
              placeholder="Введите пароль"
            />
            <span class="group-value">Старый пароль</span>
          </div>
          <div class="group">
            <input
              type="password"
              name="password"
              v-model="new_password"
              placeholder="Введите новый пароль"
            />
            <span class="group-value">Новый пароль</span>
          </div>
          <div class="group">
            <input
              type="password"
              name="password2"
              v-model="new_password2"
              placeholder="Введите пароль снова"
            />
            <span class="group-value">Повторите пароль</span>
          </div>
          <button class="btn" v-if="!message2" @click="updatePassword">
            Изменить пароль
          </button>
          <div
            class="msg"
            :class="{
              success: this.message2 == 'Успешно',
              error: this.message2 == 'Пароли не совпадают!',
            }"
            v-if="message2"
          >
            {{ message2 }}
          </div>
        </div>
      </div>
    </div>
    <div class="fa2" v-if="active == 2 && !mfa_url && !mfa">
      <div class="open" v-if="!confirm2fa">
        <h3>1. Откройте приложение Google 2Fa</h3>
        <div class="open_info">
          <p class="text">
            Введите текущий пароль от этой учетной записи, чтобы получить QR-код
            для Google 2Fa.
          </p>
          <div class="group">
            <input
              type="password"
              name="password"
              v-model="password"
              placeholder="Введите текущий пароль"
            />
            <span class="group-value">Пароль</span>
          </div>
          <button @click="getmfa" type="button" class="btn" v-if="!message5">
            Получить QR-code
          </button>
          <div
            class="msg"
            :class="{
              success: this.message5 == 'Успешно',
              error: this.message5 != 'Успешно',
            }"
            v-if="message5"
          >
            {{ message5 }}
          </div>
        </div>
      </div>
      <div class="confirmation" v-if="confirm2fa">
        <h3>2. Подтвердите код Google 2Fa</h3>
        <div class="confirmation_info">
          <p class="text">
            Введите ниже код 2Fa, сгенерированный приложением Google.
          </p>
          <div class="group">
            <input
              type="text"
              name="code_2fa"
              v-model="code_2fa"
              placeholder="Введите код"
            />
            <span class="group-value">Код Google 2Fa из приложения:</span>
          </div>
          <button v-if="!message3" type="button" class="btn" @click="enablemfa">
            Включить Google 2Fa
          </button>
          <div
            class="msg"
            :class="{
              success: this.message3 == 'Успешно',
              error: this.message3 == 'Неверный код',
            }"
            v-if="message3"
          >
            {{ message3 }}
          </div>
        </div>
      </div>
    </div>
    <div class="qr" v-if="mfa_url && !confirm2fa && !mfa">
      <span>Отсканируйте QR-code</span>
      <qrcode class="qrcode" :value="mfa_url"></qrcode>
      <a :href="mfa_url">{{ mfa_url }}</a>
      <button @click="authComfirm" type="button" class="btn">Продолжить</button>
    </div>
    <button
      v-if="mfa"
      class="btn exit"
      @click="this.$emit('updateDeleteAuth', true)"
    >
      Отлючить 2fa
    </button>
    <div class="wallet" v-if="active == 3">
      <div class="current_wallet">
        <h3>Текущий кошелек</h3>
        <div class="wallet_info">
          <div class="group">
            <input type="text" name="wallet" v-model="wallet" placeholder="" />
            <span class="group-value">Кошелек №1</span>
          </div>
          <button class="btn">Получить QR-code</button>
        </div>
      </div>
      <div class="connect_wallet">
        <h3>Подключить кошелек</h3>
        <div class="connect_info">
          <div class="group">
            <input
              type="text"
              name="walletNew"
              v-model="walletNew"
              placeholder="Новый кошелек"
            />
            <span class="group-value">Добавить новый кошелек</span>
          </div>
          <div class="group">
            <input
              type="text"
              name="code"
              v-model="otp"
              placeholder="Введите код"
            />
            <span class="group-value">Код Google 2Fa из приложения:</span>
          </div>
          <button v-if="!message4" @click="setWallet" class="btn">
            Добавить
          </button>
          <div
            class="msg"
            :class="{
              success: this.message4 == 'Успешно',
              error: this.message4 == 'Неверный код',
            }"
            v-if="message4"
          >
            {{ message4 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
}

.wrap_btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info,
.fa2,
.wallet {
  display: flex;
  gap: 30px;
}

.personal,
.pass,
.connect_wallet,
.current_wallet,
.open,
.confirmation {
  flex: 50%;
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.personal_info,
.pass_info,
.wallet_info,
.connect_info,
.open_info,
.confirmation_info {
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
}

.personal_info button,
.pass_info button,
.wallet_info button,
.connect_info button,
.open_info button,
.confirmation_info button {
  background-color: #cf0032;
  color: #fff;
}

input,
select {
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 16px;
}

input::placeholder {
  color: #a5a5a5;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.12px;
}

.forget_pass {
  text-align: end;
}

.group {
  position: relative;
}

.group-value {
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  left: 12px;
  background-color: #fff;
  padding: 0 4px;
  color: #a5a5a5;
  font-weight: 500;
  font-size: 10px;
  line-height: 13.66px;
}
.btn {
  border-radius: 10px;
  background-color: #fff;
  padding: 14.5px 24px;
  box-shadow: none;
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;
  transition: all 400ms ease;
}

.active {
  background-color: #cf0032;
  color: #fff;
}

.text {
  font-size: 16px;
  line-height: 25.6px;
  color: #000;
  font-weight: 500;
}

h3 {
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
}
.msg {
  padding: 10px 13px;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  border-radius: 15px;
  width: fit-content;
  margin: 0 auto;
}

.success {
  background-color: #45ed0b;
}

.error {
  background-color: #cf0032;
}

.qr {
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  gap: 20px;
}

.qr span {
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
}

.qr a {
  word-break: break-all;
}

.qr .btn {
  background-color: #cf0032;
  color: #fff;
}

.qrcode {
  width: 200px !important;
  height: 200px !important;
}

.exit {
  background-color: #cf0032;
  color: #fff;
}

.group-avatar {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
}

.change_avatar {
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: #cf0032;
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 980px) {
  .info,
  .wallet,
  .fa2 {
    flex-direction: column;
  }
}

@media (max-width: 620px) {
  .wrap_btns {
    flex-direction: column;
  }

  .wrap_btns button {
    width: 100%;
  }
}
</style>

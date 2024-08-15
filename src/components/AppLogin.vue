<script>
import axios from "axios";
export default {
  name: "AppLogin",
  data() {
    return {
      email: "",
      password: "",
      auth: false,
      code: "",
      message: "",
    };
  },
  methods: {
    cancel() {
      document.body.style.overflow = "auto";
      this.$emit("updateLogin", false);
    },

    async login() {
      try {
        if (this.email && this.password) {
          let response = await axios.post(`/auth/login`, {
            email: this.email,
            password: this.password,
          });
          let msg = response.data.message;
          if (msg == "check email") {
            this.auth = true;
          }
        }
      } catch (res) {
        this.message = "Пользователь с такими данными не найден";
        setTimeout(() => {
          this.message = "";
        }, 2500);
      }
    },

    async verify() {
      try {
        if (this.code) {
          let response = await axios.post(`/auth/verify_totp`, {
            email: this.email,
            otp: this.code,
          });
          let status = response.status;

          if (status == 200) {
            let id = response.data.id;
            let token = response.data.token;
            localStorage.setItem("id", id);
            localStorage.setItem("token", token);
            this.message = "Успешно";
            setTimeout(() => {
              this.message = "";
              this.$emit("updateLogin", false);
              location.reload();
            }, 3000);
          } else {
            console.log(response);
          }
        }
      } catch (res) {
        let response = res.response.data.detail;
        if (response) {
          console.log;
        }
      }
    },
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflow = "hidden";
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="card" v-if="!auth">
      <div class="cancel">
        <span class="title">Вход</span>
        <img @click="cancel" src="../assets/close.png" alt="" />
      </div>
      <div class="group">
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="Введите свою почту"
        />
        <span class="group-value">Email</span>
      </div>
      <div class="group">
        <input
          type="password"
          name="pass"
          v-model="password"
          placeholder="Введите пароль"
        />
        <span class="group-value">Пароль</span>
      </div>
      <div class="forget_pass">
        <a @click="this.$emit('updateReset', true)" href="#">Забыли пароль?</a>
      </div>
      <button v-if="!message" @click="login" class="btn">Войти</button>
      <div
        class="msg"
        :class="{
          success: this.message == 'Успешно',
          error: this.message != 'Успешно',
        }"
        v-if="message"
      >
        {{ message }}
      </div>
      <div class="log">
        <span>Ещё не зарегистрировались?</span>
        <a @click="this.$emit('updateRegister', true)" href="#"
          >Зарегистрироваться</a
        >
      </div>
    </div>
    <div class="card" v-else>
      <div class="cancel">
        <span class="title">Подтверждение</span>
        <img @click="cancel" src="../assets/close.png" alt="" />
      </div>
      <div class="group">
        <input
          type="text"
          name="code"
          v-model="code"
          placeholder="Введите код"
        />
        <span class="group-value">Код из письма email</span>
      </div>
      <button @click="verify" v-if="!message" class="btn">Войти</button>
      <div
        class="msg"
        :class="{
          success: this.message == 'Успешно',
          error: this.message == 'Неверный код',
        }"
        v-if="message"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  position: absolute;
  height: 100vh;
  width: 100%;
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 32px;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid #fff;
  min-width: 350px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  line-height: 28.8px;
  color: #000;
}

.desc {
  opacity: 80%;
  font-weight: 500;
  font-size: 16px;
  line-height: 22.4px;
}

.btn {
  width: 100%;
  background-color: #cf0032;
  border-radius: 10px;
  padding: 17px 24px;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
}

.log {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.log span,
a {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.6px;
}

a {
  color: #cf0032;
}

.cancel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cancel img {
  cursor: pointer;
  height: 24px;
  width: 24px;
}

input {
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

.card:hover {
  cursor: auto;
  transform: none;
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
</style>

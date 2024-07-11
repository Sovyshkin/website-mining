<script>
export default {
  name: "AppRegister",
  data() {
    return {
      name: "",
      surname: "",
      password: "",
      password2: "",
      number: "+7",
      email: "",
    };
  },
  computed: {
    formatPhoneNumber() {
      return this.number ? this.number.replace(/[^+\d]/g, "") : "";
    },
  },
  methods: {
    cancel() {
      document.body.style.overflow = "auto";
      this.$emit("updateRegister", false);
    },

    async login() {
      console.log();
    },
    updateValue(e) {
      let input = e.target.value.replace(/[^+\d]/g, "");
      if (input.length > 12) {
        input = input.slice(0, 12);
      }
      if (!input.startsWith("+")) {
        input = "+";
      }
      this.number = input;
      e.target.value = this.formatPhoneNumber;
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
    <div class="card">
      <div class="cancel">
        <span class="title">Регистрация</span>
        <img @click="cancel" src="../assets/close.png" alt="" />
      </div>
      <div class="group">
        <input
          type="text"
          name="name"
          v-model="name"
          placeholder="Введите имя"
        />
        <span class="group-value">Имя</span>
      </div>
      <div class="group">
        <input
          type="text"
          name="surname"
          v-model="surname"
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
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Введите пароль"
        />
        <span class="group-value">Пароль</span>
      </div>
      <div class="group">
        <input
          type="password"
          name="password2"
          v-model="password2"
          placeholder="Повторите пароль"
        />
        <span class="group-value">Пароль</span>
      </div>
      <button @click="login" class="btn">Войти</button>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  position: absolute;
  height: 110%;
  width: 100%;
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
}

.card {
  min-width: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 32px;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid #fff;
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

@media (max-width: 680px) {
  .card {
    gap: 12px;
    min-width: 340px;
    padding: 20px;
  }
}
</style>

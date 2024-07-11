<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
      send: false,
    };
  },
  methods: {
    cancel() {
      document.body.style.overflow = "auto";
      this.$emit("updateReset", false);
    },

    async login() {
      console.log();
    },

    async reset() {
      this.send = true;
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
        <span class="title">Сбросить пароль</span>
        <img @click="cancel" src="../assets/close.png" alt="" />
      </div>
      <div class="group" v-if="!send">
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="Введите свою почту"
        />
        <span class="group-value">Email</span>
      </div>
      <div class="desc" v-if="send">
        Ссылка для сброса пароля отправлена по адресу:
        <span class="red">{{ email }}</span
        >. Пожалуйста, нажмите на ссылку в письме, чтобы продолжить.
      </div>
      <button v-if="!send" @click="reset" class="btn">Сбросить пароль</button>
      <button v-if="send" @click="this.$emit('updateReset', false)" class="btn">
        Понятно
      </button>
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
  width: 450px;
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

.red {
  color: #cf0032;
}

.card:hover {
  cursor: auto;
  transform: none;
}
</style>

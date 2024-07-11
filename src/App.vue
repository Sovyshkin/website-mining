<script>
import AppHeader from "./components/AppHeader.vue";
import Block_1 from "./components/Block_1.vue";
import Calculator from "./components/BlockCalculator.vue";
import Equipment from "./components/BlockEquipment.vue";
import Banner_1 from "./components/Banner_1.vue";
import Advantages from "./components/BlockAdvantages.vue";
import Business from "./components/BlockBusiness.vue";
import Faq from "./components/BlockFaq.vue";
import Banner_2 from "./components/Banner_2.vue";
import GoTry from "./components/GoTry.vue";
import AppLogin from "./components/AppLogin.vue";
import AppRegister from "./components/AppRegister.vue";
import ResetPassword from "./components/ResetPassword.vue";
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    AppHeader,
    Block_1,
    Calculator,
    Equipment,
    Banner_1,
    Business,
    Faq,
    Banner_2,
    Advantages,
    GoTry,
    AppLogin,
    AppRegister,
    ResetPassword,
    RouterView,
  },
  data() {
    return {
      gotry: false,
      login: false,
      register: false,
      reset: false,
    };
  },
  methods: {
    handleTry(gotry) {
      this.gotry = gotry;
    },
    handleLogin(login) {
      this.gotry = false;
      this.login = login;
    },
    handleRegister(register) {
      this.login = false;
      this.gotry = false;
      this.register = register;
    },
    handleReset(reset) {
      this.login = false;
      this.gotry = false;
      this.register = false;
      this.reset = reset;
    },
    checkRoute() {
      if (this.$route.fullPath == "/") {
        return true;
      }
      return false;
    },
  },
  mounted() {},
};
</script>
<template>
  <div class="wrap" v-if="checkRoute()">
    <ResetPassword @updateReset="handleReset" v-if="reset" />
    <AppRegister @updateRegister="handleRegister" v-if="register" />
    <AppLogin
      @updateLogin="handleLogin"
      @updateRegister="handleRegister"
      @updateReset="handleReset"
      v-if="login"
    />
    <GoTry
      @updateGoTry="handleTry"
      @updateRegister="handleRegister"
      @updateLogin="handleLogin"
      v-if="gotry"
    />
    <AppHeader @updateLogin="handleLogin" />
    <Block_1 />
    <Calculator />
    <Equipment @updateGoTry="handleTry" id="equipment" />
    <Banner_1 />
    <Advantages />
    <Business id="business" />
    <Faq id="faq" />
    <Banner_2 />
  </div>
  <div class="wrap" v-else>
    <ResetPassword @updateReset="handleReset" v-if="reset" />
    <AppRegister @updateRegister="handleRegister" v-if="register" />
    <AppLogin
      @updateLogin="handleLogin"
      @updateRegister="handleRegister"
      @updateReset="handleReset"
      v-if="login"
    />
    <GoTry
      @updateGoTry="handleTry"
      @updateRegister="handleRegister"
      @updateLogin="handleLogin"
      v-if="gotry"
    />
    <AppHeader @updateLogin="handleLogin" />
    <RouterView />
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap");
#app {
  font-family: "Manrope", sans-serif;
  width: 100%;
}
* {
  padding: 0px;
  margin: 0px;
  border: none;
  font-weight: 400;
  font-style: normal;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.wrap {
  display: flex;
  flex-direction: column;
}

body,
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f5;
}

/* Links */

a,
a:link,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
  display: block;
}

ul,
ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

/* Form */

input,
textarea,
button,
select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
}

input::-ms-clear {
  display: none;
}

button,
input[type="submit"] {
  display: inline-block;
  box-shadow: none;
  background-color: transparent;
  background: none;
  cursor: pointer;
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
  box-shadow: none;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.card {
  transition: all 500ms ease;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.06);
  box-shadow: 0 0 10px 0 #00000037;
}
</style>

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
import LeftPanel from "./components/LeftPanel.vue";
import BottomPanel from "./components/BottomPanel.vue";
import DeleteWallet from "./components/DeleteWallet.vue";
import DeleteAuth from "./components/DeleteAuth.vue";
import { RouterView } from "vue-router";
import SliderImg from "./components/SliderImg.vue";
import ChangeAvatar from "./components/ChangeAvatar.vue";
import FormFeedback from "./components/FormFeedback.vue";
import AppFooter from "./components/AppFooter.vue";

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
    LeftPanel,
    BottomPanel,
    DeleteWallet,
    SliderImg,
    ChangeAvatar,
    DeleteAuth,
    FormFeedback,
    AppFooter,
  },
  data() {
    return {
      gotry: false,
      login: false,
      register: false,
      reset: false,
      deleteWallet: false,
      slider: false,
      avatar: false,
      deleteAuth: false,
      formFeedback: false,
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
    handleDelete(deleteWallet) {
      this.deleteWallet = deleteWallet;
    },

    handleDeleteAuth(deleteAuth) {
      this.deleteAuth = deleteAuth;
    },

    handleAvatar(avatar) {
      this.avatar = avatar;
    },

    handleSlider(slider) {
      this.slider = slider;
    },
    handleFormFeedback(form) {
      this.formFeedback = form;
    },

    sliderVerify(slider) {
      this.login = slider;
      this.slider = true;
    },
    checkRoute() {
      if (this.$route.fullPath == "/") {
        return true;
      }
      return false;
    },

    pass() {
      console.log("Тут");
    },
  },
  mounted() {},
};
</script>
<template>
  <div class="wrap" v-if="checkRoute()" style="align-items: center">
    <FormFeedback
      v-if="formFeedback"
      @updateFormFeedback="handleFormFeedback"
    />
    <SliderImg
      v-if="slider"
      @updateSlider="handleSlider"
      @sliderVerify="sliderVerify"
    />
    <ResetPassword @updateReset="handleReset" v-if="reset" />
    <AppRegister @updateRegister="handleRegister" v-if="register" />
    <AppLogin
      @updateLogin="handleLogin"
      @updateRegister="handleRegister"
      @updateReset="handleReset"
      @sliderVerify="sliderVerify"
      v-if="login"
    />
    <GoTry
      @updateGoTry="handleTry"
      @updateRegister="handleRegister"
      @updateLogin="handleLogin"
      v-if="gotry"
    />
    <AppHeader @updateLogin="handleLogin" />
    <Block_1
      @updateLogin="handleLogin"
      @updateFormFeedback="handleFormFeedback"
      style="max-width: 1440px"
    />
    <Calculator @updateGoTry="handleTry" style="max-width: 1440px" />
    <Equipment
      style="max-width: 1440px"
      @updateGoTry="handleTry"
      id="equipment"
    />
    <Banner_1
      style="max-width: 1440px"
      @updateFormFeedback="handleFormFeedback"
    />
    <Advantages style="max-width: 1440px" id="advantages" />
    <Business
      @updateLogin="handleLogin"
      style="max-width: 1440px"
      id="business"
    />
    <Faq @updateLogin="handleLogin" style="max-width: 1440px" id="faq" />
    <Banner_2 @updateLogin="handleLogin" style="max-width: 1440px" />
    <AppFooter />
  </div>
  <div
    class="wrap more"
    v-else-if="
      this.$route.fullPath == '/404' || this.$route.name == 'controlreset'
    "
  >
    <SliderImg
      v-if="slider"
      @sliderVerify="sliderVerify"
      @updateSlider="handleSlider"
    />
    <ResetPassword @updateReset="handleReset" v-if="reset" />
    <AppRegister @updateRegister="handleRegister" v-if="register" />
    <AppLogin
      @updateLogin="handleLogin"
      @updateRegister="handleRegister"
      @updateReset="handleReset"
      @sliderVerify="sliderVerify"
      v-if="login"
    />
    <GoTry
      @updateGoTry="handleTry"
      @updateRegister="handleRegister"
      @updateLogin="handleLogin"
      v-if="gotry"
    />
    <AppHeader @updateLogin="handleLogin" @updateSlider="handleSlider" />
    <RouterView />
    <AppFooter />
  </div>
  <div class="wrap market" v-else>
    <ChangeAvatar @updateAvatar="handleAvatar" v-if="avatar" />
    <LeftPanel class="leftPanel" />
    <BottomPanel class="bottomPanel" />
    <DeleteWallet @updateDeleteWallet="handleDelete" v-if="this.deleteWallet" />
    <DeleteAuth @updateDeleteAuth="handleDeleteAuth" v-if="this.deleteAuth" />
    <main class="marketplace">
      <AppHeader :login="true" />
      <RouterView
        @updateDeleteWallet="handleDelete"
        @updateDeleteAuth="handleDeleteAuth"
        @updateAvatar="handleAvatar"
      />
      <AppFooter />
    </main>
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
  scroll-behavior: smooth;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin: 0 auto;
}

.market,
.more {
  width: 100%;
  max-width: none;
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

.market {
  flex-direction: row;
}

.marketplace {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

.bottomPanel {
  display: none;
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
  background-color: #3cca0d;
}

.error {
  background-color: #cf0032;
}

.bx,
.btn {
  transition: all 500ms ease;
}

.bx:hover,
.btn:hover {
  box-shadow: 0 0 10px 0 #00000037;
}
@media (max-width: 768px) {
  .leftPanel {
    display: none;
  }

  .bottomPanel {
    display: block;
  }

  .marketplace {
    width: 100%;
    padding-bottom: 80px;
  }
}

@media (max-width: 420px) {
  .wrapper {
    margin-top: 0 !important;
    padding: 20px !important;
  }
}
</style>

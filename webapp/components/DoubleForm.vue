<template>
  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <SignUp/>
    </div>
    <div class="form-container sign-in-container">
      <SignIn/>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Bienvenu</h1>
          <button class="ghost" id="signIn" @click="removeClassList">Se Connecter</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Salut !</h1>
          <button class="ghost" id="signUp" @click="addClassList">S'inscrire</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SignIn from "./SignIn";
import SignUp from "./SignUp";
export default {
  methods: {
    addClassList() {
      document.getElementById("container").classList.add("right-panel-active");
    },
    removeClassList() {
      document
        .getElementById("container")
        .classList.remove("right-panel-active");
      scroll(0, 0);
    }
  },
  components: { SignUp, SignIn }
};
</script>

<style scoped>
@media only screen and (min-width: 1366px) {
  .container {
    height: 1100px !important;
  }
}
.container {
  background-color: #ffffff;
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 1000px;
  overflow: hidden;
}
.form-container {
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
  text-align: center;
  max-width: 100%;
  padding: 50px 10px;
  line-height: 10px;
  text-transform: uppercase;
  font-size: 0.5em;
  font-weight: 600;
  letter-spacing: 1px;
  background-color: white !important;
  overflow: hidden;
}
.overlay-container {
  position: fixed;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}
.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
.overlay-right {
  right: 0;
  transform: translateX(0);
}
.overlay-left {
  transform: translateX(-20%);
}
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}
.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
.container.right-panel-active .overlay {
  transform: translateX(50%);
}
.container.right-panel-active .overlay-left {
  transform: translateX(0);
}
.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}
button:active {
  transform: scale(0.95);
}
button:focus {
  outline: none;
}
h1 {
  font-weight: bold;
  margin: 0;
  font-size: 25px;
}
p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}
button {
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}
button:hover {
  opacity: 0.7;
  transition: 0.4s;
}
</style>
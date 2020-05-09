<template>
  <div>
    <div class="bg"></div>
  </div>
</template>
<script>
export default {
  beforeMount() {
    console.log(localStorage.token);
  }
};
</script>
<style scoped>
.bg {
  background-image: url("http://face-grandlyon.com/wp-content/uploads/2018/07/Image-Une-Article-projet-Bienvenu.e.s.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  width: 100%;
  height: 100vh;
}
</style>

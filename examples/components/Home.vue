<template>
  <div class="home">
    <ul class="page-nav">
      <li><router-link to="/form">Form</router-link></li>
      <li><router-link to="/cell">Cell</router-link></li>
      <li><router-link to="/button">Button</router-link></li>
      <li><router-link to="/loading">loading</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss">
.home {
  min-height: 100vh;
  background-color: #fff;
  .page-nav{
    margin: 0;
    padding-top: 40px;
    li{
      margin: 10px 0;
    }
  }
}
</style>

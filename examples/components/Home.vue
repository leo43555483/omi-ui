<template>
  <div class="home">
    <ul class="page-nav">
      <template v-for="item in routes" >
        <li v-if="item.name !== 'home'" :key="item.name">
          <router-link :to="item.path">{{item.name}}</router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
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

<template>
  <div class="home">
    <div class="page-nav">
      <template v-for="item in routes" >
        <omi-cell
          :title="item.name"
          clickable
          rightArrow
          v-if="item && item.name !== 'home'"
          :key="item.name"
          :to="item.path"
        >
          <span slot="title">{{item.name}}</span>
        </omi-cell>
      </template>
    </div>
  </div>
</template>
<script>
import { Cell } from 'omi'
export default {
  name: 'Home',
  components: {
    [Cell.name]: Cell
  },
  computed: {
    routes () {
      return this.$router.options.routes
    }
  }
}
</script>

<style lang="scss">
.home {
  min-height: 100vh;
  background-color: #fff;
  .page-nav{
    padding-top: 40px;
  }
}
</style>

<template>
  <div class="page-layout" >
    <nav-bar :title="title" left="返回" @clickLeft="onClickLeft"/>
    <slot></slot>
  </div>
</template>

<script>
import { NavBar } from 'omi'

export default {
  name: 'layOut',
  methods: {
    onClickLeft () {
      this.$router.replace({ name: 'home' })
    }
  },
  computed: {
    title () {
      return this.$route.name
    }
  },
  components: {
    NavBar: NavBar
  }
}
</script>

<style lang="scss">
  .page-layout{
    min-height: 100vh;
  }
</style>

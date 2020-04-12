<template>
  <div class="page-layout" >
    <nav-bar :title="title" left="返回" @clickLeft="onClickLeft"/>
    <slot></slot>
  </div>
</template>

<script>
import NavBar from '../../package/nav-bar';

export default {
  name: 'layOut',
  methods: {
    onClickLeft() {
      this.$router.replace({ name: 'home' });
    },
  },
  computed: {
    title() {
      return this.$route.name;
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style>

</style>

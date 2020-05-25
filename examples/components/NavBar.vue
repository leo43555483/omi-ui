<template>
  <div class="demo-nav-bar">
    <omi-nav-bar
      title="导航栏"
      left="首页"
      right="编辑"
      @clickLeft="onClickLeft"
      @clickRight="clickRight"
    ></omi-nav-bar>
    <omi-nav-bar
      title="导航栏"
      left="首页"
      @clickLeft="onClickLeft"
    >
      <template #right>
        <div class="demo-nav-bar__right">
          <omi-icon type="search"></omi-icon>
        </div>
      </template>
    </omi-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'DemoNavBar',
  methods: {
    clickRight() {
      this.$toast('编辑');
    },
    onClickLeft() {
      this.$router.replace('/');
    },
  },
};
</script>

<style>

</style>

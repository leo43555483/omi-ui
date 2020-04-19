<template>
  <div class="demo-toast">
    <div class="demo-item">
      <omi-button @click="() => onClick('loading')">加载中</omi-button>
    </div>
    <div class="demo-item">
      <omi-button @click="() => onClick('success')">success</omi-button>
    </div>
    <div class="demo-item">
      <omi-button @click="() => onClick('error')">error</omi-button>
    </div>
    <div class="demo-item">
      <omi-button @click="() => onOpenText('text')">text</omi-button>
    </div>
    <div class="demo-item">
      <omi-button @click="onOpenHtml">html</omi-button>
    </div>
    <div class="demo-item">
      <omi-button @click="onCancel">取消</omi-button>
    </div>
    <!-- <div class="demo-item">
      <omi-button @click="onCloseAll">closeAll</omi-button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'DemoToast',
  methods: {
    onOpenText() {
      this.toast = this.$toast({
        content: 'textetxt',
        icon: 'mail',
      });
    },
    onOpenHtml() {
      this.toast = this.$toast({
        type: 'html',
        content: '<div>testhtml</div>',
      });
    },
    onCloseAll() {
      this.$toast.closeAll();
    },
    onClick(type) {
      this.toast = this.$toast[type]({
        content: 'toast',
        onClose() {
          console.log(`close ${type}`);
        },
        onOpen() {
          console.log(`open ${type}`);
        },
      });
    },
    onCancel() {
      // if (this.toast) this.toast.close();
      this.$toast.close();
    },
  },
  mounted() {
    // this.$toast.single(false);
    // this.$toast.setOptions({
    //   durations: 1000,
    //   clickClose: true,
    // });
    this.$toast.setOptions('loading', {
      durations: 1000,
      clickClose: true,
    });
  },
};
</script>

<style lang="scss">
</style>

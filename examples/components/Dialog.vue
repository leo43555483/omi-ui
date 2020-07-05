<template>
  <div class="demo-dialog">
    <div class="demo-item">
      <omi-button block @click="onClick">基本用法</omi-button>
      <omi-button block @click="onClick1">异步确认</omi-button>
      <omi-button block @click="onClick3">prompt</omi-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoDialog',
  methods: {
    onClick3() {
      this.$dialog.prompt({
        title: 'promp',
        cancelText: '取消',
        confirmText: '确认',
        prompt: {
          placeholder: '请输入电子邮箱',
          value: '',
          rules: [{
            type: 'email', required: true, message: '请输入邮箱地址', trigger: 'change',
          }],
        },
        onConfirm: (err, value) => new Promise((r) => {
          console.log('onConfirm', err, value);
          if (err) return;
          r();
        }),
      });
    },
    onClick1() {
      this.$dialog.confirm({
        title: 'dialog',
        content: '我是一个dialog,哈哈哈',
        cancelText: '取消',
        confirmText: '确认',
        onConfirm: () => {
          const loading = this.$toast.loading();
          return new Promise((r) => {
            setTimeout(() => {
              r();
              loading.close();
            }, 2000);
          });
        },
      });
    },
    onClick() {
      this.$dialog({
        title: 'dialog',
        content: '我是一个dialog,哈哈哈',
        cancelText: '取消',
        confirmText: '确认',
      });
    },
  },
};
</script>

<style lang="scss">
.demo-dialog {
  .omi-btn {
    margin-top: 10px;
  }
}
</style>

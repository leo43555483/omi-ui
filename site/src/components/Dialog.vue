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
import Vue from 'vue'
import { Button, Dialog } from 'omi'
Vue.use(Dialog)
export default {
  name: 'DemoDialog',
  methods: {
    onClick3 () {
      this.$dialog.prompt({
        title: 'promp',
        cancelText: '取消',
        confirmText: '确认',
        prompt: {
          placeholder: '请输入电子邮箱',
          value: '',
          rules: [{
            type: 'email', required: true, message: '请输入邮箱地址', trigger: 'change'
          }]
        },
        onConfirm: (err, value) => new Promise((resolve, reject) => {
          console.log('onConfirm', err, value)
          if (err) return false
          resolve()
        })
      })
    },
    onClick1 () {
      this.$dialog.confirm({
        title: 'dialog',
        content: '我是一个dialog,哈哈哈',
        cancelText: '取消',
        confirmText: '确认',
        onConfirm: () => {
          const loading = this.$toast.loading()
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve()
              loading.close()
            }, 2000)
          })
        }
      })
    },
    onClick () {
      this.$dialog({
        title: 'dialog',
        content: '我是一个dialog,哈哈哈',
        cancelText: '取消',
        confirmText: '确认'
      })
    }
  },
  components: {
    [Button.name]: Button
  }
}
</script>

<style lang="scss">
.demo-item{
  padding: 0 16px;
}
.demo-dialog {
  .omi-btn {
    margin-top: 10px;
  }
}
</style>

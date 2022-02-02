<template>
  <div class="demo-swipe-action">
    <omi-swipe-action
      v-for="(item, i) in list"
      :key="item.key"
      :autoClose="autoClose"
      :text="item.title"
    >
      <div>{{item.title}}{{i}}</div>
        <template slot="left">
          <div class="custom-action info">info</div>
          <div class="custom-action replay">replay</div>
        </template>
        <template slot="right">
          <div class="custom-action remove">remove</div>
          <div class="custom-action cancel">cancel</div>
        </template>
        <div slot="extra">more</div>
    </omi-swipe-action>
  </div>
</template>

<script>
import { SwipeAction } from 'omi'
export default {
  name: 'DemoSwipeAction',
  data () {
    return {
      list: []
    }
  },
  components: {
    [SwipeAction.name]: SwipeAction
  },
  methods: {
    autoClose (e, close) {
      this.$dialog.confirm({
        title: '是否关闭',
        cancelText: '取消',
        confirmText: '确认',
        onConfirm () {
          console.log('onConfrim')
          close()
        }
      })
    }
  },
  mounted () {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 100; i++) {
      this.list.push({ title: 'Apple Banana Orange', key: `title${i}` })
    }
  }
}
</script>

<style lang="scss">
.custom-action{
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  color:#fff
}
.replay{
  background-color: #629dff;
}
.info{
  background-color:#dbdb4b;
}
.remove{
  background-color: rgb(244, 51, 60);
}
.cancel {
  background-color: #2c3e50;
}
</style>

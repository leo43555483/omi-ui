<template>
  <div class="demo-collapse">
    <omi-collapse v-model="list">
      <omi-collapse-item name="a" title="标题1" disable>
        内容1
      </omi-collapse-item >
      <omi-collapse-item name="b" title="标题2">
        <div>
          1内容1内容1内容1内容1内容1内容1内容1内容1
          1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内
          内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容容
        </div>
      </omi-collapse-item>
      <omi-collapse-item name="c" title="标题3">
        内容3
      </omi-collapse-item>
      <omi-collapse-item name="d" title="标题4">
        内容4
      </omi-collapse-item>
    </omi-collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from 'omi'
export default {
  name: 'DemoCollapse',
  data () {
    return {
      list: ['a']
    }
  },
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem

  }
}
</script>

<style lang="scss">
.demo-collapse{
  padding: 20px 0;
}
</style>

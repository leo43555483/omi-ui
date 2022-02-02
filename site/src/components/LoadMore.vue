<template>
  <div class="demo-loading-more">
    <omi-load-more
      loading-text="加载中。。。"
      finished-text="这是底线~~"
      error-text="点击重新加载"
      immediate
      :loading="loading"
      :finished="finished"
      @load="onLoad"
      :error.sync="error"
    >
      <omi-cell-group title="loadMore">
        <omi-cell v-for="item in list" :key="item">
          <div class="demo-list__item" slot="content">{{item}}</div>
        </omi-cell>
      </omi-cell-group>
    </omi-load-more>
  </div>
</template>

<script>
import { Cell, CellGroup, LoadMore } from 'omi'

const generateData = (j) => {
  const data = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 20; i++) {
    data.push(`item${j + i}`)
  }
  return data
}
export default {
  name: 'DemoLoadMore',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      loadingCount: 0
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [LoadMore.name]: LoadMore
  },
  methods: {
    onLoad () {
      this.loading = true
      setTimeout(() => {
        const { list, loadingCount } = this
        const { length } = list
        this.loadingCount += 1
        if (loadingCount === 1) {
          this.error = true
          return
        }
        this.list = list.concat(generateData(length - 1))
        this.loading = false
        if (length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.demo-loading-more{
  .demo-list__item{
    flex: 1;
    text-align: center;
  }
}
</style>

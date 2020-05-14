<template>
  <div class="demo-pull-refresh">
    <omi-button block @click="onClick">刷新</omi-button>
    <omi-pull-refresh v-model="refreshing" @refresh="onFresh" :headerHeight="40" :threshold="40">
      <template #success>
        <div >
          共刷新{{list.length}}条数据
        </div>
      </template>
      <omi-load-more
        loading-text="加载中。。。"
        finished-text="这是底线~~"
        immediate
        :loading="loading"
        :finished="finished"
        @load="onLoad">
        <omi-cell-group>
          <omi-cell v-for="item in list" :key="item">
            <div class="demo-list__item" slot="content">{{item}}</div>
          </omi-cell>
        </omi-cell-group>
      </omi-load-more>
    </omi-pull-refresh>
  </div>
</template>

<script>
const generateData = (j) => {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 20; i++) {
    data.push(`item${j + i}`);
  }
  return data;
};
export default {
  name: 'DemoPullRefresh',
  data() {
    return {
      refreshing: false,
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onClick() {
      this.refreshing = true;
    },
    onFresh() {
      setTimeout(() => {
        this.refreshing = false;
        this.finished = false;
        this.list = generateData(100);
      }, 1000);
    },
    onLoad() {
      this.loading = true;
      setTimeout(() => {
        const { list } = this;
        const { length } = list;
        if (length >= 40) {
          this.finished = true;
        } else {
          this.list = list.concat(generateData(length - 1));
        }
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.demo-pull-refresh{
  .demo-list__item{
    flex: 1;
    text-align: center;
  }
}
</style>

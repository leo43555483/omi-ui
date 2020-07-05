# OmiPullRefresh

## 安装

```js
import { PullRefresh } from 'omiui';
//or
import { PullRefresh } from 'omiui';
Vue.use(PullRefresh);
```

## 使用

### 基础用法

```html
<omi-pull-refresh v-model="refreshing" @refresh="onFresh">
  <template #success>
    <div>
      共刷新{{list.length}}条数据
    </div>
  </template>
  <omi-cell v-for="item in list" :key="item">
    <div class="demo-list__item" slot="content">{{item}}</div>
  </omi-cell>
</omi-pull-refresh>
<script>
  const generateData = j => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push(`item${j + i}`);
    }
    return data;
  };
  export default {
    data() {
      return {
        refreshing: false,
      };
    },
    methods: {
      onFresh() {
        setTimeout(() => {
          this.refreshing = false;
          this.finished = false;
          this.list = generateData(100);
        }, 1000);
      },
    },
  };
</script>
```

### 点击刷新

```html
<div>
  <omi-button block @click="onClick">刷新</omi-button>
  <omi-pull-refresh v-model="refreshing" @refresh="onFresh">
    <omi-cell v-for="item in list" :key="item">
      <div class="demo-list__item" slot="content">{{item}}</div>
    </omi-cell>
  </omi-pull-refresh>
</div>
<script>
  export default {
    data() {
      return {
        refreshing: false,
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
    },
  };
</script>
```

### 配合 _< load-more />_ 一起使用

```html
<omi-pull-refresh v-model="refreshing" @refresh="onFresh" :headerHeight="40" :threshold="40">
  <template #success>
    <div>
      共刷新{{list.length}}条数据
    </div>
  </template>
  <omi-load-more
    loading-text="加载中。。。"
    finished-text="这是底线~~"
    immediate
    :loading="loading"
    :finished="finished"
    @load="onLoad"
  >
    <omi-cell-group>
      <omi-cell v-for="item in list" :key="item">
        <div class="demo-list__item" slot="content">{{item}}</div>
      </omi-cell>
    </omi-cell-group>
  </omi-load-more>
</omi-pull-refresh>
```

## Props

| name              | type    | default | description                                                          |
| ----------------- | ------- | ------- | -------------------------------------------------------------------- |
| headerPosition    | String  |         | 下拉时顶部展示区的位置, 可选值['top']，不设置此项时会固定顶部展示区. |
| headerHeight      | Number  | 84      | 下拉时顶部展示区的高度.                                              |
| disable           | Boolean | false   | 是否禁用下拉刷新.                                                    |
| refreshing        | Boolean | false   | 是否触发刷新动作,为 true 触发刷新状态.                               |
| threshold         | Number  | 84      | 下拉阈值                                                             |
| duration          | Number  | 400     | 动画执行的时间.                                                      |
| overThresholdText | String  |         | 下拉超过阈值后的文案.                                                |
| successText       | String  |         | 刷新成功文案.                                                        |
| refreshingText    | String  |         | 正在刷新时的文案.                                                    |
| losingText        | String  |         | 释放下拉时的文案.                                                    |
| pullingText       | String  |         | 下拉时的文案.                                                        |
| successDuration   | Number  | 400     | 刷新成功文案展示的时间.                                              |

## Events

| name    | params              | description |
| ------- | ------------------- | ----------- |
| input   | refreshing: Boolean | -           |
| refresh | -                   | -           |

## Slots

| name           | props    | description             |
| -------------- | -------- | ----------------------- |
| default        | -        |                         |
| success        | -        | 下拉成功时展示.         |
| refreshing     | -        | 正在刷新时展示.         |
| over-threshold | -        | 下拉距离超过阈值后展示. |
| pulling        | distance | 下拉时展示.             |

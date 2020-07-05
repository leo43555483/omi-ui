# OmiLoadMore

## 安装

```js
import { LoadMore } from 'omiui';
//or
import { LoadMore } from 'omiui';
Vue.use(LoadMore);
```

## 使用

### 基本用法

```html
<omi-load-more loading-text="加载中。。。" :loading="loading" :finished="finished">
  <omi-cell-group title="loadMore">
    <omi-cell v-for="item in list" :key="item">
      <div class="demo-list__item" slot="content">{{item}}</div>
    </omi-cell>
  </omi-cell-group>
</omi-load-more>
<script>
  const generateData = j => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 20; i++) {
      data.push(`item${j + i}`);
    }
    return data;
  };
  export default {
    name: 'DemoLoadMore',
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
      };
    },
    methods: {
      onLoad() {
        this.loading = true;
        setTimeout(() => {
          const { list, loadingCount } = this;
          const { length } = list;
          this.loadingCount += 1;
          if (loadingCount === 1) {
            this.error = true;
            return;
          }
          this.list = list.concat(generateData(length - 1));
          this.loading = false;
          if (length >= 40) {
            this.finished = true;
          }
        }, 1000);
      },
    },
  };
</script>
```

### 点击重新加载

```html
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
<script>
  const generateData = j => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 20; i++) {
      data.push(`item${j + i}`);
    }
    return data;
  };
  export default {
    name: 'DemoLoadMore',
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        error: false,
        loadingCount: 0,
      };
    },
    methods: {
      onLoad() {
        this.loading = true;
        setTimeout(() => {
          const { list, loadingCount } = this;
          const { length } = list;
          this.loadingCount += 1;
          if (loadingCount === 1) {
            this.error = true;
            return;
          }
          this.list = list.concat(generateData(length - 1));
          this.loading = false;
          if (length >= 40) {
            this.finished = true;
          }
        }, 1000);
      },
    },
  };
</script>
```

## Props

| name         | type          | default | description                                              |
| ------------ | ------------- | ------- | -------------------------------------------------------- |
| handleError  | Function      | -       | 当 error 为 true 时，点击底部提示时触发.                 |
| error        | Boolean       | false   | 加载出错.                                                |
| errorText    | String        |         | 错误提示文案.                                            |
| immediate    | Boolean       | false   | 初次是否立即触发加载.                                    |
| finishedText | String        |         | 加载完全部时的提示文案.                                  |
| loadingSize  | String Number | 18      | loading 图标尺寸.                                        |
| finished     | Boolean       | false   | 是否已加载完全部. 当已加载完所有内容后应设为 ture.       |
| loading      | Boolean       | false   | 是否正在加载中.                                          |
| offset       | Number        | 10      | 页面底部到可视区底部距离为 offset 时触发加载，单位为 px. |
| loadingText  | String        |         | 加载中文案.                                              |

## Events

| name         | params | description |
| ------------ | ------ | ----------- |
| update:error | -      | -           |
| load         | -      | -           |

## Events

| name      | description |
| --------- | ----------- |
| default   |             |
| load-more | 底部提示区. |

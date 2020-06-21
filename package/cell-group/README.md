# OmiCellGroup

## 安装

```js
import { CellGroup } from 'omiui';
//or
import { CellGroup } from 'omiui';
Vue.use(CellGroup);
```

## 基础用法

```html
<omi-cell-group title="cell group" description="cell group description">
  <omi-cell title="标题1" title-width="90">
    <omi-input slot="content" placeholder="自定义title宽度" />
    <template slot="extra">
      <omi-button size="mini">button</omi-button>
    </template>
  </omi-cell>
</omi-cell-group>
```

## Props

| name        | type   | default | description |
| ----------- | ------ | ------- | ----------- |
| title       | String |         | 组标题.     |
| description | String |         | 组描述.     |

## Slots

| name    | description |
| ------- | ----------- |
| default | -           |

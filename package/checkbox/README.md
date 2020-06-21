# OmiCheckbox

## 安装

```js
import { Checkbox } from 'omiui';
//or
import { Checkbox } from 'omiui';
Vue.use(Checkbox);
```

## 使用

### 基础用法

```html
<omi-checkbox v-model="check" text="选择"></omi-checkbox>
```

### 与 _< checkbox-group />_ 一起使用

```html
<omi-checkbox-group v-model="model">
  <omi-checkbox v-for="item in list" :prop="item" :key="item" text="checkbox" />
</omi-checkbox-group>
<script>
  export default {
    data() {
      return {
        model: ['a', 'b'],
      };
    },
  };
</script>
```

### 与 _< cell />_ 一起使用

```html
<omi-checkbox-group v-model="result">
  <omi-cell-group title="配合cell使用">
    <omi-cell clickable>
      <omi-checkbox slot="icon-left" v-model="checkAll2" indeterminate text="全选" />
    </omi-cell>
    <omi-cell
      v-for="(item,index) in list2"
      :key="item"
      clickable
      title="checkbox"
      @click="() => onClick(index)"
    >
      <template slot="extra">
        <omi-checkbox :prop="item" ref="checkItem" />
      </template>
    </omi-cell>
  </omi-cell-group>
</omi-checkbox-group>
<script>
  export default {
    data() {
      return {
        model: ['a', 'b'],
      };
    },
    methods: {
      onClick(index) {
        this.$refs.checkItem[index].check();
      },
    },
  };
</script>
```

## Props

| name          | type                  | default | description                                                              |
| ------------- | --------------------- | ------- | ------------------------------------------------------------------------ |
| indeterminate | Boolean               | false   | 在 checkbox-group 中作为装饰模式使用(选中后值不会添加到 _group_ 结果中). |
| activeColor   | String                | -       | 选中时的颜色.                                                            |
| disable       | Boolean               | false   | 是否禁用.                                                                |
| prop          | String Number Boolean | -       | 当前选项的值.                                                            |
| value         | Boolean               | false   | 是否选中当前.                                                            |
| text          | String                |         | 选择框后面跟随的文本.                                                    |
| size          | String Number         | -       | 尺寸.                                                                    |
| square        | Boolean               | false   | 是否以方形显示选择框.                                                    |

## Methods

| name  | params  | return | description   |
| ----- | ------- | ------ | ------------- |
| check | Boolean | -      | 是否选中当前. |

## Event

| name   | params  | description |
| ------ | ------- | ----------- |
| change | checked | -           |
| input  | value   | -           |

## Slots

| name    | description       |
| ------- | ----------------- |
| default |                   |
| icon    | 选择框 icon 插槽. |

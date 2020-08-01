# OmiPicker

## 安装

```js
import { Picker } from 'omiui';
//or
import { Picker } from 'omiui';
Vue.use(Picker);
```

## 使用

### 基础用法

```html
<template>
  <div class="omi-picker-demo">
    <div class="demo-item">
      <omi-picker ref="picker1" :data="colums" :onConfirm="onConfirm"></omi-picker>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        colums: [
          [
            { label: '珠海', value: 'zhuhai' },
            { label: '潮州', value: 'chaozhou' },
            { label: '汕头', value: 'shantou' },
            { label: '东莞', value: 'dongguan' },
            { label: '汕尾', value: 'shanwei' },
            { label: '揭阳', value: 'jieyang' },
            { label: '肇庆', value: 'zhaoqing' },
          ],
          [{ label: '东莞', value: 'dongguan' }, { label: '汕尾', value: 'shanwei' }],
          [{ label: '揭阳', value: 'jieyang' }, { label: '肇庆', value: 'zhaoqing' }],
        ],
      };
    },
    methods: {
      onConfirm() {
        const result = this.$refs.picker.getValues();
      },
    },
  };
</script>
```

### 级联选择

```html
<template>
  <div class="omi-picker-demo">
    <div class="demo-item">
      <omi-picker :data="colums" cascade :onConfirm="onConfirm"></omi-picker>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        colums: [
          {
            label: '广州',
            value: 'guangzhou',
            children: [
              { label: '番禺', value: 'panyu', children: [{ label: '新安街道', value: 'xinan' }] },
              { label: '天河', value: 'tianhe', children: [] },
            ],
          },
          { label: '珠海', value: 'zhuhai', children: [{ children: [{}] }] },
          { label: '东莞', value: 'dongguan', children: [{ children: [{}] }] },
          {
            label: '揭阳',
            value: 'jieyang',
            children: [
              { label: '龙岗', value: 'longgang', children: [{}] },
              { label: '南山', value: 'nanshan', children: [{}] },
            ],
          },
          {
            label: '深圳',
            value: 'shenzhen',
            children: [
              {
                label: '宝安',
                value: 'baoan',
                children: [
                  { label: '西乡街道', value: 'xixiang' },
                  { label: '新安街道', value: 'xinan' },
                ],
              },
              { label: '南山', value: 'nanshan', children: [{}] },
            ],
          },
        ],
      };
    },
    methods: {
      onConfirm() {
        const result = this.$refs.picker.getValues();
      },
    },
  };
</script>
```

### 动态设置值

```html
<template>
  <div class="omi-picker-demo">
    <div class="demo-item">
      <omi-picker
        ref="picker1"
        cascade
        :data="colums"
        @change="onChange"
        :onConfirm="onConfirm"
      ></omi-picker>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OmiPickerDemo',
    data() {
      return {
        colums: [
          {
            label: '广州',
            value: 'guangzhou',
            children: [
              { label: '番禺', value: 'panyu', children: [{ label: '新安街道', value: 'xinan' }] },
              { label: '天河', value: 'tianhe', children: [] },
            ],
          },
          { label: '珠海', value: 'zhuhai', children: [{ children: [{}] }] },
          { label: '东莞', value: 'dongguan', children: [{ children: [{}] }] },
          {
            label: '揭阳',
            value: 'jieyang',
            children: [
              { label: '龙岗', value: 'longgang', children: [{}] },
              { label: '南山', value: 'nanshan', children: [{}] },
            ],
          },
          {
            label: '深圳',
            value: 'shenzhen',
            children: [
              {
                label: '宝安',
                value: 'baoan',
                children: [
                  { label: '西乡街道', value: 'xixiang' },
                  { label: '新安街道', value: 'xinan' },
                ],
              },
              { label: '南山', value: 'nanshan', children: [{}] },
            ],
          },
        ],
      };
    },
    methods: {
      onChange(values, columIndex) {
        const [city] = values;
        if (city === 'dongguan' && columIndex === 0) {
          const fresh = [].concat(this.colums2[2]);
          this.$refs.picker.updateColum(fresh, 0);
          this.$refs.picker.setValues('shantou', 1);
        } else if (columIndex === 0) {
          const fresh = [].concat(this.colums2[1]);
          this.$refs.picker.updateColum(fresh, 1);
        }
      },
      onConfirm() {
        const result = this.$refs.picker.getValues();
      },
    },
  };
</script>
```

## Props

| name         | type         | default      | description                   |
| ------------ | ------------ | ------------ | ----------------------------- |
| title        | String       |              | 标题.                         |
| confirmText  | String       |              | 确认按钮文案，未设置则不显示. |
| cancelText   | String       |              | 取消按钮文案，未设置则不显示. |
| itemHeight   | Number       | 42           | 每行高度，单位为 px.          |
| duration     | Number       | 800          | 滚动效果时间.                 |
| cascade      | Boolean      | false        | 是否启用级联模式.             |
| data         | Array        |              | 详情下方说明.                 |
| valueKey     | String       |              | 根据获取value的值.       |
| labelKey     | String       |              | 根据该属性获取label的值.       |
| defaultIndex | Array Number | 0            | 默认选中值对下标.             |
| onConfirm    | Function     | function(){} | 点击确认按钮时调用.           |
| onCancel     | Function     | function(){} | 点击取消按钮时调用.           |

## Data Structure

```js
[
  //colum1
  [
    //row
    {
      label: String,
      value: Any,
      children: Array,
    }
  ],

  //colum2
  [
    //row
  ]
]
```

使用级联模式请务必保持各兄弟节点有相同的深度,若某一节点没有子节点请用`children:[]`进行占位.

## Events

| name   | params             | description |
| ------ | ------------------ | ----------- |
| change | values, columIndex |             |

## Methods

| name        | params                                   | return  | description   |
| ----------- | ---------------------------------------- | ------- | ----------------------------- |
| updateColum | colum:Array <br>columIndex:Number        | -       |  更新列数据,第一个参数为需要更新的列数据，第二个参数为需要更新的列的下标. |
| getValues   |                                          | Array   | 获取选中值，只在滚动结束后才会返回值.   |
| setValues   | values: Array\|Any<br>columIndex: Number |         | 设置选中值，如果*values*是 *Array*类型那数组中的每一为需要设置的列的值,如:`value = ['a','b','c']` 那么第一至第三列则分别选中'a','b','c'. 如果*values*非数组那么需指定需要设置的列下标作为第二个参数. |
| isScrolling |                                          | Boolean | 是否正在滚动中.  |

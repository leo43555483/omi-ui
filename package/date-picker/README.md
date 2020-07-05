# OmiDatePicker

## 安装

```js
import { DatePicker } from 'omiui';
//or
import { DatePicker } from 'omiui';
Vue.use(DatePicker);
```

## 使用

### 基础用法

```html
<omi-date-picker
  ref="datePicker"
  :currentDate="currentDate"
  title="请选择日期"
  confirmText="确定"
  cancelText="取消"
  :formatter="formatter"
  :onConfirm="() => onConfirm('datePicker')"
/>
<script>
  export default {
    name: 'DemoDatePicker',
    data() {
      return {
        currentDate: new Date(),
      };
    },
    methods: {
      formatter(type, value) {
        if (type === 'year') return `${value}年`;
        if (type === 'month') return `${value.replace(/^0/, '')}月`;
        return `${value.replace(/^0/, '')}日`;
      },
      onConfirm(type) {
        const datePicker = this.$refs[type];
        const date = datePicker.getValues().map(item => item.value);
        const isScrolling = datePicker.isScrolling();
        if (isScrolling) return;
        this.$toast(date.join(','));
        this.close(type);
      },
    },
  };
</script>
```

### 选择时间

```html
<omi-date-picker
  ref="datePicker"
  :currentDate="currentDate"
  type="time"
  title="请选择时间"
  confirmText="确定"
  cancelText="取消"
  :min="maxHour"
  :max="minHour"
/>
<script>
  export default {
    name: 'DemoDatePicker',
    data() {
      return {
        currentDate: new Date(),
        maxHour: new Date(2025, 10, 3, 20, 30),
        minHour: new Date(2000, 10, 3, 1, 20),
      };
    },
    methods: {
      onConfirm(type) {
        const datePicker = this.$refs[type];
        const date = datePicker.getValues().map(item => item.value);
        const isScrolling = datePicker.isScrolling();
        if (isScrolling) return;
        this.$toast(date.join(','));
        this.close(type);
      },
    },
  };
</script>
```


### 选择完整时间

```html
<omi-date-picker
  ref="datePicker"
  :currentDate="currentDate"
  type="datetime"
  :filter="filter"
  title="请选择时间"
  confirmText="确定"
  cancelText="取消"
  :min="minDate"
  :max="maxDate"
/>
<script>
  export default {
    name: 'DemoDatePicker',
    data() {
      return {
        currentDate: new Date(),
        minDate: new Date(2000, 0, 1, 17, 30),
        maxDate: new Date(2025, 10, 3, 20, 39),
      };
    },
    methods: {
      filter(type, value) {
      if (type === 'minute') {
        return value.filter((item) => item % 5 === 0);
      }
      return value;
    },
      onConfirm(type) {
        const datePicker = this.$refs[type];
        const date = datePicker.getValues().map(item => item.value);
        const isScrolling = datePicker.isScrolling();
        if (isScrolling) return;
        this.$toast(date.join(','));
        this.close(type);
      },
    },
  };
</script>
```
## Props

| name        | type     | default                                   | description                                                |
| ----------- | -------- | ----------------------------------------- | ---------------------------------------------------------- |
| type        | String   | date                                      | 类型, 可选值['date', 'year', 'month', 'time', 'datetime']. |
| currentDate | Date     | new Date()                                | -                                                          | 当前时间. |
| max         | Date     | 当前时间十年后的 12 月 31 号 23 点 59 分. | 最大可选时间.                                              |
| min         | Date     | 当前时间十年前的 1 月 1 号 0 点 0 分.     | 最小可选时间.                                              |
| filter      | Function | function(type,value){return value}        | 此回调用于对日期及时间进行可格式化.                        |
| formatter   | Function | function(type,value){return value}        | 此回调可用于筛选日期及时间.                                |

## Methods

| name      | params | return | description |
| --------- | ------ | ------ | ----------- |
| getValues |        | Array  |             |
| setValues |        | Array  |             |

## Events

| name   | params             | description |
| ------ | ------------------ | ----------- |
| change | values, columIndex |             |

## Methods

| name        | params                                   | return  | description                           |
| ----------- | ---------------------------------------- | ------- | ------------------------------------- |
| getValues   |                                          | Array   | 获取选中值，只在滚动结束后才会返回值. |
| setValues   | values: Array\|Any<br>columIndex: Number |         | 设置选中值，如果*values*是 *Array*类型那数组中的每一为需要设置的列的值,如:`value = ['a','b','c']` 那么第一至第三列则分别选中'a','b','c'. 如果*values*非数组那么需指定需要设置的列下标作为第二个参数.                                      |
| isScrolling |                                          | Boolean | 是否正在滚动中.                       |

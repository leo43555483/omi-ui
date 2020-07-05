# OmiForm

## 安装

```js
import { Form } from 'omiui';
//or
import { Form } from 'omiui';
Vue.use(Form);
```

## 使用

### 基本用法

```html
<omi-form ref="form" :models="result">
  <omi-form-item name="fruit" label="水果" :rules="rules">
    <omi-input v-model="result.fruit" placeholder="请输入水果名" />
  </omi-form-item>
  <omi-form-item name="mobile" label="手机" :rules="rules">
    <omi-input v-model="result.mobile" placeholder="请输入手机品牌" />
  </omi-form-item>
  <omi-form-item>
    <omi-button :loading="submiting" round block @click="onSubmit">提交</omi-button>
  </omi-form-item>
</omi-form>
<script>
  export default {
    data() {
      return {
        rules: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入正确内容',
          },
        ],
        result: {
          fruit: '',
          mobile: '',
        },
      };
    },
    methods: {
      onSubmit() {
        this.submiting = true;
        this.$refs.form.validate().then(error => {
          console.log('submit', error);
          if (error) {
            return;
          }
          //...
          this.submiting = false;
        });
      },
    },
  };
</script>
```

### 异步校验

```html
<omi-form ref="form" :models="result">
  <omi-form-item name="fruit" label="水果" :rules="rules1">
    <omi-input v-model="result.fruit" placeholder="请输入水果名" />
  </omi-form-item>
  <omi-form-item name="mobile" label="手机" :rules="rules1">
    <omi-input v-model="result.mobile" placeholder="请输入手机品牌" />
  </omi-form-item>
  <omi-form-item>
    <omi-button :loading="submiting" round block @click="onSubmit">提交</omi-button>
  </omi-form-item>
</omi-form>
<script>
  export default {
    data() {
      const vm = this;
      return {
        rules: [
          {
            validator: vm.validator,
            required: true,
            trigger: 'blur',
            message: '请输入正确内容',
          },
        ],
        result: {
          fruit: '',
          mobile: '',
        },
      };
    },
    methods: {
      validator(rule, value, callback) {
        return new Promise(resolve => {
          setTimeout(() => {
            callback('error');
            resolve();
          }, 3000);
        });
      },
      onSubmit() {
        this.submiting = true;
        this.$refs.form.validate().then(error => {
          console.log('submit', error);
          if (error) {
            return;
          }
          //...
          this.submiting = false;
        });
      },
    },
  };
</script>
```

### 重置表单

```html
<omi-form ref="form" :models="result">
  <omi-form-item name="fruit" label="水果" :rules="rules">
    <omi-input v-model="result.fruit" placeholder="请输入水果名" />
  </omi-form-item>
  <omi-form-item name="mobile" label="手机" :rules="rules">
    <omi-input v-model="result.mobile" placeholder="请输入手机品牌" />
  </omi-form-item>
  <omi-form-item>
    <omi-button round block @click="onReset">重置</omi-button>
  </omi-form-item>
</omi-form>
<script>
  export default {
    data() {
      return {
        result: {
          fruit: '',
          mobile: '',
        },
      };
    },
    methods: {
      onReset() {
        this.$refs.form.resetValidate();
      },
    },
  };
</script>
```

## Props

| name          | type          | default | description               |
| ------------- | ------------- | ------- | ------------------------- |
| labelAlign    | String        | -       | label 水平对齐方式.       |
| labelWith     | String Number | -       | label 宽度.               |
| showStatus    | Boolean       | true    | 是否显示状态提示.         |
| firstValidate | Boolean       | false   | 出现第一个错误后停止校验. |
| colon         | Boolean       | true    | 是否显示冒号.             |
| scrollToError | Boolean       | false   | 滚动到错误区域.           |
| showError     | String        |         | 实现是错提示              |
| models        | Object        | -       |                           |
| autocomplete  | Boolean       | false   | 同*autocomplete*属性.     |

## Events

| name     | params      | description |
| -------- | ----------- | ----------- |
| validate | error, name | -           |

## Methods

| name          | params | return | description |
| ------------- | ------ | ------ | ----------- |
| resetValidate | -      | -      | 重置表单.   |
| validateField | name   | -      | 校验指定域. |

**_表单校验详情请查看 [async-validator](https://github.com/yiminghe/async-validator)._**

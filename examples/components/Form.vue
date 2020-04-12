<template>
  <div class="form">
    <omi-form ref="form" :model="result" @validate="onValidate">
      <omi-form-item
        name="data"
        label="文本1"
        :rules="rules1"
      >
        <omi-input v-model="result.data" readonly placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item
        name="data1"
        label="文本1"
        :rules="[{required:true, trigger: 'change', message: 'change2 trigger'}]"
      >
        <omi-input v-model="result.data1" placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item cententClass="opreate-line">
        <omi-button class="demo-button--item" round @click="onSubmit">提交</omi-button>
        <omi-button class="demo-button--item" round type="info" @click="onReset">重置</omi-button>
        <omi-button
          class="demo-button--item"
          round
          type="success"
          @click="toValidate"
        >校验</omi-button>
      </omi-form-item>
    </omi-form>
  </div>
</template>

<script>
export default {
  name: 'FormDemo',
  data() {
    console.log('data', this);
    const vm = this;
    return {
      result: {
        data: '',
        data1: '',
      },
      rules1: [{
        validator: vm.validator, required: true, trigger: 'blur', message: 'change1 trigger',
      }],
    };
  },
  methods: {
    onValidate(error, name) {
      console.log('error, name', error, name);
    },
    onSubmit() {
      this.$refs.form.validate().then((error) => {
        console.log('submit', error);
      });
    },
    validator(rule, value, callback) {
      console.log('rule, value', rule, value);
      return new Promise((resolve) => {
        setTimeout(() => {
          callback('error');
          resolve();
        }, 3000);
      });
    },
    onReset() {
      this.$refs.form.resetValidate();
    },
    toValidate() {
      this.$refs.form.validateField('data1').then((error) => {
        console.log('validate', error);
      });
    },
  },
};
</script>

<style lang="scss">
.demo-button--item{
  margin: 0 20px;
}
</style>

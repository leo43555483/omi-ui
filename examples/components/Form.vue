<template>
  <div class="form">
    <omi-form ref="form" :model="result" @validate="onValidate" label-with="90">
      <omi-form-item
        name="data"
        label="文本1"
        :rules="rules1"
      >
        <omi-input v-model="result.data" placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item
        name="data1"
        label="文本1"
        :rules="[{required:true, trigger: 'change', message: 'change2 trigger'}]"
      >
        <omi-input v-model="result.data1" placeholder="请输入文字"/>
      </omi-form-item>
    </omi-form>
    <button type="button" @click="onSubmit">提交</button>
    <button type="button" @click="onReset">重置</button>
    <button type="button" @click="toValidate">校验</button>
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

<style>

</style>

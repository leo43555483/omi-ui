<template>
  <div class="form">
    <omi-form ref="form" :models="result" @validate="onValidate">
      <omi-form-item
        name="data"
        label="文本1"
        :rules="rules1"
      >
        <omi-input v-model="result.data" placeholder="请输入文字form"/>
      </omi-form-item>
      <omi-form-item
        name="data1"
        label="文本1"
        :rules="[{required:true, trigger: 'change', message: '请输入正确内容'}]"
      >
        <omi-input v-model="result.data1" placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item cententClass="opreate-line">
        <omi-button class="demo-button--item"
          :loading="submiting"
          round
          @click="() => onSubmit('form')"
        >提交</omi-button>
        <omi-button class="demo-button--item" round type="info" @click="onReset">重置</omi-button>
        <omi-button
          class="demo-button--item"
          round
          type="success"
          @click="toValidate"
        >校验</omi-button>
      </omi-form-item>
    </omi-form>
    <omi-form ref="form1" :models="result" @validate="onValidate">
      <omi-form-item
        name="data2"
        label="文本1"
        :rules="rules1"
      >
        <omi-input v-model="result.data" readonly placeholder="请输入文字form1"/>
      </omi-form-item>
      <omi-form-item
        name="data3"
        label="文本1"
        :rules="[{required:true, trigger: 'change', message: '请输入正确内容'}]"
      >
        <omi-input v-model="result.data1" placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item
        name="data4"
        label="文本1"
        :rules="[{required:true, trigger: 'change', message: '请输入正确内容'}]"
      >
        <omi-input v-model="result.data1" placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item cententClass="opreate-line">
        <omi-button class="demo-button--item"
          :loading="submiting"
          round
          block
          @click="() => onSubmit('form1')"
        >提交</omi-button>
      </omi-form-item>
    </omi-form>
     <omi-form ref="form2" :models="result" @validate="onValidate">
      <omi-form-item
        name="data2"
        label="文本1"
        :rules="rules1"
      >
        <omi-input v-model="result.data" readonly placeholder="请输入文字form2"/>
      </omi-form-item>
      <omi-form-item
        name="data3"
        label="文本1"
        :rules="[{required:true, trigger: 'change', message: '请输入正确内容'}]"
      >
        <omi-input v-model="result.data1" placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item
        name="data4"
        label="文本1"
        :rules="[{required:true, trigger: 'change', message: '请输入正确内容'}]"
      >
        <omi-input v-model="result.data1" placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item cententClass="opreate-line">
        <omi-button class="demo-button--item"
          :loading="submiting"
          round
          block
          @click="() => onSubmit('form2')"
        >提交</omi-button>
      </omi-form-item>
    </omi-form>
     <omi-form ref="form3" :models="result" @validate="onValidate">
      <omi-form-item
        name="data5"
        label="文本1"
        :rules="rules1"
      >
        <omi-input v-model="result.data" placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item
        name="data6"
        label="文本1"
        :rules="[{required:true, trigger: 'change', message: '请输入正确内容'}]"
      >
        <omi-input v-model="result.data1" placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item
        name="data7"
        label="文本1"
        :rules="[{required:true, trigger: 'change', message: '请输入正确内容'}]"
      >
        <omi-input v-model="result.data1" placeholder="请输入文字"/>
      </omi-form-item>
      <omi-form-item cententClass="opreate-line">
        <omi-button class="demo-button--item"
          :loading="submiting"
          round
          block
          @click="() => onSubmit('form3')"
        >提交</omi-button>
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
        data2: '',
        data3: '',
        data4: '',
        data5: '',
        data6: '',
        data7: '',
      },
      submiting: false,
      rules1: [{
        validator: vm.validator, required: true, trigger: 'blur', message: '请输入正确内容blur',
      }],
    };
  },
  methods: {
    onValidate(error, name) {
      console.log('error, name', error, name);
    },
    onSubmit(form) {
      this.submiting = true;
      console.log('form', form);
      this.$refs[form].validate().then((error) => {
        console.log('submit', error);
        this.submiting = false;
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

<template>
  <div class="demo-address-picker">
    <div class="demo-item">
      <omi-button block @click="onClick" >选择地区</omi-button>
      <omi-action-sheet
        v-model="open"
      >
        <omi-address-picker
          ref="picker"
          :data="address"
          title="请选择地区"
          confirmText="确定"
          cancelText="取消"
          :onConfirm="onConfirm"
          :onCancel="onCancel"
          @change="onChange"
        />
      </omi-action-sheet>
    </div>
    <div class="demo-item">
      <omi-address-picker
      ref="picker2"
        :data="address"
        title="请选择地区"
        :onConfirm="onConfirm"
        :onCancel="onCancel"
        @change="onChange"
      />
    </div>
    <div class="demo-item">
      <omi-address-picker
        ref="addressPicker"
        :data="address"
        title="请选择地区"
        cancelText="取消"
        confirmText="确认"
      />
    </div>
  </div>
</template>
<script>
import address from '../data/address';

export default {
  name: 'DemoAddressPicker',
  data() {
    return {
      open: false,
      address,
    };
  },
  methods: {
    onChange(values) {
      console.log('onChange', values, this.$refs.picker2.isScrolling());
    },
    onConfirm() {
      const values = this.$refs.picker.getValues();
      console.log('values', values);
      this.$toast(values.map((item) => item.label).join(', '));
      this.open = false;
    },
    onCancel() {
      this.open = false;
    },
    onClick() {
      this.open = true;
    },
  },
};
</script>

<style>

</style>

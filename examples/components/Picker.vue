<template>
  <div class="omi-picker-demo">
    <div class="demo-item">
      <omi-picker ref="picker1" cascade :data="colums" @change="onChange"></omi-picker>
    </div>
    <div class="demo-item" >
      <omi-picker
        ref="picker"
        :data="colums2"
        confirmText="确认"
        cancelText="取消"
        :onConfirm="onConfirm"
        @change="onChange"
      ></omi-picker>
    </div>
    <div class="demo-item">
      <omi-picker ref="picker2" cascade :data="colums3"  @change="onChange2"></omi-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OmiPickerDemo',
  data() {
    return {
      colums3: [],
      colums: [
        {
          label: '广州',
          value: 'guangzhou',
          children: [
            { label: '番禺', value: 'panyu', children: [{}] },
            { label: '天河', value: 'tianhe', children: [{}] },
          ],
        },
        { label: '珠海', value: 'zhuhai', children: [{}] },
        { label: '东莞', value: 'dongguan', children: [{}] },
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
              ],
            },
            { label: '南山', value: 'nanshan', children: [{}] },
          ],
        },
      ],
      colums2: [
        [
          { label: '珠海', value: 'zhuhai' },
          { label: '潮州', value: 'chaozhou' },
          { label: '汕头', value: 'shantou' },
          { label: '东莞', value: 'dongguan' },
          { label: '汕尾', value: 'shanwei' },
          { label: '揭阳', value: 'jieyang' },
          { label: '肇庆', value: 'zhaoqing' },
        ],
        [
          { label: '东莞', value: 'dongguan', children: [] },
          { label: '汕尾', value: 'shanwei', children: [] },
        ],
        [
          { label: '揭阳', value: 'jieyang' },
          { label: '肇庆', value: 'zhaoqing' },
        ],
      ],
    };
  },
  methods: {
    onChange(values, columIndex) {
      const [city] = values;
      console.log('onChange', values, columIndex);
      if (city === 'dongguan' && columIndex === 0) {
        const fresh = [].concat(this.colums2[2]);
        this.$refs.picker.updateColum(fresh, 0);
        this.$refs.picker.setValues('shantou', 1);
      } else if (columIndex === 0) {
        const fresh = [].concat(this.colums2[1]);
        this.$refs.picker.updateColum(fresh, 1);
      }
    },
    onChange2(values, columIndex) {
      const [city] = values;
      if (columIndex === 1 && city === 'jieyang') {
        this.$refs.picker2.setValues(['shenzhen', 'nanshan']);
      }
    },
    onConfirm() {
      const result = this.$refs.picker.getValues();
      console.log('result', result);
    },
  },
  mounted() {
    setTimeout(() => {
      this.colums3 = [].concat(this.colums);
    }, 2000);
  },
};
</script>

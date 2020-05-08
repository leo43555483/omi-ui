<template>
  <div class="omi-picker-demo">
    <div class="demo-item">
      <omi-picker cascade :data="colums"></omi-picker>
    </div>
    <div class="demo-item">
      <omi-picker :data="colums2"></omi-picker>
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
            { label: '番禺', value: 'panyu' },
            { label: '天河', value: 'tianhe' },
          ],
        },
        { label: '珠海', value: 'zhuhai', children: [] },
        { label: '东莞', value: 'dongguan', children: [] },
        { label: '揭阳', value: 'jieyang', children: [] },
        {
          label: '深圳',
          value: 'shenzhen',
          children: [
            { label: '宝安', value: 'baoan' },
            { label: '南山', value: 'nanshan' },
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
          { label: '东莞', value: 'dongguan' },
          { label: '汕尾', value: 'shanwei' },
        ],
        [
          { label: '揭阳', value: 'jieyang' },
          { label: '肇庆', value: 'zhaoqing' },
        ],
      ],
    };
  },
};
</script>

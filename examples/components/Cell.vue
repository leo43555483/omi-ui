<template>
  <div class="cell">
    <omi-cell title="标题1" rightArrow title-width="90">
      <omi-input slot="content" placeholder="自定义title宽度"/>
      <template slot="extra">
        <omi-button size="mini">button</omi-button>
      </template>
    </omi-cell>
    <omi-cell title="title2" rightArrow>
      <omi-input slot="content" placeholder="请输入文字"/>
    </omi-cell>
    <omi-cell title="title3" label="label1" rightArrow>
      <omi-input slot="content" readonly placeholder="请输入文字"/>
    </omi-cell>
    <omi-cell-group title="cell group" description="配合cellgroup使用">
      <omi-cell title="标题1" title-width="90">
        <omi-input slot="content" placeholder="自定义title宽度"/>
        <template slot="extra">
          <omi-button size="mini">button</omi-button>
        </template>
      </omi-cell>
    <omi-cell title="title2"  title-width="90">
      <omi-input slot="content" placeholder="请输入文字"/>
    </omi-cell>
    <omi-cell to="/" clickable rightArrow @click="onClick">
      <span slot="title">页面跳转</span>
    </omi-cell>
    </omi-cell-group>
  </div>
</template>

<script>
export default {
  name: 'CellDemo',
  data() {
    return {
    };
  },
  methods: {
    onClick() {
    },
  },
};
</script>

<style>

</style>

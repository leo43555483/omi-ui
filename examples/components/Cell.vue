<template>
  <div class="cell">
    <omi-cell title="标题1" title-width="90">
      <omi-input slot="content" placeholder="请输入文字"/>
      <template slot="extra">
        <button>button</button>
      </template>
    </omi-cell>
    <omi-cell title="title2">
      <omi-input slot="content" placeholder="请输入文字"/>
    </omi-cell>
    <omi-cell title="title3" label="label1">
      <omi-input slot="content" readonly placeholder="请输入文字"/>
    </omi-cell>
  </div>
</template>

<script>
export default {
  name: 'CellDemo',
};
</script>

<style>

</style>

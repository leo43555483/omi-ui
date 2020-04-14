<template>
  <div class="demo-checkbox">
    <div class="demo-item">
      <omi-checkbox
      v-model="checkAll"
      indeterminate
      @change="(checked) => onChange(checked,'checkbox', model, list)"
      text="全选"></omi-checkbox>
      <omi-checkbox-group v-model="model" ref="checkbox">
        <omi-checkbox
          v-for="item in list"
          :prop="item"
          :key="item"
          text="checkbox"
        />
      </omi-checkbox-group>
    </div>
    <omi-checkbox
    v-model="checkAll2"
    indeterminate
    @change="(checked) => onChange(checked, 'checkbox2',result, list2)"
    text="全选"></omi-checkbox>
    <omi-checkbox-group v-model="result" ref="checkbox2">
      <omi-cell
        v-for="(item,index) in list2"
        :key="item"
        clickable
        title="标题 checkbox"
        @click="() => onClick(index)"
      >
        <template slot="extra">
          <omi-checkbox :prop="item" ref="checkItem"/>
        </template>
      </omi-cell>
    </omi-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'DemoCheckBox',
  data() {
    return {
      model: ['a', 'b'],
      result: [],
      list: ['a', 'b', 'c', 'd'],
      list2: ['a', 'b', 'c', 'd'],
      checkAll: false,
      checkAll2: false,
      toggle: false,
    };
  },
  watch: {
    model(model) {
      if (model.length === this.list.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
  },
  methods: {
    onClick(index) {
      this.$refs.checkItem[index].check();
    },
    onChange(checked, ref, model, list) {
      if (checked) this.$refs[ref].toggleAll(checked);
      else if (model.length === list.length) {
        this.$refs[ref].toggleAll(checked);
      }
    },
    onToggle() {
      this.$refs.checkbox.toggleAll();
    },
  },
};
</script>

<style lang="scss">
.demo-checkbox{
  background-color: #fff;
  .omi-cell{
    .omi-checkbox{
      padding: 0;
    }

  }
}
.demo-item{
  padding-left: 16px;
}
</style>

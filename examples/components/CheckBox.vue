<template>
  <div class="demo-checkbox">
    <div class="demo-item">
      <omi-checkbox
      v-model="checkAll"
      indeterminate
      @change="(checked) => onChange(checked,'checkbox', model, list.length)"
      text="全选"
      ></omi-checkbox>
      <omi-checkbox-group horizontal v-model="model" ref="checkbox" active-color="red">
        <omi-checkbox
          v-for="item in list"
          :prop="item"
          :key="item"
          text="checkbox"
        />
      </omi-checkbox-group>
    </div>
    <omi-checkbox-group v-model="result" ref="checkbox2" max="3" active-color="red">
      <omi-cell-group title="配合cell使用" :description="description">
        <omi-cell clickable>
          <omi-checkbox
            slot="icon-left"
            v-model="checkAll2"
            indeterminate
            @change="(checked) => onChange(checked, 'checkbox2',result, 3)"
            text="全选"
          />
        </omi-cell>
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
      </omi-cell-group>
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
      description: '根据环境光线条件自动调整iphone屏幕以在不同环境下保持色彩显示一致',
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
    onChange(checked, ref, model, max) {
      if (checked) this.$refs[ref].toggleAll(checked);
      else if (model.length === max) {
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
  .omi-cell{
    .omi-checkbox{
      padding: 0;
    }

  }
}
.demo-item{
  padding-left: 16px;
  background-color: #fff;
}
</style>

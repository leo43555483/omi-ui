<template>
  <div class="demo-action-sheet">
    <div class="demo-item">
      <omi-button block @click="() => onClick('open')">显示取消按钮</omi-button>
      <omi-action-sheet
        v-model="open"
        title="Action Sheet"
        :data="data"
        close-text="取消"
        :onCancel="() => onCancel('open')"
        @select="onSelect"
      ></omi-action-sheet>
    </div>

    <div class="demo-item">
      <omi-button block @click="() => onClick('open2')">显示禁用状态</omi-button>
      <omi-action-sheet
        v-model="open2"
        title="Action Sheet2"
        :data="data2"
        close-text="取消"
        :onCancel="() => onCancel('open2')"
        @select="onSelect"
      ></omi-action-sheet>
    </div>

    <div class="demo-item">
      <omi-button block @click="() => onClick('open3')">显示加载状态</omi-button>
      <omi-action-sheet
        :loading="loading"
        spinner
        v-model="open3"
        title="Action Sheet3"
        :data="data3"
        close-text="取消"
        :onCancel="() => onCancel('open3')"
        @select="onSelect"
      ></omi-action-sheet>
    </div>

    <div class="demo-item">
      <omi-button block @click="() => onClick('open4')">圆角</omi-button>
      <omi-action-sheet
        round
        class="demo-action-sheet"
        title-align="left"
        subtitle="副标题"
        v-model="open4"
        title="Action Sheet4"
        closeIcon
        :data="data4"
        close-text="取消"
        :onCancel="() => onCancel('open4')"
        @select="onSelect"
      >
        <div slot="left-icon" class="demo-action-sheet__icon">icon</div>
      </omi-action-sheet>
    </div>

    <div class="demo-item">
      <omi-button block @click="() => onClick('open5')">自定义内容</omi-button>
      <omi-action-sheet
        round
        v-model="open5"
        closeIcon
        close-text="取消"
        :onCancel="() => onCancel('open5')"
        @select="onSelect"
      >
        <!-- <div class="demo-action-sheet__custom">自定义内容</div> -->
        <template #left-icon>
          <div>left</div>
        </template>
      </omi-action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoActionSheet',
  data() {
    return {
      open: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      data: [
        { content: '文本1', info: '1' },
        { content: '文本2' },
        { content: '文本3', className: 'highlight' },
      ],
      data2: [
        { content: '文本1', info: '1' },
        { content: '文本2', disable: true },
        { content: '文本3' },
        { content: '文本6' },
        { content: '文本7' },
        { content: '文本8' },
      ],
      data3: [],
      data4: [{ content: '文本1' }, { content: '文本2' }, { content: '文本3' }],
      loading: false,
    };
  },
  methods: {
    onCancel(type) {
      this[type] = false;
    },
    onSelect(payload) {
      this.$toast(payload.content);
      // this.open = false;
    },
    onClick(type) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.data3 = [
          { content: '文本1', info: '1' },
          { content: '文本2' },
          { content: '文本3' },
          { content: '文本4' },
          { content: '文本5' },
        ];
      }, 4000);
      this[type] = !this[type];
    },
  },
};
</script>

<style lang="scss">
.highlight {
  color: green;
}
.demo-action-sheet {
  .omi-action-sheet__header--icon {
    display: flex;
    align-items: center;
  }
}
.demo-action-sheet__icon {
  height: 32px;
  width: 32px;
  line-height: 32px;
  color: #fff;
  border-radius: 4px;
  background-color: #ddd;
}
.demo-action-sheet__custom {
  padding: 16px;
  text-align: center;
}
</style>

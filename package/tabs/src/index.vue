<template>
  <div class="omi-tabs ">
    <div class="omi-tabs__bar omi-border__bottom">
      <div class="omi-tabs__bar--list" ref="bar" role="tablist">
        <div
          ref="label"
          v-for="item in labels"
          :key="item.name"
          role="tab"
          class="omi-tabs__bar--item"
          :class="isActive(item)"
          :style="labelStyle"
          @click="() => onClick(item)"
        >
          <bage
            :dot="item.dot"
            :text="item.bageText"
            :maxNumber="item.bageMaxNumber"
          >
            <span>{{item.label}}</span>
          </bage>
        </div>
        <div class="omi-tabs__bar--line" :class="lineClass" :style="lineStyle"></div>
      </div>
    </div>
    <div class="omi-tabs__list" >
      <div ref="pane" class="omi-tabs__list--inner" :class="animatedClass" :style="paneStyles">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Bage from '../../bage';
import touchMixin from '../../mixins/touch';
import panelMixin from './mixins/panel';
import barMixin from './mixins/bar';
import { unDef } from '../../../src/utils/shared';

const DEFAULT_ACTIVE_INDEX = 0;
const DEFAULT_TITLE_SCROLL_DURATION = 300;
export default {
  name: 'OmiTabs',
  provide() {
    return {
      tabsParent: this,
    };
  },
  mixins: [touchMixin, panelMixin, barMixin],
  data() {
    return {
      children: [],
      activeKey: DEFAULT_ACTIVE_INDEX,
      activeIndex: DEFAULT_ACTIVE_INDEX,
      inited: false,
    };
  },
  components: { Bage },
  props: {
    titleScrollDuration: {
      type: Number,
      default: DEFAULT_TITLE_SCROLL_DURATION,
    },
    swipleable: {
      type: Boolean,
      default: false,
    },
    animated: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: 0,
    },
  },
  watch: {
    swipleable(swipleable) {
      if (swipleable) {
        this.$nextTick(() => {
          this.bindTouchEvent();
        });
      }
    },
    value(value) {
      if (!unDef(value)) {
        if (!this.inited) this.inited = true;
        this.show(this.animated, () => {
          const { activeKey, activeIndex, labels } = this;
          this.$emit('change', activeKey, labels[activeIndex].label);
        });
      }
    },
  },
  methods: {
    isActive({ tabName }) {
      const { activeKey } = this;
      return {
        'omi-tabs__bar--active': tabName === activeKey,
      };
    },
    onClick({ tabName, disalbed, label }) {
      if (disalbed) return;
      this.$emit('input', tabName);
      this.$emit('clickTab', tabName, label);
    },
    remove(child) {
      const { children } = this;
      const index = children.indexOf(child);
      if (index > -1) {
        this.children.splice(index, 1);
      }
    },
    add(child) {
      const { children } = this;
      if (children.indexOf(child) === -1) this.children.push(child);
    },
    getChildIndex(child) {
      return this.children.indexOf(child);
    },
    setActive({ activeKey, activeIndex }) {
      if (unDef(activeKey) || unDef(activeIndex)) return;
      this.activeKey = activeKey;
      this.activeIndex = activeIndex;
    },
    getActiveChildInfo(child) {
      if (!child) return {};
      return {
        activeIndex: child.getIndex,
        activeKey: child.tabName,
      };
    },
    getActive() {
      const [child] = this.children.filter((item) => item.tabName === this.value);
      return this.getActiveChildInfo(child);
    },
    show(animated, cb = () => {}) {
      this.$nextTick(() => {
        this.setActive(this.getActive());
        this.scrollBarToView(animated);
        this.scrollPane();
        this.scrollLine();
        cb();
      });
    },
  },
  mounted() {
    this.show(false);
  },
};
</script>

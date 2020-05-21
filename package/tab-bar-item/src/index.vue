<template>
  <div class="omi-tabbar-item"
    :class="activeItemClass"
    @click="onClick"
    :style="itemStyles"
  >
    <RouteButton v-bind="$attrs">
      <bage
        :dot="dot"
        :text="dotText"
        :maxNumber="dotMaxNumber"
      >
        <slot name="icon">
          <div class="omi-tabbar-item__icon" v-if="iconType">
            <Icon :type="iconType" :size="getIconSize"/>
          </div>
        </slot>
        <div class="omi-tabbar-item__text">
          <slot />
        </div>
      </bage>
    </RouteButton>
  </div>
</template>

<script>
import injectMixin from '../../mixins/inject';
import RouteButton from '../../../src/utils/RouteButton';
import Icon from '../../icon';
import Bage from '../../bage';
import { unDef } from '../../../src/utils/shared';

export default {
  name: 'OmiTabbarItem',
  mixins: [injectMixin('omiTabbar')],
  inheritAttrs: false,
  components: {
    RouteButton, Icon, Bage,
  },
  methods: {
    onClick() {
      this.parent.setActive(this.activeKey);
    },
    getParentProps(property) {
      return this.parent && this.parent[property];
    },
  },
  props: {
    name: {
      type: String,
      default: null,
    },
    dot: {
      type: Boolean,
      default: false,
    },
    dotMaxNumber: {
      type: Number,
      default: null,
    },
    dotText: {
      type: String,
      default: '',
    },
    iconType: {
      type: String,
      default: '',
    },
    iconSize: {
      type: Number,
      default: null,
    },
    activeColor: {
      type: String,
      default: null,
    },
  },
  computed: {
    itemStyles() {
      return {
        color: this.getActiveColor,
      };
    },
    getActiveColor() {
      return this.activeColor || this.getParentProps('activeColor');
    },
    getIconSize() {
      return this.iconSize || this.getParentProps('iconSize');
    },
    activeKey() {
      if (!unDef(this.name)) return this.name;
      return this.parent.getCildIndex(this);
    },
    activeItemClass() {
      if (this.parent && this.parent.isActiveItem(this.activeKey)) {
        return ['omi-tabbar-item__active'];
      }
      return [];
    },
  },
};
</script>

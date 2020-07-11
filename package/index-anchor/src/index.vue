<template>
  <div class="omi-index-anchor" :style="{'height': active ? `${height}px` : null}">
    <div
      class="omi-index-anchor__inner"
      :class="{'omi-index-anchor__active':active }"
      :style="styles"
    >
      <slot>{{title}}</slot>
    </div>
  </div>
</template>

<script>
import injectMixin from '../../mixins/inject';

export default {
  name: 'OmiIndexAnchor',
  mixins: [injectMixin('omiIndexBox')],
  data() {
    return {
      offsetTop: 0,
      active: false,
      height: null,
    };
  },
  props: {
    title: {
      type: String,
      default: () => '',
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    index: {
      type: String,
      required: true,
    },
  },
  methods: {
    update({ top }) {
      this.active = true;
      this.offsetTop = top;
    },
    reset() {
      this.active = false;
      this.offsetTop = 0;
    },
  },
  computed: {
    styles() {
      if (this.active) {
        return `
        height: ${this.height}px; 
        transform: translate3d(0, ${this.offsetTop}px,0);
        z-index:${this.zIndex};
        `;
      }
      return '';
    },
  },
  mounted() {
    this.height = this.$el.offsetHeight;
  },
};
</script>

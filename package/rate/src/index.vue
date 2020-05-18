<template>
  <div class="omi-rate">
    <span
      v-for="i in parseInt(total)"
      :key="getKey(i)"
      class="omi-rate__wrapper"
    >
      <i
        class="omi-rate__item--wrapper omi-icon-font omi-collection_fill"
        @click.stop="onClick(i,$event)"
        :style="itemStyles"
      >
        <i
          :class="getInnerClass"
          :style="innerStyles(i)"
        >
        </i>
      </i>
    </span>
  </div>
</template>

<script>
const DEFAULT_SIZE = 24;
const DEFAULT_FILL_COLOR = '#ffbb2a';
const DEFAULT_VOID_COLOR = '#ddd';
export default {
  name: 'OmiRate',
  model: {
    prop: 'score',
  },
  props: {
    voidColor: {
      type: String,
      default: DEFAULT_VOID_COLOR,
    },
    fillColor: {
      type: String,
      default: DEFAULT_FILL_COLOR,
    },
    size: {
      type: Number,
      default: DEFAULT_SIZE,
    },
    total: {
      type: Number,
      default: 5,
    },
    score: {
      type: Number,
      default: 0,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    halfRate: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(i, e) {
      if (this.readonly) return;
      let score = i;
      if (this.halfRate) {
        score = this.isOverHald(e) ? i : i - 0.5;
      }
      this.$emit('input', score);
      if (score !== this.score) {
        this.$emit('change', score);
      }
    },
    isOverHald(e) {
      const { clientWidth } = e.target;
      return e.offsetX >= clientWidth / 2;
    },
    getKey(index) {
      return (`${Date.now()}_${index}`);
    },
    getWidth(i) {
      const {
        score,
      } = this;
      const ceil = Math.ceil(score);
      let width;
      if (i < score) {
        width = '100%';
      }
      if (i === ceil) {
        width = this.figureHalf(score);
      }
      return width;
    },
    figureHalf(number) {
      const floor = Math.floor(number);
      const ceil = Math.ceil(number);
      if (ceil === number) {
        return '100%';
      }
      const digit = (number - floor) * 100;
      return `${digit}%`;
    },
    innerStyles(index) {
      let width = 0;
      if (Math.ceil(this.score) >= index) {
        width = this.getWidth(index);
      }
      return {
        'font-size': `${this.size}px`,
        color: this.fillColor,
        width: `${width}`,
      };
    },
  },
  computed: {
    itemStyles() {
      return {
        'font-size': `${this.size}px`,
        color: this.voidColor,
      };
    },
    getInnerClass() {
      return ['omi-rate__item--inner', 'omi-icon-font', 'omi-collection_fill'];
    },
  },
};

</script>

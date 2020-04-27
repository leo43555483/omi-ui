<template>
  <div class="omi-load-more" v-scroll:[immediate]="onScroll">
    <div class="omi-list">
      <slot/>
    </div>
    <div class="omi-list__footer" ref="footer">
      <slot name="load-more">
        <div class="omi-list__footer--status omi-list__loading" v-show="loading && !finished">
          <Loading :size="loadingSize"/>
          <span class="omi-list__load--text">{{loadingText}}</span>
        </div>
        <div class="omi-list__footer--status omi-list__finished" v-if="finished">
          <span class="omi-list__load--text">{{finishedText}}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import Loading from '../../loading';
import scroll from '../../../src/directives/scroll';
import { getBoundingClientRect } from '../../../src/utils/dom';

const DEFAULT_OFFSET = 10;
const DEFAULT_LOADING_SIZE = 18;
export default {
  name: 'OmiLoadMore',
  props: {
    immediate: {
      type: Boolean,
      default: false,
    },
    finishedText: {
      type: String,
      default: '',
    },
    loadingSize: {
      type: [String, Number],
      default: DEFAULT_LOADING_SIZE,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Number,
      default: DEFAULT_OFFSET,
    },
    loadingText: {
      type: String,
      default: '',
    },
  },
  components: { Loading },
  directives: {
    scroll,
  },
  methods: {
    onScroll(e, scroller) {
      this.$nextTick(() => {
        const { loading, offset, finished } = this;
        if (loading || finished) return;
        const { footer } = this.$refs;
        const scrollerRect = getBoundingClientRect(scroller);
        const footerRect = getBoundingClientRect(footer);
        if (scrollerRect.bottom + offset >= footerRect.top) {
          this.$emit('load');
        }
      });
    },
  },
};
</script>

<style>

</style>

<template>
  <div class="omi-load-more" v-scroll:[immediate]="onScroll">
    <div class="omi-list">
      <slot />
    </div>
    <div class="omi-list__footer" ref="footer">
      <slot name="load-more">
        <div class="omi-list__footer--status omi-list__finished" v-if="finished">
          <span class="omi-list__load--text">{{finishedText}}</span>
        </div>
        <div class="omi-list__footer--status omi-list__error" @click="errorCallback" v-if="error">
          <span class="omi-list__load--text">{{errorText}}</span>
        </div>
        <div class="omi-list__footer--status omi-list__loading" v-show="showLoading">
          <Loading :size="loadingSize" />
          <span class="omi-list__load--text">{{loadingText}}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import Loading from '../../loading';
import scroll from '../../directives/scroll';
import { getBoundingClientRect } from '../../utils/dom';
import { isFunction } from '../../utils/shared';

const DEFAULT_OFFSET = 10;
const DEFAULT_LOADING_SIZE = 18;
export default {
  name: 'OmiLoadMore',
  props: {
    handleError: {
      type: Function,
      default: null,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: '',
    },
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
    errorCallback() {
      const { handleError } = this;
      if (isFunction(handleError)) handleError();
      else {
        this.$emit('update:error', false);
        this.$emit('load');
      }
    },
    onScroll(e, scroller) {
      if (!scroller) return;
      const { loading, offset, finished } = this;
      if (loading || finished) return;
      const { footer } = this.$refs;
      const scrollerRect = getBoundingClientRect(scroller);
      const footerRect = getBoundingClientRect(footer);
      if (scrollerRect.bottom + offset >= footerRect.top) {
        this.$emit('load');
      }
    },
  },
  computed: {
    showLoading() {
      const { loading, finished, error } = this;
      return loading && !finished && !error;
    },
  },
};
</script>

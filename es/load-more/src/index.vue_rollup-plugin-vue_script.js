import '../../loading/index.js';
import scroll from '../../directives/scroll.js';
import { getBoundingClientRect } from '../../utils/dom.js';
import { isFunction } from '../../utils/shared.js';
import Loading from '../../loading/src/index.vue.js';

//
var DEFAULT_OFFSET = 10;
var DEFAULT_LOADING_SIZE = 18;
var script = {
  name: 'OmiLoadMore',
  props: {
    handleError: {
      type: Function,
      default: null
    },
    error: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: ''
    },
    immediate: {
      type: Boolean,
      default: false
    },
    finishedText: {
      type: String,
      default: ''
    },
    loadingSize: {
      type: [String, Number],
      default: DEFAULT_LOADING_SIZE
    },
    finished: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      default: DEFAULT_OFFSET
    },
    loadingText: {
      type: String,
      default: ''
    }
  },
  components: {
    Loading: Loading
  },
  directives: {
    scroll: scroll
  },
  methods: {
    errorCallback: function errorCallback() {
      var handleError = this.handleError;
      if (isFunction(handleError)) handleError();else {
        this.$emit('update:error', false);
        this.$emit('load');
      }
    },
    onScroll: function onScroll(e, scroller) {
      if (!scroller) return;
      var loading = this.loading,
          offset = this.offset,
          finished = this.finished;
      if (loading || finished) return;
      var footer = this.$refs.footer;
      var scrollerRect = getBoundingClientRect(scroller);
      var footerRect = getBoundingClientRect(footer);

      if (scrollerRect.bottom + offset >= footerRect.top) {
        this.$emit('load');
      }
    }
  },
  computed: {
    showLoading: function showLoading() {
      var loading = this.loading,
          finished = this.finished,
          error = this.error;
      return loading && !finished && !error;
    }
  }
};

export { script as default };

<template>
  <div class="omi-search omi-search__wrapper">
    <div class="omi-search__inner" :class="innerClasses">
      <div class="omi-search__input--wrapper">
        <div
          class="omi-search__placeholder"

          :style="placeholderStyles"
        >
        <div class="omi-search__placeholder--wrapper" ref="placeholder">
          <div class="omi-search__search--icon">
            <slot name="search-icon">
              <Icon type="search"/>
            </slot>
          </div>
          <div class="omi-search__placeholder--text" :style="placeholderTextStyle">
            <span>{{placeholder}}</span>
          </div>
        </div>
        </div>
        <div class="omi-search__content">
          <input
            ref="input"
            class="omi-input__inner omi-search__input"
            type="search"
            v-on="inputListeners"
            v-bind="$attrs"
            :value="value"
          />
        </div>
        <div class="omi-search__clear" v-show="showClear" @click="onClear">
          <Icon type="delete"/>
        </div>
      </div>
      <div
        class="omi-search__cancel"
        :style="cancelStyles"
        :class="cancelClasses"
        @click="onCancel"
        ref="cancel"
      >
        <span>{{cancelText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../../icon';
import inpuMixin from '../../mixins/input';

export default {
  name: 'OmiSearch',
  components: { Icon },
  data() {
    return {
      focused: false,
      cancelStyles: {
        margin: '-999px',
      },
      placeholderStyles: {},
      cancelWidth: 0,
    };
  },
  mixins: [inpuMixin],
  props: {
    value: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: 'cancel',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  watch: {
    showCancel: {
      handler() {
        this.setCancelStyle();
        this.setFocusStyle();
      },
      immediate: true,
    },
  },
  methods: {
    setFocusStyle() {
      this.$nextTick(() => {
        let offset = 0;
        if (this.showCancel) {
          const { offsetWidth } = this.$el;
          const { placeholder } = this.$refs;
          const { cancelWidth } = this;
          const { floor } = Math;
          offset = -floor((offsetWidth / 2) - (placeholder.offsetWidth / 2) - (cancelWidth / 2));
        }
        this.placeholderStyles = {
          transform: `translate3d(${offset}px,0,0)`,
          left: 0,
        };
      });
    },
    onCancel() {
      this.$refs.input.blur();
    },
    onClear() {
      this.$emit('input', '');
      this.$refs.input.focus();
    },
    onFocus(e) {
      this.focused = true;
      this.$emit('focus', e);
    },
    onInputBlur(e) {
      this.focused = false;
      this.onBlur(e);
    },
    setCancelStyle() {
      this.$nextTick(() => {
        if (!this.showCancel) {
          const cancelWidth = this.$refs.cancel.offsetWidth;
          this.cancelWidth = cancelWidth;
          this.cancelStyles = {
            margin: `-${cancelWidth}px`,
          };
        } else {
          this.cancelStyles = { margin: 0 };
        }
      });
    },
  },
  computed: {
    showCancel() {
      return this.focused || this.showClear;
    },
    showClear() {
      return this.value !== '';
    },
    innerClasses() {
      return {
        'omi-search__focused': this.showCancel,
      };
    },
    cancelClasses() {
      return {
        'omi-search__cancel--show': this.showCancel,
      };
    },
    inputListeners() {
      return {
        ...this.listeners,
        blur: this.onInputBlur,
      };
    },
    placeholderTextStyle() {
      return {
        opacity: this.showClear ? 0 : 1,
      };
    },
    inputStyle() {
      return {
        width: this.focused ? null : '100%',
      };
    },
  },
  mounted() {
    this.setCancelStyle();
  },
};
</script>

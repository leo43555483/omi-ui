import { oneOf, isFunction } from '../../../src/utils/shared';
import toastType from './toast-type';
import Icon from '../../icon';
import Loading from '../../loading';

const TOAS_ZINDEX_BASE = 2000;
const Toast = () => ({
  name: 'OmiToast',
  data() {
    return {
      zIndex: 0,
    };
  },
  watch: {
    noScroll: {
      handler: 'preventScroll',
      immediate: true,
    },
    value: {
      handler: 'preventScroll',
      immediate: true,
    },
  },
  props: {
    clickClose: {
      type: Boolean,
      default: false,
    },
    noScroll: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    baseZindex: {
      type: Number,
      default: TOAS_ZINDEX_BASE,
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return oneOf(value, toastType);
      },
    },
  },
  methods: {
    preventScroll() {
      const { noScroll, value } = this;
      this.$nextTick(() => {
        if (noScroll && value) {
          document.body.classList.add('omi-toast__noscroll');
        } else {
          document.body.classList.remove('omi-toast__noscroll');
        }
      });
    },
    setZindex(value = 0) {
      this.zIndex = value + this.baseZindex;
    },
    getIcon() {
      const { type, icon } = this;
      if (type === 'loading') {
        return (
          <Loading size={24} spinner />
        );
      }
      if (icon) return <Icon type={icon}/>;
      let iconType = null;
      if (type === 'error') iconType = 'close';
      if (type === 'success') iconType = 'right';
      if (iconType) return <Icon type={iconType}/>;
      return null;
    },
    getText() {
      const { content, type } = this;
      if (type === 'html') {
        return (<div class="omi-toast__text" domPropsInnerHTML={content}></div>);
      }
      if (content) {
        return (
          <span class="omi-toast__text">
            {this.content}
          </span>
        );
      }
      return null;
    },
    onAfterEnter() {
      if (isFunction(this.onOpen)) this.onOpen();
    },
    onAfterLeave() {
      this.onClose();
    },
    onClick() {
      if (this.clickClose) this.$emit('input', false);
    },
  },
  computed: {
    getZindex() {
      return `z-index: ${this.zIndex}`;
    },
    wrapperClasses() {
      const { type } = this;
      if (type === 'text' || type === 'html') return 'omi-toast_custom';
      return null;
    },
  },
  render() {
    return (
      <transition name="fade-in" appear onAfterEnter={this.onAfterEnter} onAfterLeave={this.onAfterLeave}>
        <div
          class={['omi-toast', this.wrapperClasses]}
          vShow={this.value}
          style={this.getZindex}
          onClick={this.onClick}
        >
          {this.getIcon()}
          {this.getText()}
        </div>
      </transition>
    );
  },
});

export default Toast();

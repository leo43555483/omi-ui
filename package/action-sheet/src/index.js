
import popMixin from '../../mixins/popup';
import { isFunction } from '../../../src/utils/shared';

const ActionSheet = () => ({
  name: 'OmiActionSheet',
  mixins: [popMixin()],
  props: {
    className: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: '',
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    round: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    closeIcon: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    closeText: {
      type: String,
      default: '',
    },
    onCancel: {
      type: Function,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // loading type
    spinner: {
      type: Boolean,
      default: false,
    },
    titleAlign: {
      type: String,
      default: null,
    },
    contentAlign: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleCancel(e) {
      const { onCancel } = this;
      if (isFunction(onCancel)) onCancel(e);
      else this.$emit('input', false);
    },
    onSelect(payload) {
      return () => {
        if (payload.disable) return;
        this.$emit('select', payload);
      };
    },
    getLoadingContent() {
      if (!this.loading) return null;
      return (
        <div class="omi-action-sheet__loading omi-icon__wrapper">
          <omi-loading spinner={this.spinner}/>
        </div>
      );
    },
    getContent() {
      const Slot = this.$slots.default;
      const { getDataList } = this;
      if (Slot) {
        return Slot;
      }
      return getDataList();
    },
    getDataList() {
      const { data } = this;
      return (
        <transition name="fade-in">
          <ul vShow={!this.loading} class="omi-action-sheet__list">
            {data.map((item) => {
              const { className, content, disable } = item;
              const disableClass = disable ? 'omi-action-sheet__item--disable' : null;
              const originClass = ['omi-action-sheet__item', 'omi-border__top'];
              return (
                <li
                  class={[...originClass, className, disableClass]}
                  style={this.contentStyles}
                  onClick={this.onSelect(item)}
                >{content}</li>
              );
            })}
          </ul>
        </transition>
      );
    },
    getCloseButton() {
      const { closeText } = this;
      if (closeText === '') return null;
      return (
        <div class="omi-action-sheet__cancel">
          <div class="omi-action-sheet__cancel--button" onClick={this.handleCancel}>
            {closeText}
          </div>
        </div>
      );
    },
    getHeader() {
      if (this.$slots.header) return this.$slots.header;
      let title = null;
      if (this.title) {
        title = (
          <div class="omi-action-sheet__title--wrapper" style={this.titleStyles}>
            <div class="omi-action-sheet__title">{this.title}</div>
            {
              this.subtitle
              && <div class="omi-action-sheet__subtitle">{this.subtitle}</div>
            }
          </div>
        );
      }
      return title;
    },
    getCloseIcon() {
      if (!this.closeIcon) return null;
      return (
        <div class="omi-action-sheet__close omi-icon__wrapper" onClick={this.close}>
          <omi-icon type="close"></omi-icon>
        </div>
      );
    },
    onOpen(e) {
      this.$emit('open', e);
    },
    onclose(e) {
      this.$emit('close', e);
    },
    getTextALign(prop) {
      if (!prop) return null;
      return `text-align: ${prop}`;
    },
  },
  computed: {
    shouldRenderHeader() {
      return this.$slots.header || this.title || this.subtitle;
    },
    contentStyles() {
      return this.getTextALign(this.contentAlign);
    },
    titleStyles() {
      return this.getTextALign(this.titleAlign);
    },
    actionStyles() {
      return `z-index: ${this.getZindex}`;
    },
    wapperClasses() {
      const { safeAreaInsetBottom, round, className } = this;
      return {
        'omi-action-sheet': true,
        'omi-action-sheet__round': round,
        'omi-save-area-inset-bottom': safeAreaInsetBottom,
        [className]: className,
      };
    },
  },
  render() {
    if (!this.shouldRender) return null;
    return (
      <transition
        name="slide-in-bottom"
        onAfterEnter={this.onOpen}
        onAfterLeave={this.onclose}
      >
        <div class={this.wapperClasses} style={this.actionStyles}>
          {
            this.shouldRenderHeader
            && <div class="omi-action-sheet__header">
              {
                this.$slots['left-icon'] && <div class="omi-action-sheet__header--icon">
                  {this.$slots['left-icon']}
                </div>
              }
              {this.getHeader()}
              {this.getCloseIcon()}
            </div>
          }
          <div class="omi-action-sheet__content">
            {this.getLoadingContent()}
            {this.getContent()}
            {this.getCloseButton()}
          </div>
        </div>
      </transition >
    );
  },
});
export default ActionSheet();

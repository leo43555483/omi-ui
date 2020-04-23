
import popMixin from '../../mixins/popup';
import { isFunction } from '../../../src/utils/shared';

const ActionSheet = () => ({
  name: 'OmiActionSheet',
  mixins: [popMixin()],
  props: {
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
      default: true,
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
    onOpen(e) {
      this.$emit('open', e);
    },
    onclose(e) {
      this.$emit('close', e);
    },
  },
  computed: {
    actionStyles() {
      return `z-index: ${this.getZindex}`;
    },
    wapperClasses() {
      const { safeAreaInsetBottom, round } = this;
      // const saveAreaClass = safeAreaInsetBottom ? 'omi-save-area-inset-bottom' : '';

      return {
        'omi-action-sheet': true,
        'omi-action-sheet__round': round,
        'omi-save-area-inset-bottom': safeAreaInsetBottom,
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
          <div class="omi-action-sheet__title">{this.title}</div>
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

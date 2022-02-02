import popMixin from '../../mixins/popup';
import swipeMixin from '../../mixins/swipe';
import Icon from '../../icon';
import Image from '../../image';
import props from './props';
import { unDef, isString, isPromise } from '../../utils/shared';

const ImagePreview = () => ({
  name: 'OmiImagePreview',
  inheritAttrs: false,
  mixins: [popMixin(), swipeMixin('images')],
  props: {
    ...props,
  },
  methods: {
    beforeClose(...args) {
      const { onClose } = this;
      const promise = onClose(...args);
      if (isPromise(promise)) {
        promise.then(() => this.close());
      } else {
        // close is triggered by popMixin
        this.close();
      }
    },
    onClick(target) {
      if (target !== 'close' && this.showClose) return;
      const { activeIndex } = this;
      this.beforeClose(activeIndex);
    },
    getSlot(slotName) {
      if (!unDef(this.$scopedSlots) && !unDef(this.$scopedSlots[slotName])) {
        return this.$scopedSlots[slotName];
      }
      return null;
    },
    getHeader() {
      const customHeader = this.getSlot('header');
      if (!unDef(customHeader)) {
        return (
          <div class="omi-image-preview__header">
            {customHeader(this.activeIndex)}
          </div>
        );
      }
      if (!this.showClose) return null;
      return (
        <div class="omi-image-preview__header">
          <div class="omi-image-preview__close" onClick={() => this.onClick('close')}>
            <Icon type="close" size={22}/>
          </div>
        </div>
      );
    },
    getBody() {
      const genList = this.getSwipeBody('omi-imgae-preview__body');
      let children;
      const imageProps = {
        attrs: this.$attrs,
        props: {
          placeholderHeight: this.placeholderHeight,
        },
      };
      return genList((swipeCls, itemStyle) => {
        children = this.images.map((img) => (
          <div
            class={[swipeCls, 'omi-image-preview__item']}
            style={itemStyle}
          >
            {
              !unDef(img)
              && isString(img)
              && <Image class="omi-image-preview__img" src={img} {...imageProps}/>
            }
          </div>
        ));
        this.children = children;
        return children;
      });
    },
    getFooter() {
      const { listLength } = this;
      const indicator = `${this.activeIndex + 1} / ${listLength}`;
      const customIndicator = this.getSlot('indicator');
      if (customIndicator) {
        return (
        <div class="omi-image-preview__footer">
          {customIndicator(this.activeIndex)}
        </div>
        );
      }
      return (
        <div class="omi-image-preview__footer">
          <span class="omi-image-preview__indicator">
            {indicator}
          </span>
        </div>
      );
    },
  },
  computed: {
    wrapperStyles() {
      return {
        zIndex: this.getZindex + 1,
      };
    },
  },
  render() {
    if (!this.shouldRender) return null;
    return (
      <transition name="fade-in" appear>
        <div class="omi-image-preview"
          vShow={this.value}
          style={this.wrapperStyles}
          onClick={() => this.onClick()}
        >
          {this.getHeader()}
          {this.getBody()}
          {this.getFooter()}
        </div>
      </transition>
    );
  },
});

export default ImagePreview();

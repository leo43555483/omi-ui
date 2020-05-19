import popMixin from '../../mixins/popup';
import swipeMixin from '../../mixins/swipe';

import props from './props';
import { unDef, isString, isPromise } from '../../../src/utils/shared';

const ImagePreview = () => ({
  name: 'OmiImagePreview',
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
    onClick() {
      const { activeIndex } = this;
      this.beforeClose(activeIndex);
    },
    getSlot(slotName) {
      if (!unDef(this.$slot) && !unDef(this.$slot[slotName])) return this.$slot[slotName];
      return null;
    },
    getHeader() {
      return this.getSlot('header');
    },
    getBody() {
      const genList = this.getSwipeBody('omi-imgae-preview__body');
      let children;
      return genList((swipeCls, itemStyle) => {
        children = this.images.map((img) => (
          <div
            class={[swipeCls, 'omi-image-preview__item']}
            style={itemStyle}
          >
            {!unDef(img) && isString(img) && <img class="omi-image-preview__img" src={img}/>}
          </div>
        ));
        this.children = children;
        return children;
      });
    },
    getFooter() {
      const { listLength } = this;
      const indicator = `${this.activeIndex + 1} / ${listLength}`;
      const customIndicator = this.$scopedSlots.indicator;
      if (customIndicator) {
        return (
        <div class="omi-image-preview__footer">
          {customIndicator(this.activeIndex, listLength)}
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
          onClick={this.onClick}
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

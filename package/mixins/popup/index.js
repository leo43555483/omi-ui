import portal from '../portal';
import overLayMixin from './overlay';
import { on, off, removeElement } from '../../../src/utils/dom';

let overlay = null;
const baseZindex = 1000;
const popProps = {
  popClose: {
    type: Boolean,
    default: true,
  },
  value: {
    type: Boolean,
    default: false,
  },
  clickClose: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
};
let seed = 0;
export default function () {
  return {
    mixins: [portal(), overLayMixin],
    props: popProps,
    data() {
      return {
        onBindPopState: false,
        hasRendered: false,
      };
    },
    watch: {
      value(open) {
        if (open) {
          this.open();
        } else {
          this.close();
        }
      },
    },
    methods: {
      open() {
        if (!overlay) {
          this.renderOverLay();
        }
        this.portalTo();
        if (!this.onBindPopState && this.popClose) {
          on(window, 'popstate', this.bindPopState);
          this.onBindPopState = true;
        }
        this.hasRendered = true;
      },
      close() {
        if (!this.hasRendered) return;
        if (overlay) {
          this.destroyOverlay(overlay, () => { overlay = null; });
        }
        this.unbindPopState();
        this.hasRendered = false;
        this.$emit('input', false);
      },
      unLoadImmediately(target) {
        target.$destroy();
        removeElement(target.$el);
        this.unlockScroll();
      },
      renderOverLay() {
        if (this.$isServer) return;
        // const { overlay } = this;
        if (!overlay) {
          overlay = this.mountOverlay();
          seed += 1;
        }
        overlay.show = true;
      },
      portalTo() {
        if (this.$isServer) return;
        this.$nextTick(() => {
          this.portal(this.$el);
        });
      },
      bindPopState() {
        if (!this.onBindPopState) return;
        this.unLoadImmediately(this);
        this.unLoadImmediately(overlay);
        overlay = null;
        this.unbindPopState();
      },

      unbindPopState() {
        const { $isServer, onBindPopState } = this;
        if ($isServer || !onBindPopState) return;
        this.$nextTick(() => {
          off(window, 'popstate', this.bindPopState);
          this.onBindPopState = false;
        });
      },
    },
    computed: {
      shouldRender() {
        return this.value;
      },
      getZindex() {
        return baseZindex + seed;
      },
    },
    mounted() {
      if (this.shouldRender) {
        this.open();
      }
    },
  };
}

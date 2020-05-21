import Loading from '../../loading';
import Icon from '../../icon';
import { unDef } from '../../../src/utils/shared';

const isNumber = (value) => /^\d*$/.test(value);
const formatSize = (value) => {
  if (unDef(value)) return null;
  let size = String(value);
  size = isNumber(size) ? `${size}px` : size;
  return size;
};

const DEFAULT_PLACEHOLER_WIDTH = '100%';
const DEFAULT_PLACEHOLER_HEIGHT = '50px';
const DEFAULT_ICON_SIZE = 24;
const Image = () => ({
  name: 'OmiImage',
  data() {
    return {
      binded: false,
      loaded: false,
      error: false,
    };
  },
  props: {
    placeholderWidth: {
      type: [String, Number],
      default: DEFAULT_PLACEHOLER_WIDTH,
    },
    placeholderHeight: {
      type: [String, Number],
      default: DEFAULT_PLACEHOLER_HEIGHT,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    width: {
      type: [String, Number],
      default: null,
    },
    lazyLoad: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: '',
    },
    iconSize: {
      type: Number,
      default: DEFAULT_ICON_SIZE,
    },
  },
  methods: {
    isSameNode(el) {
      return el === this.$refs.img;
    },
    onLoad() {
      this.loaded = true;
      this.$emit('loaded', this.$refs.img);
    },
    onError() {
      this.loaded = true;
      this.error = true;
      this.$emit('error', this.$refs.img);
    },
    getImage() {
      const { src } = this;
      const props = {
        attrs: this.$attrs,
      };
      if (this.lazyLoad) {
        return (
          <img class="omi-image__img" ref="img" vLazy={src} {...props}/>
        );
      }
      return (
        <img
          class="omi-image__img"
          src={src}
          ref="img"
          onLoad={this.onLoad}
          onError={this.onError}
          {...props}
        />
      );
    },
    getPlaceholder() {
      if (!this.loaded) {
        return (
          <div class="omi-image__placeholder" key="omiImagePlaceholder">
            {this.$slots.loading || (
              <div class="omi-image__loading omi-icon__wrapper">
                <Loading size={this.iconSize} spinner/>
              </div>
            )}
        </div>
        );
      }
      if (this.error) {
        return (
          <div class="omi-image__placeholder" key="omiImagePlaceholder">
            {this.$slots.error || (
              <div class="omi-image__error omi-icon__wrapper">
                <Icon size={this.iconSize} type="prompt"/>
              </div>
            )}
          </div>
        );
      }
      return null;
    },
    onLazyLoaded({ el }) {
      if (this.isSameNode(el) && !this.loaded) this.loaded = true;
    },
    onLazyError({ el }) {
      if (this.isSameNode(el) && !this.error) this.error = true;
    },
    bindLazyLoad() {
      const { $Lazyload } = this;
      if ($Lazyload && !this.binded) {
        $Lazyload.$on('loaded', this.onLazyLoaded);
        $Lazyload.$on('error', this.onLazyError);
        this.binded = true;
      }
    },
    unbindLazyLoad() {
      const { $Lazyload } = this;
      if ($Lazyload && this.binded) {
        $Lazyload.$off('loaded', this.onLazyLoaded);
        $Lazyload.$off('error', this.onLazyError);
        this.binded = false;
      }
    },
  },
  computed: {
    showPlaceholder() {
      return this.error || !this.loaded;
    },
    wrapperStyles() {
      const width = formatSize(this.width);
      const height = formatSize(this.height);
      const placeholderHeight = formatSize(this.placeholderHeight);
      const placeholderWidth = formatSize(this.placeholderWidth);
      return {
        width: this.showPlaceholder ? placeholderWidth : width,
        height: this.showPlaceholder ? placeholderHeight : height,
      };
    },
  },
  mounted() {
    this.bindLazyLoad();
  },
  beforeDestroy() {
    this.unbindLazyLoad();
  },
  render() {
    return (
      <div class="omi-image" style={this.wrapperStyles}{...{ on: this.$listeners }}>
        {this.getImage()}
        {this.getPlaceholder()}
      </div>
    );
  },
});

export default Image();

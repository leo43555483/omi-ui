export const overLayProps = {
  show: {
    type: Boolean,
    default: false,
  },
};

const OverLay = () => ({
  name: 'OmiOverlay',
  props: overLayProps,
  data() {
    return {
      zIndex: 0,
    };
  },
  methods: {
    setZindex(zIndex) {
      this.zIndex = zIndex;
    },
    onClick() {
      this.$emit('clickOverlay');
    },
  },
  computed: {
    styles() {
      const { zIndex } = this;
      return { zIndex };
    },
  },
  render() {
    if (!this.show) return null;
    return (
      <transition name="fade-in" appear>
        <div class="omi-overlay" style={this.styles} onClick={this.onClick}></div>
      </transition>
    );
  },
});
export default OverLay;

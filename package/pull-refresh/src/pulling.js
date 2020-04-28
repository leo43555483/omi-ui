import Loading from '../../loading';

const Pulling = () => ({
  props: {
    threshold: {
      type: Number,
      default: 0,
    },
    distance: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    showIndex: {
      handler(index) {
        if (this.$refs.loading) this.$refs.loading.show(index);
      },
      immediate: true,
    },
  },
  computed: {
    showIndex() {
      const { threshold, distance } = this;
      return parseInt(((distance + 1) / Math.round(threshold / 12)), 10);
    },
  },
  render() {
    return (
      <div class="omi-pull-refresh__spinner">
        <Loading ref="loading" lazyShow spinner/>
      </div>
    );
  },
});
export default Pulling();

export const STATUS_RESET = 'reset';
export const STATUS_PULLING = 'pulling';
export const STATUS_OVER_THRESHOLD = 'overThreshold';
export const STATUS_LOSING = 'losing';
export const STATUS_REFRESHING = 'refresh';
export const STATUS_DONE = 'done';

export default {
  data() {
    return {
      status: STATUS_RESET,
    };
  },
  methods: {
    [STATUS_RESET]() {
      const { status } = this;
      if (STATUS_RESET !== status) this.status = STATUS_RESET;
      this.restPostion(0);
    },
    [STATUS_PULLING](touchEnd) {
      const { status } = this;
      if (status !== STATUS_PULLING) {
        this.status = STATUS_PULLING;
      }
      if (touchEnd) {
        this[STATUS_RESET]();
      }
    },
    [STATUS_OVER_THRESHOLD]() {
      this.status = STATUS_OVER_THRESHOLD;
    },
    [STATUS_LOSING](touchEnd, losed) {
      const { status, threshold } = this;
      if (status === STATUS_RESET || status === STATUS_DONE) return;
      if (status !== STATUS_LOSING) {
        this.status = STATUS_LOSING;
        this.restPostion(threshold);
      }
      if (losed) {
        this.$emit('input', true);
      }
    },
    [STATUS_REFRESHING]() {
      this.$emit('refresh');
      this.status = STATUS_DONE;
    },
    [STATUS_DONE]() {
      this.showSuccess().then(() => {
        this[STATUS_PULLING](true);
      });
    },
  },
  computed: {
    isPulling() {
      return this.status === STATUS_PULLING;
    },
    isOverThreshold() {
      return this.status === STATUS_OVER_THRESHOLD;
    },
    isLosing() {
      return this.status === STATUS_LOSING;
    },
    isDone() {
      return this.status === STATUS_DONE;
    },
    isRefreshing() {
      return this.status === STATUS_REFRESHING;
    },
  },
};

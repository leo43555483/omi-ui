var _methods;

var STATUS_RESET = 'reset';
var STATUS_PULLING = 'pulling';
var STATUS_OVER_THRESHOLD = 'overThreshold';
var STATUS_LOSING = 'losing';
var STATUS_REFRESHING = 'refresh';
var STATUS_DONE = 'done';
var statusMixin = {
  data: function data() {
    return {
      status: STATUS_RESET
    };
  },
  methods: (_methods = {}, _methods[STATUS_RESET] = function () {
    var status = this.status,
        isHolding = this.isHolding,
        distance = this.distance;
    if (STATUS_RESET !== status) this.status = STATUS_RESET;
    if (!isHolding && distance > 0) this.restPostion(0);
  }, _methods[STATUS_PULLING] = function (touchEnd) {
    var status = this.status;

    if (status !== STATUS_PULLING) {
      this.status = STATUS_PULLING;
    }

    if (touchEnd) {
      this[STATUS_RESET]();
    }
  }, _methods[STATUS_OVER_THRESHOLD] = function () {
    this.status = STATUS_OVER_THRESHOLD;
  }, _methods[STATUS_LOSING] = function (touchEnd, losed) {
    var status = this.status,
        threshold = this.threshold;
    if (status === STATUS_RESET || status === STATUS_DONE) return;

    if (status !== STATUS_LOSING) {
      this.status = STATUS_LOSING;
      this.restPostion(threshold);
    }

    if (losed) {
      this.$emit('input', true);
    }
  }, _methods[STATUS_REFRESHING] = function () {
    if (this.isReset) {
      this.restPostion(this.threshold);
    }

    this.$emit('refresh');
    this.status = STATUS_DONE;
  }, _methods[STATUS_DONE] = function () {
    var _this = this;

    this.showSuccess().then(function () {
      _this[STATUS_PULLING](true);
    });
  }, _methods),
  computed: {
    isReset: function isReset() {
      return this.status === STATUS_RESET;
    },
    isPulling: function isPulling() {
      return this.status === STATUS_PULLING;
    },
    isOverThreshold: function isOverThreshold() {
      return this.status === STATUS_OVER_THRESHOLD;
    },
    isLosing: function isLosing() {
      return this.status === STATUS_LOSING;
    },
    isDone: function isDone() {
      return this.status === STATUS_DONE;
    },
    isRefreshing: function isRefreshing() {
      return this.refreshing;
    }
  }
};

export { STATUS_DONE, STATUS_LOSING, STATUS_OVER_THRESHOLD, STATUS_PULLING, STATUS_REFRESHING, STATUS_RESET, statusMixin as default };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var DEFAULT_SIZE = 24;
var DEFAULT_FILL_COLOR = '#ffbb2a';
var DEFAULT_VOID_COLOR = '#ddd';
var script = {
  name: 'OmiRate',
  model: {
    prop: 'score'
  },
  props: {
    voidColor: {
      type: String,
      default: DEFAULT_VOID_COLOR
    },
    fillColor: {
      type: String,
      default: DEFAULT_FILL_COLOR
    },
    size: {
      type: Number,
      default: DEFAULT_SIZE
    },
    total: {
      type: Number,
      default: 5
    },
    score: {
      type: Number,
      default: 0
    },
    readonly: {
      type: Boolean,
      default: false
    },
    halfRate: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick: function onClick(i, e) {
      if (this.readonly) return;
      var score = i;

      if (this.halfRate) {
        score = this.isOverHald(e) ? i : i - 0.5;
      }

      this.$emit('input', score);

      if (score !== this.score) {
        this.$emit('change', score);
      }
    },
    isOverHald: function isOverHald(e) {
      var clientWidth = e.target.clientWidth;
      return e.offsetX >= clientWidth / 2;
    },
    getKey: function getKey(index) {
      return Date.now() + "_" + index;
    },
    getWidth: function getWidth(i) {
      var score = this.score;
      var ceil = Math.ceil(score);
      var width;

      if (i < score) {
        width = '100%';
      }

      if (i === ceil) {
        width = this.figureHalf(score);
      }

      return width;
    },
    figureHalf: function figureHalf(number) {
      var floor = Math.floor(number);
      var ceil = Math.ceil(number);

      if (ceil === number) {
        return '100%';
      }

      var digit = (number - floor) * 100;
      return digit + "%";
    },
    innerStyles: function innerStyles(index) {
      var width = 0;

      if (Math.ceil(this.score) >= index) {
        width = this.getWidth(index);
      }

      return {
        'font-size': this.size + "px",
        color: this.fillColor,
        width: "" + width
      };
    }
  },
  computed: {
    itemStyles: function itemStyles() {
      return {
        'font-size': this.size + "px",
        color: this.voidColor
      };
    },
    getInnerClass: function getInnerClass() {
      return ['omi-rate__item--inner', 'omi-icon-font', 'omi-collection_fill'];
    }
  }
};

export { script as default };

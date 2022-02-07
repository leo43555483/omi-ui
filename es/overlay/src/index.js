import overLayProps from './props.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var OverLay = function OverLay() {
  return {
    name: 'OmiOverlay',
    props: _extends({}, overLayProps),
    data: function data() {
      return {
        zIndex: 0
      };
    },
    methods: {
      setZindex: function setZindex(zIndex) {
        this.zIndex = zIndex;
      },
      onClick: function onClick() {
        this.$emit('clickOverlay');
      }
    },
    computed: {
      styles: function styles() {
        var zIndex = this.zIndex;
        return {
          zIndex: zIndex
        };
      }
    },
    render: function render() {
      var h = arguments[0];
      if (!this.show) return null;
      return h("transition", {
        "attrs": {
          "name": "fade-in",
          "appear": true
        }
      }, [h("div", {
        "class": ['omi-overlay', this.overlayClassName],
        "style": this.styles,
        "on": {
          "click": this.onClick
        }
      })]);
    }
  };
};

export { OverLay as default };

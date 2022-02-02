import popMixin from '../../mixins/popup/index.js';
import { isFunction } from '../../utils/shared.js';
import '../../loading/index.js';
import '../../icon/index.js';
import Loading from '../../loading/src/index.vue.js';
import Icon from '../../icon/src/index.vue.js';

var ActionSheet = function ActionSheet() {
  return {
    name: 'OmiActionSheet',
    mixins: [popMixin()],
    props: {
      className: {
        type: String,
        default: null
      },
      subtitle: {
        type: String,
        default: ''
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      round: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      closeIcon: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      closeText: {
        type: String,
        default: ''
      },
      onCancel: {
        type: Function,
        default: null
      },
      loading: {
        type: Boolean,
        default: false
      },
      // loading type
      spinner: {
        type: Boolean,
        default: false
      },
      titleAlign: {
        type: String,
        default: null
      },
      contentAlign: {
        type: String,
        default: null
      }
    },
    methods: {
      handleCancel: function handleCancel(e) {
        var onCancel = this.onCancel;
        if (isFunction(onCancel)) onCancel(e);else this.$emit('input', false);
      },
      onSelect: function onSelect(payload) {
        var _this = this;

        return function () {
          if (payload.disable) return;

          _this.$emit('select', payload);
        };
      },
      getLoadingContent: function getLoadingContent() {
        var h = this.$createElement;
        if (!this.loading) return null;
        return h("div", {
          "class": "omi-action-sheet__loading omi-icon__wrapper"
        }, [h(Loading, {
          "attrs": {
            "spinner": this.spinner
          }
        })]);
      },
      getContent: function getContent() {
        var Slot = this.$slots.default;
        var getDataList = this.getDataList;

        if (Slot) {
          return Slot;
        }

        return getDataList();
      },
      getDataList: function getDataList() {
        var _this2 = this;

        var h = this.$createElement;
        var data = this.data;
        return h("transition", {
          "attrs": {
            "name": "fade-in"
          }
        }, [h("ul", {
          "directives": [{
            name: "show",
            value: !this.loading
          }],
          "class": "omi-action-sheet__list"
        }, [data.map(function (item) {
          var className = item.className,
              content = item.content,
              disable = item.disable;
          var disableClass = disable ? 'omi-action-sheet__item--disable' : null;
          var originClass = ['omi-action-sheet__item', 'omi-border__top'];
          return h("li", {
            "class": [].concat(originClass, [className, disableClass]),
            "style": _this2.contentStyles,
            "on": {
              "click": _this2.onSelect(item)
            }
          }, [content]);
        })])]);
      },
      getCloseButton: function getCloseButton() {
        var h = this.$createElement;
        var closeText = this.closeText;
        if (closeText === '') return null;
        return h("div", {
          "class": "omi-action-sheet__cancel"
        }, [h("div", {
          "class": "omi-action-sheet__cancel--button",
          "on": {
            "click": this.handleCancel
          }
        }, [closeText])]);
      },
      getHeader: function getHeader() {
        var h = this.$createElement;
        if (this.$slots.header) return this.$slots.header;
        var title = null;

        if (this.title) {
          title = h("div", {
            "class": "omi-action-sheet__title--wrapper",
            "style": this.titleStyles
          }, [h("div", {
            "class": "omi-action-sheet__title"
          }, [this.title]), this.subtitle && h("div", {
            "class": "omi-action-sheet__subtitle"
          }, [this.subtitle])]);
        }

        return title;
      },
      getCloseIcon: function getCloseIcon() {
        var h = this.$createElement;
        if (!this.closeIcon) return null;
        return h("div", {
          "class": "omi-action-sheet__close omi-icon__wrapper",
          "on": {
            "click": this.close
          }
        }, [h(Icon, {
          "attrs": {
            "type": "close"
          }
        })]);
      },
      onOpen: function onOpen(e) {
        this.$emit('open', e);
      },
      onclose: function onclose(e) {
        this.$emit('close', e);
      },
      getTextALign: function getTextALign(prop) {
        if (!prop) return null;
        return "text-align: " + prop;
      }
    },
    computed: {
      shouldRenderHeader: function shouldRenderHeader() {
        return this.$slots.header || this.title || this.subtitle || this.$slots['left-icon'];
      },
      contentStyles: function contentStyles() {
        return this.getTextALign(this.contentAlign);
      },
      titleStyles: function titleStyles() {
        return this.getTextALign(this.titleAlign);
      },
      actionStyles: function actionStyles() {
        return "z-index: " + this.getZindex;
      },
      wapperClasses: function wapperClasses() {
        var _ref;

        var safeAreaInsetBottom = this.safeAreaInsetBottom,
            round = this.round,
            className = this.className;
        return _ref = {
          'omi-action-sheet': true,
          'omi-action-sheet__round': round,
          'omi-save-area-inset-bottom': safeAreaInsetBottom
        }, _ref[className] = className, _ref;
      }
    },
    render: function render() {
      var h = arguments[0];
      if (!this.shouldRender) return null;
      return h("transition", {
        "attrs": {
          "name": "slide-in-bottom"
        },
        "on": {
          "afterEnter": this.onOpen,
          "afterLeave": this.onclose
        }
      }, [h("div", {
        "class": this.wapperClasses,
        "style": this.actionStyles
      }, [this.shouldRenderHeader && h("div", {
        "class": "omi-action-sheet__header"
      }, [this.$slots['left-icon'] && h("div", {
        "class": "omi-action-sheet__header--icon"
      }, [this.$slots['left-icon']]), this.getHeader(), this.getCloseIcon()]), h("div", {
        "class": "omi-action-sheet__content"
      }, [this.getLoadingContent(), this.getContent(), this.getCloseButton()])])]);
    }
  };
};

var ActionSheet$1 = ActionSheet();

export { ActionSheet$1 as default };

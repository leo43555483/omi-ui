import popMixin from '../../mixins/popup/index.js';
import '../../button/index.js';
import '../../form/index.js';
import '../../form-item/index.js';
import '../../input/index.js';
import { oneOf, isPromise } from '../../utils/shared.js';
import dialogType from './dialog-type.js';
import Form from '../../form/src/index.vue.js';
import FormItem from '../../form-item/src/index.vue.js';
import Input from '../../input/src/index.vue.js';
import Button from '../../button/src/index.vue.js';

var Dialog = function Dialog() {
  return {
    name: 'OmiDialog',
    mixins: [popMixin()],
    data: function data() {
      return {
        promptField: {
          value: ''
        }
      };
    },
    props: {
      type: {
        type: String,
        defualt: 'alert',
        validator: function validator(value) {
          return oneOf(value, dialogType);
        }
      },
      clickClose: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      showCancel: {
        type: Boolean,
        default: true
      },
      showConfirm: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: ''
      },
      confirmText: {
        type: String,
        default: ''
      },
      prompt: {
        type: Object,
        default: function _default() {
          return {
            value: '',
            rules: [],
            placeholder: ''
          };
        }
      }
    },
    watch: {
      prompt: function prompt(fresh, old) {
        if (fresh.value !== old.value) {
          this.promptField.value = fresh.value;
        }
      }
    },
    methods: {
      generateWrapper: function generateWrapper(cls) {
        var h = this.$createElement;

        for (var _len = arguments.length, child = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          child[_key - 1] = arguments[_key];
        }

        return h("div", {
          "class": cls
        }, [].concat(child));
      },
      getTitle: function getTitle() {
        if (!this.title && !this.$slots.title) return null;
        if (this.$slots.title) this.generateWrapper('omi-dialog__header', this.title);
        return this.generateWrapper('omi-dialog__header', this.title);
      },
      getForm: function getForm() {
        var _this = this;

        var h = this.$createElement;
        return h(Form, {
          "ref": "form",
          "attrs": {
            "models": this.promptField
          }
        }, [h(FormItem, {
          "attrs": {
            "name": "value",
            "rules": this.prompt.rules
          }
        }, [h(Input, {
          "ref": "input",
          "attrs": {
            "value": this.promptField.vaule,
            "placeholder": this.prompt.placeholder
          },
          "on": {
            "input": function input(value) {
              _this.promptField.value = value;
            }
          }
        })])]);
      },
      getContent: function getContent() {
        if (this.$slots.default) return this.generateWrapper('omi-dialog__body', this.$slots.default);
        var contents = [];

        if (this.content) {
          var text = this.generateWrapper('omi-dialog__body--content', this.content);
          contents.push(text);
        }

        if (this.type === 'prompt') {
          var form = this.getForm();
          contents.push(form);
        }

        if (contents.length) return this.generateWrapper('omi-dialog__body', contents);
        return null;
      },
      handleCancel: function handleCancel(e) {
        this.close();
        this.onCancel(e);
      },
      beforeConfirm: function beforeConfirm() {
        var _this2 = this;

        var onConfirm = this.onConfirm;
        var promise = onConfirm.apply(void 0, arguments);

        if (isPromise(promise)) {
          promise.then(function () {
            return _this2.close();
          });
        } else {
          this.close();
        }
      },
      handleConfirm: function handleConfirm(e) {
        var _this3 = this;

        if (this.type === 'prompt') {
          this.$refs.form.validate().then(function (err) {
            var arg = _this3.promptField.value;

            _this3.beforeConfirm(err, arg);
          });
        } else {
          this.beforeConfirm(e);
        }
      },
      getFooter: function getFooter() {
        var h = this.$createElement;
        var showCancel = this.showCancel,
            showConfirm = this.showConfirm;
        if (!showCancel && !showConfirm) return null;
        return h("div", {
          "class": "omi-dialog__footer omi-border__top"
        }, [showCancel && h(Button, {
          "attrs": {
            "block": true,
            "type": "default",
            "text": this.cancelText
          },
          "class": this.buttonClasses,
          "on": {
            "click": this.handleCancel
          }
        }), showConfirm && h(Button, {
          "attrs": {
            "block": true,
            "type": "default",
            "text": this.confirmText
          },
          "on": {
            "click": this.handleConfirm
          }
        })]);
      }
    },
    computed: {
      buttonClasses: function buttonClasses() {
        var showCancel = this.showCancel,
            showConfirm = this.showConfirm;
        return {
          'omi-border__right': showCancel && showConfirm
        };
      },
      wrapperStyles: function wrapperStyles() {
        return {
          zIndex: this.getZindex
        };
      }
    },
    mounted: function mounted() {
      var _this4 = this;

      this.$nextTick(function () {
        if (_this4.type === 'prompt') {
          setTimeout(function () {
            _this4.$refs.input.focus();
          }, 50);
        }
      });
    },
    render: function render() {
      var h = arguments[0];
      if (!this.shouldRender) return null;
      return h("transition", {
        "attrs": {
          "name": "pop-in",
          "appear": true
        }
      }, [h("div", {
        "class": "omi-dialog__wrapper",
        "style": this.wrapperStyles
      }, [h("div", {
        "class": "omi-dialog"
      }, [this.getTitle(), this.getContent(), this.getFooter()])])]);
    }
  };
};

var VueDialog = Dialog();

export { VueDialog as default };

import popMixin from '../../mixins/popup';
import Button from '../../button';
import Form from '../../form';
import FormItem from '../../form-item';
import Input from '../../input';
import { isPromise, oneOf } from '../../utils/shared';
import dialogType from './dialog-type';

const Dialog = () => ({
  name: 'OmiDialog',
  mixins: [popMixin()],
  data() {
    return {
      promptField: {
        value: '',
      },
    };
  },
  props: {
    type: {
      type: String,
      defualt: 'alert',
      validator(value) {
        return oneOf(value, dialogType);
      },
    },
    clickClose: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    showConfirm: {
      type: Boolean,
      default: false,
    },
    cancelText: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '',
    },
    prompt: {
      type: Object,
      default: () => ({
        value: '',
        rules: [],
        placeholder: '',
      }),
    },
  },
  watch: {
    prompt(fresh, old) {
      if (fresh.value !== old.value) {
        this.promptField.value = fresh.value;
      }
    },
  },
  methods: {
    generateWrapper(cls, ...child) {
      return <div class={cls}>{...child}</div>;
    },
    getTitle() {
      if (!this.title && !this.$slots.title) return null;
      if (this.$slots.title) this.generateWrapper('omi-dialog__header', this.title);
      return this.generateWrapper('omi-dialog__header', this.title);
    },
    getForm() {
      return (
        <Form ref="form" models={this.promptField}>
          <FormItem name="value" rules={this.prompt.rules}>
            <Input
              ref="input"
              value={this.promptField.vaule}
              onInput={(value) => { this.promptField.value = value; }}
              placeholder={this.prompt.placeholder}
            />
          </FormItem>
        </Form>
      );
    },
    getContent() {
      if (this.$slots.default) return this.generateWrapper('omi-dialog__body', this.$slots.default);
      const contents = [];
      if (this.content) {
        const text = this.generateWrapper('omi-dialog__body--content', this.content);
        contents.push(text);
      }
      if (this.type === 'prompt') {
        const form = this.getForm();
        contents.push(form);
      }
      if (contents.length) return this.generateWrapper('omi-dialog__body', contents);
      return null;
    },
    handleCancel(e) {
      this.close();
      this.onCancel(e);
    },
    beforeConfirm(...args) {
      const { onConfirm } = this;
      const promise = onConfirm(...args);
      if (isPromise(promise)) {
        promise.then(() => this.close());
      } else {
        this.close();
      }
    },
    handleConfirm(e) {
      if (this.type === 'prompt') {
        this.$refs.form.validate().then((err) => {
          const arg = this.promptField.value;
          this.beforeConfirm(err, arg);
        });
      } else {
        this.beforeConfirm(e);
      }
    },
    getFooter() {
      const { showCancel, showConfirm } = this;
      if (!showCancel && !showConfirm) return null;
      return (
        <div class="omi-dialog__footer omi-border__top">
          {showCancel && (
            <Button
              block
              type="default"
              class={this.buttonClasses}
              text={this.cancelText}
              onClick={this.handleCancel}
            />
          )}
          {showConfirm && (
            <Button
              block
              type="default"
              text={this.confirmText}
              onClick={this.handleConfirm}
            />
          )}
        </div>
      );
    },
  },
  computed: {
    buttonClasses() {
      const { showCancel, showConfirm } = this;
      return {
        'omi-border__right': showCancel && showConfirm,
      };
    },
    wrapperStyles() {
      return {
        zIndex: this.getZindex,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.type === 'prompt') {
        setTimeout(() => {
          this.$refs.input.focus();
        }, 50);
      }
    });
  },
  render() {
    if (!this.shouldRender) return null;
    return (
      <transition name="pop-in" appear>
        <div class="omi-dialog__wrapper" style={this.wrapperStyles}>
          <div class="omi-dialog" >
            {this.getTitle()}
            {this.getContent()}
            {this.getFooter()}
          </div>
        </div>
      </transition>
    );
  },
});
export default Dialog();

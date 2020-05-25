import Icon from '../../icon';
import {
  isPromise, oneOf, isArray, noop,
} from '../../../src/utils/shared';
import { parseFile, isImage } from './utils';
import Image from '../../image';
import Loading from '../../loading';
import Circle from '../../circle';
import ImagePreview from '../../image-preview';

const ADD_DEFAULT_SIZE = 32;
const FILE_TYPE_DATA_URL = 'dataUrl';
const FILE_TYPE_TEXT = 'text';
const FILE_TYPE_FILE = 'file';
const DEFUALT_FILE_TYPE = FILE_TYPE_DATA_URL;
const DEFAULT_STATUS = 'ready';
const UPLOAD_STATUS_SUCCESS = 'sccuess';
const UPLOAD_STATUS_ERROR = 'error';
const DEFUALT_STATUS_ICON_SIZE = 42;
const DEFAULT_CIRCLE_RADIUS = 25;
const Uploader = () => ({
  name: 'OmiUploader',
  inheritAttrs: false,
  model: {
    prop: 'fileList',
  },
  props: {
    showProgress: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readType: {
      type: String,
      default: DEFUALT_FILE_TYPE,
      validator(value) {
        return oneOf(value, [FILE_TYPE_TEXT, FILE_TYPE_DATA_URL, FILE_TYPE_FILE]);
      },
    },
    max: {
      type: Number,
      default: Number.MAX_VALUE,
    },
    deleteAble: {
      type: Boolean,
      default: true,
    },
    afterAdd: {
      type: Function,
      default: (data) => data,
    },
    beforeAdd: {
      type: Function,
      default: () => true,
    },
    statusIconSize: {
      type: Number,
      default: DEFUALT_STATUS_ICON_SIZE,
    },
    onExceed: {
      type: Function,
      defualt: noop,
    },
    circleRadius: {
      type: Number,
      default: DEFAULT_CIRCLE_RADIUS,
    },
    circleColor: {
      type: [String, Object],
      default: null,
    },
  },
  methods: {
    clearInput() {
      this.$refs.uploader.value = '';
    },
    onChange(e) {
      const { files } = e.target;
      if (this.disabled || !files.length) return;
      if (this.fileList.length >= this.max) {
        this.onExceed();
        return;
      }
      const response = this.beforeAdd(files);

      if (isPromise(response)) {
        response.then((data) => {
          const file = data || files;
          this.parseFiles(file);
        }).catch(this.clearInput);
      } else if (!response) {
        this.clearInput();
        return;
      }
      this.parseFiles(files);
    },
    parseFiles(files) {
      let fileList = [];
      if (!isArray(files)) {
        fileList = [].slice.call(files);
      }
      const remaining = this.max - this.fileList.length;
      if (remaining < fileList.length) {
        fileList = fileList.slice(0, remaining);
        this.onExceed();
      }
      Promise.all(fileList.map((file) => parseFile(file, this.readType)))
        .then((contents) => {
          const result = fileList.map((file, index) => {
            const fileItem = {
              file,
              content: contents[index],
              progress: null,
              status: DEFAULT_STATUS,
              closeMask: false,
            };
            return fileItem;
          });
          this.handleFiles(result);
        })
        .catch((file) => {
          this.$emit('readError', file);
          this.clearInput();
        });
    },
    handleFiles(files) {
      const fileList = [...this.fileList, ...files];
      this.$emit('input', fileList);
      this.afterAdd(fileList);
    },
    onPreview(file, index) {
      ImagePreview({
        images: this.imagesUrl,
        initialIndex: index,
        onClose: () => {
          this.$emit('closePreview');
        },
      });
      this.$emit('preview', file);
    },
    onDelete(file) {
      const fileList = [].concat(this.fileList);
      const fileIndex = fileList.indexOf(file);
      fileList.splice(fileIndex, 1);
      this.$emit('input', fileList);
      this.$emit('delete', file);
    },
    getUploader() {
      const CustomUploader = this.$slots.uploader;
      if (CustomUploader) {
        return (
          <div class="omi-uploader__upload--custom">
            {CustomUploader}
            <input
              ref="uploader"
              class="omi-uploader__input"
              type="file"
              onChange={this.onChange}
              accept={this.accept}
              disabled={this.disabled}
              {...{ attrs: this.$attrs }}
            />
        </div>
        );
      }
      return (
        <div class="omi-uploader__upload">
          <Icon type="add" size={ADD_DEFAULT_SIZE}/>
          <input
            ref="uploader"
            class="omi-uploader__input"
            type="file"
            onChange={this.onChange}
            accept={this.accept}
            disabled={this.disabled}
            {...{ attrs: this.$attrs }}
          />
        </div>
      );
    },
    getCloseButton(file) {
      return (
        <div
          class="omi-uploader__close omi-icon__wrapper"
          onClick={() => this.onDelete(file)}
        >
          <Icon type="delete_fill" />
        </div>
      );
    },
    getPreviewMask(file) {
      const { status, closeMask } = file;
      const isSuccess = status === UPLOAD_STATUS_SUCCESS;
      const isError = status === UPLOAD_STATUS_ERROR;
      const showProgress = file.progress >= 0 && !isError && !isSuccess;
      const CustomMask = this.$scopedSlots.mask;
      if (CustomMask) {
        return (
          <div class="omi-uploader__preview--mask" vShow={!closeMask}>
            {CustomMask(file)}
          </div>
        );
      }
      const Progress = (
        <div class="omi-uploader__progress" vShow={showProgress}>
          {this.showProgress
            ? <Circle
              percentage={file.progress}
              circleRadius={this.circleRadius}
              strokeColor={this.circleColor}
              />
            : <Loading />
          }
        </div>
      );
      const Status = (
        <transition name="fade-in">
          <div class="omi-uploader__status" vShow={isSuccess || isError}>
            {isSuccess && <Icon type="success" size={this.statusIconSize}/> }
            {isError && <Icon type="prompt" size={this.statusIconSize}/> }
          </div>
        </transition>
      );
      return (
        <div class="omi-uploader__preview--mask" vShow={!closeMask}>
          {Progress}
          {Status}
        </div>
      );
    },
    getPreview() {
      return this.fileList.map((file, index) => {
        const isImageFile = isImage(file);
        let Inner = null;
        const CustomPreview = this.$scopedSlots.preview;
        if (CustomPreview) {
          return (
            <div class="omi-upload__preview--custom">
              {CustomPreview(file)}
            </div>
          );
        }
        if (isImageFile) {
          Inner = (
            <div class="omi-uploader__image">
              <Image
                src={file.url || file.content}
                onClick={() => this.onPreview(file, index)}
                placeholderHeight="100%"
              />
            </div>
          );
        } else {
          Inner = (
            <div class="omi-uploader__file">
              {<Icon type="document" size={32}/>}
              <span>{file.name}</span>
            </div>
          );
        }
        return (
          <div class="omi-uploader__preview">
            {this.deleteAble && this.getCloseButton(file)}
            {Inner}
            {this.getPreviewMask(file)}
          </div>
        );
      });
    },
  },
  computed: {
    imagesUrl() {
      const list = [];
      this.fileList.forEach((file) => {
        if (isImage(file)) {
          list.push(file.url || file.content);
        }
      });
      return list;
    },
  },
  render() {
    return (
      <div class="omi-uploader">
        <div class="omi-uploader__inner">
          {this.getPreview()}
          {this.getUploader()}
        </div>
      </div>
    );
  },
});
export default Uploader();

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../icon/index.js');
var shared = require('../../utils/shared.js');
var utils = require('./utils.js');
require('../../image/index.js');
require('../../loading/index.js');
require('../../circle/index.js');
require('../../image-preview/index.js');
var index = require('../../image-preview/src/index.js');
var index$1 = require('../../icon/src/index.vue.js');
var index$2 = require('../../circle/src/index.vue.js');
var index$3 = require('../../loading/src/index.vue.js');
var index$4 = require('../../image/src/index.js');

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var ADD_DEFAULT_SIZE = 32;
var FILE_TYPE_DATA_URL = 'dataUrl';
var FILE_TYPE_TEXT = 'text';
var FILE_TYPE_FILE = 'file';
var DEFUALT_FILE_TYPE = FILE_TYPE_DATA_URL;
var DEFAULT_STATUS = 'ready';
var UPLOAD_STATUS_SUCCESS = 'sccuess';
var UPLOAD_STATUS_ERROR = 'error';
var DEFUALT_STATUS_ICON_SIZE = 42;
var DEFAULT_CIRCLE_RADIUS = 25;

var Uploader = function Uploader() {
  return {
    name: 'OmiUploader',
    inheritAttrs: false,
    model: {
      prop: 'fileList'
    },
    props: {
      showProgress: {
        type: Boolean,
        default: true
      },
      accept: {
        type: String,
        default: 'image/*'
      },
      fileList: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readType: {
        type: String,
        default: DEFUALT_FILE_TYPE,
        validator: function validator(value) {
          return shared.oneOf(value, [FILE_TYPE_TEXT, FILE_TYPE_DATA_URL, FILE_TYPE_FILE]);
        }
      },
      max: {
        type: Number,
        default: Number.MAX_VALUE
      },
      deleteAble: {
        type: Boolean,
        default: true
      },
      afterAdd: {
        type: Function,
        default: function _default(data) {
          return data;
        }
      },
      beforeAdd: {
        type: Function,
        default: function _default() {
          return true;
        }
      },
      statusIconSize: {
        type: Number,
        default: DEFUALT_STATUS_ICON_SIZE
      },
      onExceed: {
        type: Function,
        defualt: shared.noop
      },
      circleRadius: {
        type: Number,
        default: DEFAULT_CIRCLE_RADIUS
      },
      circleColor: {
        type: [String, Object],
        default: null
      }
    },
    methods: {
      clearInput: function clearInput() {
        this.$refs.uploader.value = '';
      },
      onChange: function onChange(e) {
        var _this = this;

        var files = [].slice.call(e.target.files); // const { files } = e.target;

        if (this.disabled || !files.length) return;

        if (this.fileList.length >= this.max) {
          this.onExceed();
          return;
        }

        var response = this.beforeAdd(files);

        if (shared.isPromise(response)) {
          response.then(function (data) {
            var file = data || files;

            _this.parseFiles(file);
          }).catch(this.clearInput);
        } else if (!response) {
          this.clearInput();
          return;
        }

        this.parseFiles(files);
      },
      parseFiles: function parseFiles(files) {
        var _this2 = this;

        var fileList = files;

        if (!shared.isArray(files)) {
          fileList = [].slice.call(files);
        }

        var remaining = this.max - this.fileList.length;

        if (remaining < fileList.length) {
          fileList = fileList.slice(0, remaining);
          this.onExceed();
        }

        Promise.all(fileList.map(function (file) {
          return utils.parseFile(file, _this2.readType);
        })).then(function (contents) {
          var result = fileList.map(function (file, index) {
            var fileItem = {
              file: file,
              content: contents[index],
              progress: null,
              status: DEFAULT_STATUS,
              closeMask: false
            };
            return fileItem;
          });

          _this2.handleFiles(result);
        }).catch(function (file) {
          _this2.$emit('readError', file);

          _this2.clearInput();
        });
      },
      handleFiles: function handleFiles(files) {
        var fileList = [].concat(this.fileList, files);
        this.$emit('input', fileList);
        this.afterAdd(fileList);
      },
      onPreview: function onPreview(file, index$1) {
        var _this3 = this;

        index["default"]({
          images: this.imagesUrl,
          initialIndex: index$1,
          onClose: function onClose() {
            _this3.$emit('closePreview');
          }
        });
        this.$emit('preview', file);
      },
      onDelete: function onDelete(file) {
        var fileList = [].concat(this.fileList);
        var fileIndex = fileList.indexOf(file);
        fileList.splice(fileIndex, 1);
        this.$emit('input', fileList);
        this.$emit('delete', file);
      },
      getUploader: function getUploader() {
        var h = this.$createElement;
        var CustomUploader = this.$slots.uploader;

        if (CustomUploader) {
          return h("div", {
            "class": "omi-uploader__upload--custom"
          }, [CustomUploader, h("input", {
            "ref": "uploader",
            "class": "omi-uploader__input",
            "attrs": _extends({
              "type": "file",
              "accept": this.accept,
              "disabled": this.disabled
            }, this.$attrs),
            "on": {
              "change": this.onChange
            }
          })]);
        }

        return h("div", {
          "class": "omi-uploader__upload"
        }, [h(index$1["default"], {
          "attrs": {
            "type": "add",
            "size": ADD_DEFAULT_SIZE
          }
        }), h("input", {
          "ref": "uploader",
          "class": "omi-uploader__input",
          "attrs": _extends({
            "type": "file",
            "accept": this.accept,
            "disabled": this.disabled
          }, this.$attrs),
          "on": {
            "change": this.onChange
          }
        })]);
      },
      getCloseButton: function getCloseButton(file) {
        var _this4 = this;

        var h = this.$createElement;
        return h("div", {
          "class": "omi-uploader__close omi-icon__wrapper",
          "on": {
            "click": function click() {
              return _this4.onDelete(file);
            }
          }
        }, [h(index$1["default"], {
          "attrs": {
            "type": "delete_fill"
          }
        })]);
      },
      getPreviewMask: function getPreviewMask(file) {
        var h = this.$createElement;
        var status = file.status,
            closeMask = file.closeMask;
        var isSuccess = status === UPLOAD_STATUS_SUCCESS;
        var isError = status === UPLOAD_STATUS_ERROR;
        var showProgress = file.progress >= 0 && !isError && !isSuccess;
        var CustomMask = this.$scopedSlots.mask;

        if (CustomMask) {
          return h("div", {
            "class": "omi-uploader__preview--mask",
            "directives": [{
              name: "show",
              value: !closeMask
            }]
          }, [CustomMask(file)]);
        }

        var Progress = h("div", {
          "class": "omi-uploader__progress",
          "directives": [{
            name: "show",
            value: showProgress
          }]
        }, [this.showProgress ? h(index$2["default"], {
          "attrs": {
            "percentage": file.progress,
            "circleRadius": this.circleRadius,
            "strokeColor": this.circleColor
          }
        }) : h(index$3["default"])]);
        var Status = h("transition", {
          "attrs": {
            "name": "fade-in"
          }
        }, [h("div", {
          "class": "omi-uploader__status",
          "directives": [{
            name: "show",
            value: isSuccess || isError
          }]
        }, [isSuccess && h(index$1["default"], {
          "attrs": {
            "type": "success",
            "size": this.statusIconSize
          }
        }), isError && h(index$1["default"], {
          "attrs": {
            "type": "prompt",
            "size": this.statusIconSize
          }
        })])]);
        return h("div", {
          "class": "omi-uploader__preview--mask",
          "directives": [{
            name: "show",
            value: !closeMask
          }]
        }, [Progress, Status]);
      },
      getPreview: function getPreview() {
        var _this5 = this;

        var h = this.$createElement;
        return this.fileList.map(function (file, index) {
          var isImageFile = utils.isImage(file);
          var Inner = null;
          var CustomPreview = _this5.$scopedSlots.preview;

          if (CustomPreview) {
            return h("div", {
              "class": "omi-upload__preview--custom"
            }, [CustomPreview(file)]);
          }

          if (isImageFile) {
            Inner = h("div", {
              "class": "omi-uploader__image"
            }, [h(index$4["default"], {
              "attrs": {
                "src": file.url || file.content,
                "placeholderHeight": "100%"
              },
              "on": {
                "click": function click() {
                  return _this5.onPreview(file, index);
                }
              }
            })]);
          } else {
            Inner = h("div", {
              "class": "omi-uploader__file"
            }, [h(index$1["default"], {
              "attrs": {
                "type": "document",
                "size": 32
              }
            }), h("span", [file.name])]);
          }

          return h("div", {
            "class": "omi-uploader__preview"
          }, [_this5.deleteAble && _this5.getCloseButton(file), Inner, _this5.getPreviewMask(file)]);
        });
      }
    },
    computed: {
      imagesUrl: function imagesUrl() {
        var list = [];
        this.fileList.forEach(function (file) {
          if (utils.isImage(file)) {
            list.push(file.url || file.content);
          }
        });
        return list;
      }
    },
    render: function render() {
      var h = arguments[0];
      return h("div", {
        "class": "omi-uploader"
      }, [h("div", {
        "class": "omi-uploader__inner"
      }, [this.getPreview(), this.getUploader()])]);
    }
  };
};

var Uploader$1 = Uploader();

exports["default"] = Uploader$1;

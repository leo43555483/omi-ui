'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../form/index.js');
require('../nav-bar/index.js');
require('../form-item/index.js');
require('../input/index.js');
require('../cell/index.js');
require('../cell-group/index.js');
require('../button/index.js');
require('../loading/index.js');
require('../checkbox/index.js');
require('../checkbox-group/index.js');
require('../radio/index.js');
require('../radio-group/index.js');
require('../icon/index.js');
require('../circle/index.js');
require('../switch/index.js');
require('../toast/index.js');
require('../collapse/index.js');
require('../collapse-item/index.js');
require('../action-sheet/index.js');
require('../dialog/index.js');
require('../load-more/index.js');
require('../pull-refresh/index.js');
require('../tabs/index.js');
require('../tabs-pane/index.js');
require('../badge/index.js');
require('../picker/index.js');
require('../address-picker/index.js');
require('../date-picker/index.js');
require('../search/index.js');
require('../rate/index.js');
require('../image-preview/index.js');
require('../image/index.js');
require('../tab-bar/index.js');
require('../tab-bar-item/index.js');
require('../skeleton/index.js');
require('../uploader/index.js');
require('../index-box/index.js');
require('../index-anchor/index.js');
require('../swipe-action/index.js');
var index$1 = require('../form/src/index.vue.js');
var index$2 = require('../form-item/src/index.vue.js');
var index$3 = require('../input/src/index.vue.js');
var index$4 = require('../cell/src/index.vue.js');
var index$5 = require('../cell-group/src/index.vue.js');
var index$6 = require('../button/src/index.vue.js');
var index$7 = require('../loading/src/index.vue.js');
var index$8 = require('../checkbox/src/index.js');
var index$9 = require('../checkbox-group/src/index.vue.js');
var index$a = require('../radio/src/index.js');
var index$b = require('../radio-group/src/index.vue.js');
var index$c = require('../icon/src/index.vue.js');
var index$d = require('../circle/src/index.vue.js');
var index$e = require('../switch/src/index.vue.js');
var index$f = require('../collapse/src/index.vue.js');
var index$g = require('../collapse-item/src/index.vue.js');
var index$h = require('../action-sheet/src/index.js');
var index$i = require('../dialog/src/index.js');
var index$j = require('../load-more/src/index.vue.js');
var index$k = require('../pull-refresh/src/index.js');
var index$l = require('../tabs/src/index.vue.js');
var index$m = require('../tabs-pane/src/index.vue.js');
var index$n = require('../badge/src/index.vue.js');
var index$o = require('../picker/src/index.js');
var index$p = require('../address-picker/src/index.js');
var index$q = require('../date-picker/src/index.js');
var index$r = require('../search/src/index.vue.js');
var index$s = require('../rate/src/index.vue.js');
var index$t = require('../image-preview/src/index.js');
var index$u = require('../image/src/index.js');
var index$v = require('../tab-bar/src/index.vue.js');
var index$w = require('../tab-bar-item/src/index.vue.js');
var index$x = require('../skeleton/src/index.vue.js');
var index$y = require('../uploader/src/index.js');
var index$z = require('../nav-bar/src/index.vue.js');
var index$A = require('../index-box/src/index.vue.js');
var index$B = require('../index-anchor/src/index.vue.js');
var index$C = require('../swipe-action/src/index.vue.js');
var index$D = require('../toast/src/index.js');

var components = {
  Form: index$1["default"],
  FormItem: index$2["default"],
  Input: index$3["default"],
  Cell: index$4["default"],
  CellGroup: index$5["default"],
  Button: index$6["default"],
  Loading: index$7["default"],
  Checkbox: index$8["default"],
  CheckboxGroup: index$9["default"],
  Redio: index$a["default"],
  RadioGroup: index$b["default"],
  Icon: index$c["default"],
  Circle: index$d["default"],
  Switch: index$e["default"],
  Collapse: index$f["default"],
  CollapseItem: index$g["default"],
  ActionSheet: index$h["default"],
  Dialog: index$i["default"].Component,
  LoadMore: index$j["default"],
  PullRefresh: index$k["default"],
  Tabs: index$l["default"],
  TabsPane: index$m["default"],
  Badge: index$n["default"],
  Picker: index$o["default"],
  AddressPicker: index$p["default"],
  DatePicker: index$q["default"],
  Search: index$r["default"],
  Rate: index$s["default"],
  ImagePreview: index$t["default"].Component,
  Image: index$u["default"],
  TabBar: index$v["default"],
  TabBarItem: index$w["default"],
  Skeleton: index$x["default"],
  Uploader: index$y["default"],
  NavBar: index$z["default"],
  IndexBox: index$A["default"],
  IndexAnchor: index$B["default"],
  SwipeAction: index$C["default"]
};

var install = function install(Vue) {
  if (install.installed) return;
  Object.keys(components).forEach(function (key) {
    Vue.component(components[key].name, components[key]);
  });

  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  Vue.prototype.$toast = index$D["default"];
  Vue.prototype.$dialog = index$i["default"];
  Vue.prototype.$imagePreview = index$t["default"];
};

var index = {
  version: "" + process.env.PACKAGE_VERSION,
  install: install,
  components: components
};

exports["default"] = index;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getChildIndex = function getChildIndex(children, child) {
  return children.indexOf(child);
};

var provider = function provider(parentKey) {
  return {
    provide: function provide() {
      var _ref;

      return _ref = {}, _ref[parentKey] = this, _ref;
    },
    data: function data() {
      return {
        children: []
      };
    },
    methods: {
      addChild: function addChild(child) {
        if (getChildIndex(this.children, child) === -1) this.children.push(child);
      },
      removeChild: function removeChild(child) {
        var children = this.children;
        var childIndex = getChildIndex(children, child);

        if (childIndex > -1) {
          this.children.splice(childIndex, 1);
        }
      }
    }
  };
};

exports["default"] = provider;

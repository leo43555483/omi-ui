'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('../utils/shared.js');

var getElement = function getElement(selector) {
  return document.querySelector(selector);
};

function portal () {
  return {
    methods: {
      portal: function portal(el, domNode) {
        if (!el) return;
        var container = document.body;
        if (shared.isString(domNode)) container = getElement(domNode);
        container.appendChild(el);
      }
    }
  };
}

exports["default"] = portal;

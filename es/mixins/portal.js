import { isString } from '../utils/shared.js';

var getElement = function getElement(selector) {
  return document.querySelector(selector);
};

function portal () {
  return {
    methods: {
      portal: function portal(el, domNode) {
        if (!el) return;
        var container = document.body;
        if (isString(domNode)) container = getElement(domNode);
        container.appendChild(el);
      }
    }
  };
}

export { portal as default };

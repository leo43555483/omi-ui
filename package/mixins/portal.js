import { isString } from '../utils/shared';

const getElement = (selector) => document.querySelector(selector);
export default function () {
  return {
    methods: {
      portal(el, domNode) {
        if (!el) return;
        let container = document.body;
        if (isString(domNode)) container = getElement(domNode);
        container.appendChild(el);
      },
    },
  };
}

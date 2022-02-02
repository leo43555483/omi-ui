const tagClass = 'omi-cell__inner';
const VUE_ROUTER_ATTR = ['append', 'tag', 'activeClass', 'exact', 'event', 'exactActiveClass', 'replace', 'to'];

export const [
  APPEND,
  TAG,
  ACTIVECLASS,
  EXACT,
  EVENT,
  EXACTACTIVECLASS,
  REPLACE,
  TO,
] = VUE_ROUTER_ATTR;
export const routeButtonProps = {
  href: {
    type: String,
    default: null,
  },
  [APPEND]: {
    type: Boolean,
    default: false,
  },
  [TAG]: {
    type: String,
    default: 'div',
  },
  [ACTIVECLASS]: {
    type: String,
    default: null,
  },
  [EXACT]: {
    type: Boolean,
    default: false,
  },
  [EVENT]: {
    type: String,
    default: null,
  },
  [EXACTACTIVECLASS]: {
    type: String,
    default: null,
  },
  [TO]: {
    type: String,
    default: null,
  },
  [REPLACE]: {
    type: Boolean,
    default: false,
  },
};
const getValidProps = (ctx) => {
  const props = {};
  VUE_ROUTER_ATTR.forEach((key) => {
    if (ctx[key] !== null) props[key] = ctx[key];
  });
  return props;
};
const RouteButton = () => ({
  props: routeButtonProps,
  methods: {
    createHrefTag(child) {
      return (
        <a href={this.href} class={tagClass}>{child}</a>
      );
    },
    createRouteTag(child) {
      const routeAttrs = getValidProps(this);
      const props = {
        props: routeAttrs,
      };
      return (
        <RouterLink {...props} class={tagClass}>{child}</RouterLink>
      );
    },
    createNormalTag(child) {
      return (
        <div class={tagClass}>{child}</div>
      );
    },
  },
  render() {
    const {
      href, to, createHrefTag, createRouteTag, createNormalTag,
    } = this;
    const slot = this.$slots.default;
    if (href) return createHrefTag(slot);
    if (to) return createRouteTag(slot);
    return createNormalTag(slot);
  },
});

export default RouteButton();

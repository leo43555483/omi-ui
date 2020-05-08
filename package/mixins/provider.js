const getChildIndex = (children, child) => (children.indexOf(child));
const provider = (parentKey) => ({
  provide() {
    return {
      [parentKey]: this,
    };
  },
  data() {
    return {
      children: [],
    };
  },
  methods: {
    addChild(child) {
      if (getChildIndex(this.children, child) === -1) this.children.push(child);
    },
    removeChild(child) {
      const { children } = this;
      const childIndex = getChildIndex(children, child);
      if (childIndex > -1) {
        this.children.splice(childIndex, 1);
      }
    },
  },
});

export default provider;

const MINI_DISTANCE = 10;
const getDirection = (x, y) => {
  const { atan, PI } = Math;
  const degree = (atan(y / x) * 180) / PI;
  if (degree > MINI_DISTANCE) return 'vertical';
  if (degree > 0 <= MINI_DISTANCE) return 'horizontal';
  return '';
};
const { abs } = Math;
export default {
  data() {
    return {
      startX: null,
      startY: null,
      offsetY: null,
      offsetX: null,
      moveX: null, // 移动距离带符号
      moveY: null,
      direction: '',
    };
  },
  methods: {
    touchStart(e) {
      this.resetTouch();
      const { clientX, clientY } = e.touches[0];
      this.startX = clientX;
      this.startY = clientY;
    },
    touchMove(e) {
      const { clientX, clientY } = e.touches[0];
      this.moveX = clientX - this.startX;
      this.moveY = clientY - this.startY;
      this.offsetX = abs(this.moveX);
      this.offsetY = abs(this.moveY);
      this.direction = getDirection(this.offsetX, this.offsetY);
    },
    resetTouch() {
      Object.assign(this, {
        startX: null,
        startY: null,
        offsetY: null,
        offsetX: null,
        moveX: null, // 移动距离带符号
        moveY: null,
        direction: '',
      });
    },
  },
};

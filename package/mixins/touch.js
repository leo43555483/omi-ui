const MINI_DEGREE = 10;
const getDirection = (x, y, degreeThreshold = MINI_DEGREE) => {
  const { atan, PI } = Math;
  const degree = (atan(y / x) * 180) / PI;
  if (degree > degreeThreshold) return 'vertical';
  if (degree <= degreeThreshold) return 'horizontal';
  return '';
};
const { abs } = Math;
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      offsetY: 0,
      offsetX: 0,
      moveX: 0, // 移动距离带符号
      moveY: 0,
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
    touchMove(e, degree) {
      const { clientX, clientY } = e.touches[0];
      this.moveX = clientX - this.startX;
      this.moveY = clientY - this.startY;
      this.offsetX = abs(this.moveX);
      this.offsetY = abs(this.moveY);
      this.direction = getDirection(this.offsetX, this.offsetY, degree);
    },
    resetTouch() {
      Object.assign(this, {
        startX: 0,
        startY: 0,
        offsetY: 0,
        offsetX: 0,
        moveX: 0, // 移动距离带符号
        moveY: 0,
        direction: '',
      });
    },
  },
};

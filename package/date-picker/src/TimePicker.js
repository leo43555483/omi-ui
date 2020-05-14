import renderMixin from './mixins/render';

const TimePicker = () => ({
  name: 'OmiTimePicker',
  mixins: [renderMixin],
  methods: {
  },
  computed: {
    pickerType() {
      return ['hour', 'minute'];
    },
  },
});

export default TimePicker();

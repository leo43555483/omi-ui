<template>
  <div class="demo-date-picker">
    <div class="demo-item">
      <omi-button block @click="() => open('datePicker')">date</omi-button>
      <omi-action-sheet v-model="datePicker">
        <omi-date-picker
          ref="datePicker"
          :currentDate="currentDate"
          title="请选择日期"
          confirmText="确定"
          cancelText="取消"
          :formatter="formatter"
          :onConfirm="() => onConfirm('datePicker')"
          :onCancel="() => onCancel('datePicker')"
          :min="minDate"
          :max="maxDate"
        />
      </omi-action-sheet>
    </div>
    <div class="demo-item">
      <omi-button block @click="() => open('timePicker')">time</omi-button>
      <omi-action-sheet v-model="timePicker">
        <omi-date-picker
          type="time"
          ref="timePicker"
          :onConfirm="() => onConfirm('timePicker')"
          :onCancel="() => onCancel('timePicker')"
          :currentDate="currentDate"
          title="请选择时间"
          confirmText="确定"
          cancelText="取消"
          :max="maxHour"
          :min="minHour"
        />
      </omi-action-sheet>
    </div>
    <div class="demo-item">
      <omi-button block @click="() => open('dateTimePicker')">datetime</omi-button>
      <omi-action-sheet v-model="dateTimePicker">
        <omi-date-picker
          type="datetime"
          ref="dateTimePicker"
          :onConfirm="() => onConfirm('dateTimePicker')"
          :onCancel="() => onCancel('dateTimePicker')"
          :filter="filter"
          :currentDate="currentDate"
          :min="minDate"
          :max="maxDate"
          title="请选择时间"
          confirmText="确定"
          cancelText="取消"
        />
      </omi-action-sheet>
    </div>
    <div class="demo-item">
      <omi-button block @click="() => open('yearPicker')">year</omi-button>
      <omi-action-sheet v-model="yearPicker">
        <omi-date-picker
          :formatter="(type, year) => `${year}年`"
          type="year"
          ref="yearPicker"
          :onConfirm="() => onConfirm('yearPicker')"
          :onCancel="() => onCancel('yearPicker')"
          :currentDate="currentDate"
          title="请选择年份"
          confirmText="确定"
          cancelText="取消"
        />
      </omi-action-sheet>
    </div>
    <div class="demo-item" >
      <omi-button block @click="() => open('monthPicker')">month</omi-button>
      <omi-action-sheet v-model="monthPicker">
        <omi-date-picker
          type="month"
          ref="monthPicker"
          :onConfirm="() => onConfirm('monthPicker')"
          :onCancel="() => onCancel('monthPicker')"
          :formatter="(type, month) => `${month}月`"
          :currentDate="currentDate"
          title="请选择月份"
          confirmText="确定"
          cancelText="取消"
        />
      </omi-action-sheet>
    </div>
  </div>
</template>

<script>
import { Button, ActionSheet, DatePicker } from 'omi'
const actionMap = {
  datePicker: false,
  timePicker: false,
  dateTimePicker: false,
  yearPicker: false,
  monthPicker: false
}
export default {
  name: 'DemoDatePicker',
  data () {
    return {
      currentDate: new Date(),
      minDate: new Date(2000, 0, 1, 17, 30),
      maxDate: new Date(2025, 10, 3, 20, 39),
      maxHour: new Date(2025, 10, 3, 20, 30),
      minHour: new Date(2000, 10, 3, 1, 20),
      ...actionMap
    }
  },
  components: {
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [DatePicker.name]: DatePicker
  },
  methods: {
    open (actionType) {
      this[actionType] = true
    },
    close (type) {
      this[type] = false
    },
    formatter (type, value) {
      if (type === 'year') return `${value}年`
      if (type === 'month') return `${value.replace(/^0/, '')}月`
      return `${value.replace(/^0/, '')}日`
    },
    filter (type, value) {
      if (type === 'minute') {
        return value.filter((item) => item % 3 === 0)
      }
      return value
    },
    onConfirm (type) {
      const datePicker = this.$refs[type]
      const date = datePicker.getValues().map((item) => item.value)
      const isScrolling = datePicker.isScrolling()
      if (isScrolling) return
      this.$toast(date.join(','))
      this.close(type)
    },
    onCancel (type) {
      this.close(type)
    }
  }
}
</script>

<style lang="scss">
.demo-date-picker {
  padding: 10px;
}
.demo-item{
  margin: 10px 0;
}
</style>

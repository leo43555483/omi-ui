<template>
  <div class="demo-date-picker">
    <div class="demo item">
      <omi-date-picker
        :currentDate="currentDate"
      />
    </div>
    <div class="demo item">
      <omi-date-picker
        type="time"
        :currentDate="currentDate"
      />
    </div>
    <div class="demo item">
      <omi-date-picker
        type="datetime"
        :currentDate="currentDate"
      />
    </div>
    <div class="demo item">
      <omi-date-picker
        type="datetime"
        :currentDate="currentDate"
      />
    </div>
    <div class="demo item">
      <omi-date-picker
        type="month"
        :currentDate="currentDate"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoDatePicker',
  data() {
    return {
      currentDate: new Date(),
    };
  },
};
</script>

<style>

</style>

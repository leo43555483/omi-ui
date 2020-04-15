<template>
  <div class="demo-circle">
    <omi-circle :percentage="percentage" ></omi-circle>
  </div>
</template>

<script>
export default {
  name: 'DemoCirlce',
  data() {
    return {
      percentage: 0,
    };
  },
  mounted() {
    const timer = setInterval(() => {
      if (this.percentage >= 100) clearInterval(timer);
      else this.percentage += 1;
    }, 20);
  },
};
</script>

<style>

</style>

<template>
  <div class="progress-bar">
    <div class="progress-bar-filled" :style="fillStyle"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  computed: {
    fillStyle() {
      return {
        width: `${Math.min(Math.max(this.value, 0), 100)}%`,
      };
    },
  },
};
</script>

<style lang="scss">
@import "./ProgressBar.scss";
</style>

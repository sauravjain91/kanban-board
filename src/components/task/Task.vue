<template>
  <div class="task">
    {{ task.title }}
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
@import "./Task.scss";
</style>

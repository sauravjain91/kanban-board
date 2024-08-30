<template>
  <div class="task">
    {{ task.title }}
    <ProgressBar :value="task.completion_percentage" />
    {{ timeAgo }}
  </div>
</template>

<script>
import ProgressBar from "../progress-bar/ProgressBar.vue";
import { formatDistanceToNow } from "date-fns";

export default {
  name: "Task",
  components: { ProgressBar },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    timeAgo() {
      const date = new Date(this.task.updated_at);
      return formatDistanceToNow(date, { addSuffix: true });
    },
  },
};
</script>

<style>
@import "./Task.scss";
</style>

<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <ProgressBar :value="task.completion_percentage" />
    <span class="time-ago">{{ timeAgo }}</span>
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

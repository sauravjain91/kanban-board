<template>
  <div class="list">
    <div class="list-header">
      <h2>{{ title }}</h2>
    </div>
    <draggable
      v-model="localTasks"
      :group="{ name: 'tasks', pull: true, put: true }"
      @end="onTaskMoved"
      item-key="title"
      class="tasks"
    >
      <template #item="{ element }">
        <Task :task="element" />
      </template>
    </draggable>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import Task from "../task/Task.vue";

export default {
  name: "List",
  components: { draggable, Task },
  props: ["title", "tasks"],
  setup(props, { emit }) {
    const localTasks = ref([...props.tasks]);

    watch(
      () => props.tasks,
      (newTasks) => {
        localTasks.value = [...newTasks];
      }
    );

    const onTaskMoved = (event) => {
      emit("move-task", event.item, props.title);
    };

    return {
      localTasks,
      onTaskMoved,
    };
  },
};
</script>

<style lang="scss">
@import "./List.scss";
</style>

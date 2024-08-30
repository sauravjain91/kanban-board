<template>
  <div class="list">
    <div class="list-header">
      <div v-if="!isEditing" class="read-only">
        <h2>{{ title }}</h2>
        <img
          :src="editIcon"
          alt="Edit Icon"
          @click="startEditing"
          class="edit-icon"
        />
      </div>
      <input
        v-if="isEditing"
        type="text"
        v-model="editTitle"
        @keyup.enter="stopEditing"
      />
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

    <div class="create-task-container" v-if="showCreateTaskButton">
      <button @click="createTask" class="create-task-button">
        + Create Task
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import Task from "../task/Task.vue";
import editIcon from "@/assets/icons/edit.svg"; // Import SVG here

export default {
  name: "List",
  components: { draggable, Task },
  props: ["title", "tasks", "showCreateTaskButton"],

  setup(props, { emit }) {
    const localTasks = ref([...props.tasks]);
    const isEditing = ref(false);
    const editTitle = ref(props.title);

    watch(
      () => props.tasks,
      (newTasks) => {
        localTasks.value = [...newTasks];
      }
    );

    const onTaskMoved = (event) => {
      emit("move-task", event.item, props.title);
    };

    const createTask = () => {
      emit("create-task", props.title);
    };

    const startEditing = () => {
      isEditing.value = true;
      editTitle.value = props.title;
    };

    const stopEditing = () => {
      if (editTitle.value !== props.title) {
        emit("update-title", editTitle.value.toUpperCase());
      }
      isEditing.value = false;
    };

    return {
      localTasks,
      onTaskMoved,
      editIcon,
      createTask,
      startEditing,
      stopEditing,
      isEditing,
      editTitle,
    };
  },
};
</script>

<style lang="scss">
@import "./List.scss";
</style>

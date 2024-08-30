<template>
  <div class="list">
    <div class="list-header">
      <div v-show="!isEditing" class="read-only">
        <h2>{{ title }}</h2>
        <img
          :src="editIcon"
          alt="Edit Icon"
          @click="startEditing"
          class="edit-icon"
        />
      </div>
      <input
        v-show="isEditing"
        type="text"
        v-model="editTitle"
        @keyup.enter="saveTitle"
        @keyup.esc="stopEditing"
        ref="titleInput"
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
import { ref, watch, nextTick } from "vue";
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
    const titleInput = ref(null);

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

    const startEditing = async () => {
      isEditing.value = true;
      editTitle.value = props.title;
      await nextTick();
      if (titleInput.value) {
        titleInput.value.focus();
      }
    };

    const saveTitle = () => {
      if (editTitle.value !== props.title) {
        emit("update-title", editTitle.value.toUpperCase());
      }
      isEditing.value = false;
    };

    const stopEditing = () => {
      editTitle.value = props.title;
      isEditing.value = false;
    };

    return {
      localTasks,
      onTaskMoved,
      editIcon,
      createTask,
      startEditing,
      saveTitle,
      stopEditing,
      isEditing,
      editTitle,
      titleInput,
    };
  },
};
</script>

<style lang="scss">
@import "./List.scss";
</style>

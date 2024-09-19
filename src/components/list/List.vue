<template>
  <div class="list">
    <div class="list-header">
      <div v-show="!isEditing" class="read-only">
        <div>
          <h2>{{ title }}</h2>
          <img
            :src="editIcon"
            alt="Edit Icon"
            @click="startEditing"
            class="edit-icon"
          />
        </div>
        <img
          :src="deleteIcon"
          alt="Delete Icon"
          @click="deleteColumn"
          class="delete-icon"
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
      item-key="columnId"
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
import { ref, nextTick, computed } from "vue";
import draggable from "vuedraggable";
import Task from "../task/Task.vue";
import editIcon from "@/assets/icons/edit.svg";
import deleteIcon from "@/assets/icons/delete.svg";

export default {
  name: "List",
  components: { draggable, Task },
  props: ["title", "tasks", "showCreateTaskButton", "columnId"],

  setup(props, { emit }) {
    const localTasks = computed({
      // getter
      get() {
        return props.tasks;
      },
      // setter
      set(tasks) {
        // Note: we are using destructuring assignment syntax here.
        emit("move-task", props.columnId, tasks);
      },
    });

    const isEditing = ref(false);
    const editTitle = ref(props.title);
    const titleInput = ref(null);

    const createTask = () => {
      emit("create-task", props.columnId);
    };

    const startEditing = async () => {
      isEditing.value = true;
      editTitle.value = props.title;
      await nextTick();
      if (titleInput.value) {
        titleInput.value.focus();
      }
    };

    const deleteColumn = () => {
      emit("delete-column", props.columnId);
    };

    const saveTitle = () => {
      if (editTitle.value !== props.title) {
        emit("update-title", props.columnId, editTitle.value.toUpperCase());
      }
      isEditing.value = false;
    };

    const stopEditing = () => {
      editTitle.value = props.title;
      isEditing.value = false;
    };

    return {
      localTasks,
      editIcon,
      createTask,
      startEditing,
      saveTitle,
      stopEditing,
      isEditing,
      editTitle,
      titleInput,
      deleteIcon,
      deleteColumn,
    };
  },
};
</script>

<style lang="scss">
@import "./List.scss";
</style>

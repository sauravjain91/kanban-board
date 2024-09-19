<template>
  <div class="container">
    <h1>Board</h1>

    <div class="board">
      <List
        v-for="(column, index) in data"
        :key="index"
        :title="column.name"
        :tasks="column.tasks"
        :showCreateTaskButton="index === 0"
        :columnId="index"
        @move-task="moveTask"
        @create-task="createTask"
        @update-title="updateTitle"
        @delete-column="deleteColumn"
      />

      <button @click="addColumn" class="add-column">+</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import List from "./components/list/List.vue";

export default {
  name: "Board",
  components: { List },
  setup() {
    const data = ref([
      {
        name: "TODO",
        tasks: [
          {
            title: "Post-Deployment Testing",
            updated_at: "2024-08-28T14:30:10Z",
            completion_percentage: 85,
          },
          {
            title: "Fix Post-Deployment Bugs",
            updated_at: "2024-08-29T10:15:40Z",
            completion_percentage: 40,
          },
          {
            title: "Project Retrospective",
            updated_at: "2024-08-30T16:00:00Z",
            completion_percentage: 0,
          },
        ],
      },
      {
        name: "IN PROGRESS",
        tasks: [
          {
            title: "Fix Bugs in API",
            updated_at: "2024-08-15T11:42:10Z",
            completion_percentage: 60,
          },
        ],
      },
      {
        name: "DONE",
        tasks: [
          {
            title: "Design Homepage",
            updated_at: "2024-08-01T14:23:00Z",
            completion_percentage: 100,
          },
        ],
      },
    ]);

    const moveTask = (columnIndex, tasks) => {
      data.value[columnIndex].tasks = [...tasks];
    };

    const createTask = (columnIndex) => {
      const newTaskName = prompt("Enter the name of the new Task:");
      if (newTaskName === null || newTaskName.trim() === "") return;

      const newTask = {
        title: newTaskName,
        updated_at: new Date(),
        completion_percentage: 0,
      };
      data.value[columnIndex].tasks.push(newTask);
    };

    const addColumn = () => {
      const newColumn = prompt("Enter the name of the new column:");
      if (newColumn === null) {
        return;
      }

      data.value.push({ name: newColumn, tasks: [] });
    };

    const updateTitle = (columnId, newTitle) => {
      data.value[columnId].name = newTitle;
    };

    const deleteColumn = (columnId) => {
      if (!data.value[columnId]) {
        console.log("Column does not exist");
      } else {
        data.value.splice(columnId, 1);
      }
    };

    return {
      addColumn,
      createTask,
      updateTitle,
      deleteColumn,
      moveTask,
      data,
    };
  },
};
</script>

<style>
@import "@/assets/styles/main.scss";
</style>

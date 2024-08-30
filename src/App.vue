<template>
  <div class="container">
    <h1>Board</h1>

    <div class="board">
      <List
        v-for="(column, index) in columns"
        :key="index"
        :title="column"
        :tasks="getTasksForColumn(column)"
        :showCreateTaskButton="index === 0"
        @move-task="moveTask"
        @create-task="createTask"
        @update-title="updateTitle(index, $event)"
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
    const columns = ref(["TODO", "IN PROGRESS", "DONE", "ARCHIVED"]);

    const tasks = ref([
      {
        title: "Design Homepage",
        status: "DONE",
        updated_at: "2024-08-01T14:23:00Z",
        completion_percentage: 100,
      },
      {
        title: "Implement Authentication",
        status: "ARCHIVED",
        updated_at: "2024-07-20T09:15:30Z",
        completion_percentage: 100,
      },
      {
        title: "Fix Bugs in API",
        status: "IN PROGRESS",
        updated_at: "2024-08-15T11:42:10Z",
        completion_percentage: 60,
      },
      {
        title: "Update Documentation",
        status: "TODO",
        updated_at: "2024-08-17T16:25:05Z",
        completion_percentage: 10,
      },
      {
        title: "Review Pull Requests",
        status: "TODO",
        updated_at: "2024-08-18T13:07:20Z",
        completion_percentage: 20,
      },
      {
        title: "Optimize Database Queries",
        status: "TODO",
        updated_at: "2024-08-20T10:50:45Z",
        completion_percentage: 30,
      },
      {
        title: "Add User Analytics",
        status: "TODO",
        updated_at: "2024-08-21T08:22:15Z",
        completion_percentage: 25,
      },
      {
        title: "Implement Payment Gateway",
        status: "TODO",
        updated_at: "2024-08-22T15:11:55Z",
        completion_percentage: 40,
      },
      {
        title: "Create Admin Dashboard",
        status: "TODO",
        updated_at: "2024-08-23T17:30:30Z",
        completion_percentage: 50,
      },
      {
        title: "Conduct User Testing",
        status: "TODO",
        updated_at: "2024-08-24T14:45:10Z",
        completion_percentage: 60,
      },
      {
        title: "Refactor Codebase",
        status: "TODO",
        updated_at: "2024-08-25T12:12:55Z",
        completion_percentage: 70,
      },
      {
        title: "Prepare Release Notes",
        status: "TODO",
        updated_at: "2024-08-26T11:35:45Z",
        completion_percentage: 80,
      },
      {
        title: "Deploy to Production",
        status: "TODO",
        updated_at: "2024-08-27T09:50:25Z",
        completion_percentage: 90,
      },
      {
        title: "Post-Deployment Testing",
        status: "TODO",
        updated_at: "2024-08-28T14:30:10Z",
        completion_percentage: 85,
      },
      {
        title: "Fix Post-Deployment Bugs",
        status: "TODO",
        updated_at: "2024-08-29T10:15:40Z",
        completion_percentage: 40,
      },
      {
        title: "Project Retrospective",
        status: "TODO",
        updated_at: "2024-08-30T16:00:00Z",
        completion_percentage: 0,
      },
    ]);

    const getTasksForColumn = (column) =>
      tasks.value.filter((task) => task.status === column);

    const moveTask = (task, status) => {
      const taskToUpdate = tasks.value.find((t) => t.title === task.title);
      if (taskToUpdate) {
        taskToUpdate.status = status;
      }
    };

    const createTask = (status) => {
      const newTaskName = prompt("Enter the name of the new Task:");
      if (newTaskName === null || newTaskName.trim() === "") return;

      if (tasks.value.some((task) => task.title === newTaskName)) {
        alert("A task with this name already exists.");
        return;
      }

      const newTask = {
        title: newTaskName,
        status: status,
        updated_at: new Date(),
        completion_percentage: 0,
      };
      tasks.value.push(newTask);
    };

    const addColumn = () => {
      const newColumn = prompt(
        "Enter the name of the new column:"
      ).toUpperCase();
      if (newColumn && !columns.value.includes(newColumn)) {
        columns.value.push(newColumn);
      } else {
        alert("Column already exists or is invalid.");
      }
    };

    const updateTitle = (index, newTitle) => {
      const oldTitle = columns.value[index];
      if (newTitle && !columns.value.includes(newTitle)) {
        columns.value[index] = newTitle;

        tasks.value.forEach((task) => {
          if (task.status === oldTitle) {
            task.status = newTitle;
          }
        });
      } else {
        alert("Column name is invalid or already exists.");
      }
    };

    return {
      columns,
      tasks,
      getTasksForColumn,
      moveTask,
      addColumn, createTask,

      updateTitle,
    };
  },
};
</script>

<style>
@import "@/assets/styles/main.scss";
</style>

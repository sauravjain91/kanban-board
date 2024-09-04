<template>
  <div class="container">
    <h1>Board</h1>

    <div class="board">
      <List
        v-for="(tasks, columnId) in tasks"
        :key="columnId"
        :title="getColumnTitle(columnId)"
        :tasks="tasks"
        :columnId="columnId"
        :showCreateTaskButton="columnId === columns[0].id"
        @move-task="moveTask"
        @create-task="createTask(columnId)"
        @update-title="updateTitle(columnId, $event)"
        @delete-column="deleteColumn(columnId)"
      />

      <button @click="addColumn" class="add-column">+</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import List from "./components/list/List.vue";
import {
  taskExists,
  columnExistsByTitle,
  columnExistsById,
  findColumnIdByTaskId,
} from "./helpers/utils";
import { v4 as uuidv4 } from "uuid"; // Import v4 method from uuid

export default {
  name: "Board",
  components: { List },
  setup() {
    const columns = ref([
      { id: "d2a00a70-14cf-4f2a-91f6-97571c88836f", title: "TODO" },
      { id: "7a08cf40-4395-48fb-ae9b-85e54a1205a5", title: "IN PROGRESS" },
      { id: "afef5e57-fa08-42ef-891a-662fd01a6511", title: "DONE" },
      { id: "72b0d6ba-c5d8-4752-a254-abf50b0d1af2", title: "ARCHIVED" },
    ]);

    const tasks = ref({
      "d2a00a70-14cf-4f2a-91f6-97571c88836f": [
        {
          id: uuidv4(),
          title: "Update Documentation",
          updated_at: "2024-08-17T16:25:05Z",
          completion_percentage: 10,
        },
        {
          id: uuidv4(),
          title: "Review Pull Requests",
          updated_at: "2024-08-18T13:07:20Z",
          completion_percentage: 20,
        },
        {
          id: uuidv4(),
          title: "Optimize Database Queries",
          updated_at: "2024-08-20T10:50:45Z",
          completion_percentage: 30,
        },
        {
          id: uuidv4(),
          title: "Add User Analytics",
          updated_at: "2024-08-21T08:22:15Z",
          completion_percentage: 25,
        },
        {
          id: uuidv4(),
          title: "Implement Payment Gateway",
          updated_at: "2024-08-22T15:11:55Z",
          completion_percentage: 40,
        },
        {
          id: uuidv4(),
          title: "Create Admin Dashboard",
          updated_at: "2024-08-23T17:30:30Z",
          completion_percentage: 50,
        },
        {
          id: uuidv4(),
          title: "Conduct User Testing",
          updated_at: "2024-08-24T14:45:10Z",
          completion_percentage: 60,
        },
        {
          id: uuidv4(),
          title: "Refactor Codebase",
          updated_at: "2024-08-25T12:12:55Z",
          completion_percentage: 70,
        },
        {
          id: uuidv4(),
          title: "Prepare Release Notes",
          updated_at: "2024-08-26T11:35:45Z",
          completion_percentage: 80,
        },
        {
          id: uuidv4(),
          title: "Deploy to Production",
          updated_at: "2024-08-27T09:50:25Z",
          completion_percentage: 90,
        },
        {
          id: uuidv4(),
          title: "Post-Deployment Testing",
          updated_at: "2024-08-28T14:30:10Z",
          completion_percentage: 85,
        },
        {
          id: uuidv4(),
          title: "Fix Post-Deployment Bugs",
          updated_at: "2024-08-29T10:15:40Z",
          completion_percentage: 40,
        },
        {
          id: uuidv4(),
          title: "Project Retrospective",
          updated_at: "2024-08-30T16:00:00Z",
          completion_percentage: 0,
        },
      ],
      "7a08cf40-4395-48fb-ae9b-85e54a1205a5": [
        {
          id: uuidv4(),
          title: "Fix Bugs in API",
          updated_at: "2024-08-15T11:42:10Z",
          completion_percentage: 60,
        },
      ],
      "afef5e57-fa08-42ef-891a-662fd01a6511": [
        {
          id: uuidv4(),
          title: "Design Homepage",
          updated_at: "2024-08-01T14:23:00Z",
          completion_percentage: 100,
        },
      ],
      "72b0d6ba-c5d8-4752-a254-abf50b0d1af2": [
        {
          id: uuidv4(),
          title: "Implement Authentication",
          updated_at: "2024-07-20T09:15:30Z",
          completion_percentage: 100,
        },
      ],
    });

    const moveTask = (movedTask, targetColumnId) => {
      const sourceColumnId = findColumnIdByTaskId(tasks.value, movedTask.id);
      if (sourceColumnId === null) {
        console.error("Task not found in any column.");
        return;
      }
      if (sourceColumnId === targetColumnId) return;
      const taskIndexInSourceColumn = tasks.value[sourceColumnId].findIndex(
        (task) => task.id === movedTask.id
      );

      if (taskIndexInSourceColumn > -1) {
        tasks.value[sourceColumnId].splice(taskIndexInSourceColumn, 1);
        tasks.value[targetColumnId].push(movedTask);
      }
    };

    const getTasksForColumn = (column) =>
      tasks.value.filter((task) => task.status === column);

    const createTask = (columnId) => {
      const newTaskName = prompt("Enter the name of the new Task:");
      if (newTaskName === null || newTaskName.trim() === "") return;

      if (taskExists(tasks.value, newTaskName)) {
        alert("A task with this name already exists.");
        return;
      }

      const newTask = {
        title: newTaskName,
        updated_at: new Date(),
        completion_percentage: 0,
      };
      tasks.value[columnId] = [...tasks.value[columnId], newTask];
    };

    const addColumn = () => {
      const newColumn = prompt("Enter the name of the new column:");
      if (newColumn === null) {
        return;
      }
      if (newColumn.trim() === "") {
        alert("Column name cannot be empty.");
        return;
      }
      if (
        newColumn &&
        columnExistsByTitle(columns.value, newColumn.toUpperCase())
      ) {
        alert("A column with this name already exists.");
        return;
      }
      const newColumnObj = {
        id: uuidv4(),
        title: newColumn.toUpperCase(),
      };

      columns.value = [...columns.value, newColumnObj];
      tasks.value[newColumnObj.id] = [];
    };

    const updateTitle = (columnId, newTitle) => {
      const columnIndex = columns.value.findIndex(
        (column) => column.id === columnId
      );

      if (columnIndex === -1) {
        console.error("Column ID not found.");
        return;
      }

      if (
        newTitle &&
        !columns.value
          .filter((value) => value.id !== columnId)
          .some((column) => column.title === newTitle)
      ) {
        columns.value[columnIndex].title = newTitle.toUpperCase();
      } else {
        alert("Column name is invalid or already exists.");
      }
    };

    const deleteColumn = (columnId) => {
      if (columnExistsById(columns.value, columnId)) {
        if (
          !confirm(
            `Are you sure you want to delete the column "${getColumnTitle(
              columnId
            )}"? This action will remove the entire column along with all tasks it contains. Please note that this action cannot be undone.`
          )
        )
          return;

        columns.value = columns.value.filter(
          (column) => column.id !== columnId
        );
        delete tasks.value[columnId];
      }
    };

    const getColumnTitle = (columnId) =>
      columns.value.filter((c) => c.id == columnId)[0].title;

    return {
      columns,
      tasks,
      getTasksForColumn,
      addColumn,
      createTask,
      updateTitle,
      getColumnTitle,
      deleteColumn,
      moveTask,
    };
  },
};
</script>

<style>
@import "@/assets/styles/main.scss";
</style>

<template>
  <div class="container">
    <h1>Board</h1>

    <div class="board">
      <List
        v-for="(column, index) in columns"
        :key="index"
        :title="column"
        :tasks="getTasksForColumn(column)"
        @move-task="moveTask"
      />
      <button @click="addColumn">+</button>
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
        title: "Case 1",
        status: "DONE",
        updated_at: "2021-09-01",
        completion_percentage: 100,
      },
      {
        title: "Case 2",
        status: "ARCHIVED",
        updated_at: "2021-09-02",
        completion_percentage: 100,
      },
      {
        title: "Case 3",
        status: "IN PROGRESS",
        updated_at: new Date(),
        completion_percentage: 50,
      },
      {
        title: "Case 4",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 10,
      },
      {
        title: "Case 5",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 15,
      },
      {
        title: "Case 6",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 10,
      },
      {
        title: "Case 7",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 10,
      },
      {
        title: "Case 8",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 10,
      },
      {
        title: "Case 9",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 10,
      },
      {
        title: "Case 10",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 10,
      },
      {
        title: "Case 11",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 10,
      },
      {
        title: "Case 12",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 0,
      },
      {
        title: "Case 13",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 0,
      },
      {
        title: "Case 14",
        status: "TODO",
        updated_at: new Date(),
        completion_percentage: 0,
      },
      {
        title: "Case 15",
        status: "TODO",
        updated_at: new Date(),
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

    return {
      columns,
      tasks,
      getTasksForColumn,
      moveTask,
      addColumn,
    };
  },
};
</script>

<style>
@import "@/assets/styles/main.scss";
</style>

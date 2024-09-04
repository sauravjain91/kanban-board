export const taskExists = (tasks, title) => {
  for (const key in tasks) {
    if (tasks[key].some((task) => task.title === title)) return true;
  }
  return false;
};

export const columnExistsByTitle = (columns, title) => {
  return columns.some(
    (column) => column.title.toUpperCase() === title.toUpperCase()
  );
};

export const columnExistsById = (columns, id) => {
  return columns.some((column) => column.id === id);
};

export const findColumnIdByTaskId = (tasks, taskId) => {
  for (const [listId, tasksList] of Object.entries(tasks)) {
    if (tasksList.some((task) => task.id === taskId)) return listId;
  }
  return null;
};

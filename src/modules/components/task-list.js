import "./task-list.css";
import createTaskCard from "./task-card";

export default function createTaskList(tasks) {
  const taskList = document.createElement("div");

  for (const task of tasks) {
    const taskCard = createTaskCard(task);
    taskList.append(taskCard);
  }

  taskList.className = "task-list";
  return taskList;
}

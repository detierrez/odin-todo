import "./style.css";
import createTaskCard from "../task-card";

export default function createTaskList({tasks, ...args}) {
  const taskList = document.createElement("div");

  for (const task of tasks) {
    const taskCard = createTaskCard({task, ...args});
    taskList.append(taskCard);
  }

  taskList.className = "task-list";
  return taskList;
}

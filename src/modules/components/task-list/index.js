import "./style.css";
import createTaskCard from "../task-card";

export default function createTaskList({
  tasks,
  createTaskFromEvent,
  ...args
}) {
  const taskList = document.createElement("div");
  taskList.classList.add("task-list");

  tasks = tasks.sort((a, b) => a.dueDate - b.dueDate);
  tasks = tasks.sort((a, b) => a.isCompleted - b.isCompleted);

  for (const task of tasks) {
    taskList.append(createTaskCard({ task, ...args }));
  }

  const addTaskOnEvent = function (event) {
    const task = createTaskFromEvent(event);
    addTaskToList(task, taskList, args);
  };

  return {taskList, addTaskOnEvent};
}

function addTaskToList(task, taskList, args) {
  const taskCard = createTaskCard({ task, ...args });
  taskList.insertBefore(taskCard, taskList.firstChild);
  taskCard.querySelector(".title").focus();
}

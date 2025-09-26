import "./style.css";
import createTaskCard from "../task-card";
import createIconButton from "../icon-button";

export default function createTaskView({
  tasks,
  createTaskFromEvent,
  ...args
}) {
  const taskView = document.createElement("div");
  taskView.classList.add("task-view");

  const taskList = createTaskList({ tasks, ...args });
  const addTaskOnEvent = function (event) {
    const task = createTaskFromEvent(event);
    addTaskToList(task, taskList, args);
  };

  const addComponent = createIconButton("plus");
  addComponent.addEventListener("click", addTaskOnEvent);

  taskView.append(addComponent);
  taskView.append(taskList);

  return taskView;
}

function createTaskList({ tasks, ...args }) {
  const taskList = document.createElement("div");
  taskList.classList.add("task-list");

  tasks = tasks.sort((a, b) => a.dueDate - b.dueDate);
  tasks = tasks.sort((a, b) => a.isCompleted - b.isCompleted);

  for (const task of tasks) {
    taskList.append(createTaskCard({ task, ...args }));
  }

  return taskList;
}

function addTaskToList(task, taskList, args) {
  const taskCard = createTaskCard({ task, ...args });
  taskList.insertBefore(taskCard, taskList.firstChild);
}

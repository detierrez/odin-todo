import "./style.css";
import createTaskCard from "../task-card";
import createIconButton, {
  createAddButton,
  createLabeledButton,
} from "../icon-button";

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
  // const addComponent = createAddComponent(addTaskOnEvent);

  const addComponent = createIconButton("plus");
  addComponent.addEventListener("click", addTaskOnEvent);

  taskView.append(addComponent);
  taskView.append(taskList);

  return taskView;
}

function createAddComponent(onClick) {
  const addComponent = document.createElement("div");
  addComponent.classList.add("add-component");

  const label = document.createElement("label");
  label.className = "add-label";
  label.htmlFor = "add-task-button";
  label.textContent = "New task";

  const button = createIconButton("plus");
  button.id = "add-task-button";

  addComponent.append(label);
  addComponent.append(button);

  return addComponent;
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

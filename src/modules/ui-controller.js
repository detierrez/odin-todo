import { intlFormatDistance, isToday } from "date-fns";
import app from "./app";
import { createProjectButton } from "./components/project-button";
import createProjectView from "./components/project-view";

const collectionsContainer = document.querySelector(".collections-container");
const collections = app.getCollections();
for (const collection of collections) {
  const btn = createProjectButton(collection);
  btn.dataset.type = "collection";
  btn.addEventListener("click", renderCollectionView);
  collectionsContainer.appendChild(btn);
}

function renderCollectionView(event) {
  const type = event.currentTarget.dataset.type;
  const id = event.currentTarget.dataset.id;
  const method = type === "collection" ? "getCollection" : "getProject";
  const collection = app[method](id);
  const args = {
    project: collection,
    stopPropagation,
    onAddClick,
    onCheckClick,
    onDeleteClick,
    onValueChange,
    onDateChange,
  };
  const projectView = createProjectView(args);
  divMain.replaceChildren(projectView);
}

const projectsContainer = document.querySelector(".projects-container");
const projects = app.getProjects();
for (const project of projects) {
  const btn = createProjectButton(project);
  btn.dataset.type = "project";
  btn.addEventListener("click", renderCollectionView);
  projectsContainer.appendChild(btn);
}

let currentProject;
const divMain = document.querySelector(".main");
document.querySelector('button[data-id="all"]').click();

function stopPropagation(event) {
  event.stopPropagation();
}

function onValueChange(event) {
  const target = event.currentTarget;
  app.updateTask(target.dataset.taskId, {
    [target.dataset.property]: target.value,
  });
}

function onDateChange(event, newDate) {
  app.updateTask(event.target.dataset.taskId, { dueDate: newDate });
}

function onCheckClick(event) {
  const taskId = event.currentTarget.dataset.taskId;
  const isCompleted = !app.getTask(taskId).isCompleted;
  app.updateTask(taskId, { isCompleted });
}

function onDeleteClick(event) {
  app.deleteTask(event.currentTarget.dataset.taskId);
}

function onAddClick(event, taskList) {
  const args = { title: "", description: "" };
  const task = app.createTask(args);

  taskList.addTask(task);
}

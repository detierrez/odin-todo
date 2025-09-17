import { intlFormatDistance, isToday } from "date-fns";
import app from "./core/app";
import { createProjectButton } from "./components/project-button";
import createProjectView from "./components/project-view";

const collectionsContainer = document.querySelector(".collections-container");
const collections = app.getCollections();
for (const collection of collections) {
  const btn = createProjectButton(collection);
  btn.addEventListener("click", renderCollectionView);
  collectionsContainer.appendChild(btn);
}

function renderCollectionView(event) {
  const projectId = this.dataset.id;
  const project = app.getCollection(projectId);
  const args = {
    project,
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
  btn.addEventListener("click", renderProjectView);
  projectsContainer.appendChild(btn);
}

function renderProjectView(event) {
  const projectId = this.dataset.id;
  const project = app.getProject(projectId);
  const projectView = createProjectView(project, onValueChange);
  divMain.replaceChildren(projectView);
}

// const btn = createProjectButton("+");
// projectsContainer.appendChild(btn);

let currentProject;
const divMain = document.querySelector(".main");
document.querySelector('button[data-id="all"]').click();

// const projectView = createProjectView(projects[0]);

// divMain.append(projectView);

function stopPropagation(event) {
  event.stopPropagation();
}

function onValueChange(event) {
  app.updateTask(this.parentElement.dataset.taskId, {
    [this.dataset.property]: this.value,
  });
}

function onDateChange(event) {
  const newValue = this.value.replace(/-/g, "/");
  const newDate = new Date(newValue);
  const newLabel = this.getLabelText(newDate);
  this.label.textContent = newLabel;
  app.updateTask(this.dataset.taskId, { dueDate: newDate });
}

function onCheckClick(event) {
  const taskId = this.dataset.taskId;
  const isCompleted = !app.getTask(taskId).isCompleted;
  app.updateTask(taskId, { isCompleted });

  const [oldClass, newClass] = isCompleted
    ? ["not-completed", "completed"]
    : ["completed", "not-completed"];
  this.card.classList.replace(oldClass, newClass);
}

function onDeleteClick(event) {
  app.deleteTask(this.dataset.taskId);
  this.card.remove();
}

function onAddClick(event) {
  const args = { title: "", description: "" };
  app.createTask(args);
}

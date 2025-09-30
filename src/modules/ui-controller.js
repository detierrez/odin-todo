import app from "./app";
import createBody from "./components/body";

let currentCollection;

const bodyArgs = {
  getDefaultCollection,
  getCollectionFromEvent,
  isProject,
  createProjectFromEvent,
  updateProjectFromEvent,
  deleteProjectFromEvent,
  getProjectFromTask,
  getCollections,
  getProjects,
  createTaskFromEvent,
  onCheckClick,
  onDeleteClick,
  onValueChange,
  onDateChange,
  onTaskChangeProject,
};

const bodyComponent = createBody(bodyArgs);
document.body.append(bodyComponent);

function getCollectionFromEvent(event) {
  const { collectionType, collectionId } = event.currentTarget.dataset;
  const method =
    collectionType === "collection" ? "getCollection" : "getProject";
  const collection = app[method](collectionId);

  currentCollection = collection;
  return collection;
}

function onValueChange(event) {
  const target = event.currentTarget;
  const { taskId, taskProperty } = target.dataset;
  app.updateTask(taskId, { [taskProperty]: target.value });
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

function createTaskFromEvent(event) {
  const args = { title: "", description: "" };
  const task = app.createTask(args);

  if (app.isProject(currentCollection)) {
    app.addTaskToProject(task.id, currentCollection.id);
  }

  return task;
}

function isProject(collection) {
  return app.isProject(collection);
}

function getProjectFromTask(taskId) {
  // const { taskId } = event.currentTarget.dataset;
  return app.getProjectFromTask(taskId);
}

function createProjectFromEvent(event) {
  const args = {};
  const project = app.createProject(args);

  return project;
}

function updateProjectFromEvent(event) {
  const target = event.currentTarget;
  const { collectionId, collectionProperty } = target.dataset;
  app.updateProject(collectionId, { [collectionProperty]: target.value });
}

function deleteProjectFromEvent(event) {
  app.deleteProject(event.currentTarget.dataset.collectionId);
}

function getDefaultCollection() {
  return app.getCollection("all");
}

function getCollections() {
  return app.getCollections();
}

function getProjects() {
  return app.getProjects();
}

function onTaskChangeProject(event) {
  const target = event.currentTarget;
  const { taskId } = target.dataset;

  const oldProject = app.getProjectFromTask(taskId);
  if (oldProject) {
    app.removeTaskFromProject(taskId, oldProject.id);
  }

  const newProjectId = event.currentTarget.value;
  if (newProjectId) {
    app.addTaskToProject(taskId, newProjectId);
  }
}

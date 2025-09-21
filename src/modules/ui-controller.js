import app from "./app";
import createBody from "./components/body";

const collections = app.getCollections();
const projects = app.getProjects();

const sidebarArgs = { collections, projects };
const mainArgs = {
  onAddClick,
  onCheckClick,
  onDeleteClick,
  onValueChange,
  onDateChange,
};

const bodyComponent = createBody({
  getCollectionFromEvent,
  mainArgs,
  sidebarArgs,
});
document.body.append(bodyComponent);
document.querySelector("button").click();

let currentProject;

function getCollectionFromEvent(event) {
  const { type, id } = event.currentTarget.dataset;
  const method = type === "collection" ? "getCollection" : "getProject";
  return app[method](id);
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

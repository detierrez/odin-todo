import app from "./app";
import createBody from "./components/body";

const collections = app.getCollections();
const projects = app.getProjects();

const sidebarArgs = { collections, projects, onCollectionClick };
const mainArgs = {
  onAddClick,
  onCheckClick,
  onDeleteClick,
  onValueChange,
  onDateChange,
};

const bodyComponent = createBody({ sidebarArgs, mainArgs });
document.body.append(bodyComponent);
document.querySelector("#all").click()


let currentProject;

function onCollectionClick(event) {
  const type = event.currentTarget.dataset.type;
  const id = event.currentTarget.dataset.id;
  const method = type === "collection" ? "getCollection" : "getProject";
  const collection = app[method](id)
  return collection;
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

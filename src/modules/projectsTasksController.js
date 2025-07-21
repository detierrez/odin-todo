import "./initializer";
import { Task } from "./task";
import { Project, Collection } from "./project";

// const project = Collection.getProject("proj-1111-aaaa-bbbb-cccc-000000000001");
// console.log({ project });
// const task = project.tasks[0];
// console.log(task);
// project.removeTask(task);
// console.log({ project });
// project.addTask(new Task({}));
// console.log(project.tasks);

function saveInStorage(item) {
  localStorage.setItem(item.id, JSON.stringify(item));
}

function removeFromStorage(item) {
  localStorage.removeItem(item.id);
}

function deleteTask(task) {
  Task.removeTask(task);
  task.project.removeTask(task);
  removeFromStorage(task);
}

function deleteProject(project) {
  for (const task of project.tasks) {
    Task.removeTask(task);
    removeFromStorage(task);
  }
  removeFromStorage(project);
}

function deleteItem(item) {
  item.delete();
  removeFromStorage(item);
}

function createTask(args, project) {
  const newTask = new Task(args);
  project.addTask(newTask);
  updateProperties();
}

function updateProperties(item, properties) {
  for (const [property, newValue] of Object.entries(properties)) {
    const currentValue = item[property];
    if (property in item && currentValue !== newValue) {
      item[property] = newValue;
    }
  }
  saveInStorage(item);
}

function moveToProject(task, newProject) {
  const oldProject = task.project;
  if (oldProject) {
    oldProject.removeTask(task);
  }

  newProject.addTask(task);
  task.project = newProject;
}



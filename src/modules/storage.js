import { Task } from "./task";
import { Project } from "./project";
import { isEqual, parse, parseJSON } from "date-fns";
import initialData from "./initialData";

localStorage.clear();

if (localStorage.length === 0) {
  saveDemoItems();
}

const items = loadItems();
console.log(items);
console.log(Task.instances);

function saveDemoItems() {
  const tasks = initialData.map((task) => new Task(task));
  for (const task of tasks) {
    localStorage.setItem(task.uuid, JSON.stringify(task));
  }
}

function loadItems() {
  const storedClasses = {
    Task: Task,
    Project: Project,
  };
  const storedItems = { ...localStorage };
  for (const uuid in storedItems) {
    const { className, parameters } = JSON.parse(storedItems[uuid]);
    const instance = new storedClasses[className](parameters);
    storedItems[uuid] = instance;
  }
  return storedItems;
}

// for (const task of tasks) {
//   const restored = stored[task.uuid];
//   console.log(restored);
//   for (const key in task) {
//     if (key === "dueDate") {
//       console.log(key, isEqual(task[key], restored[key]));
//     } else {
//       console.log(key, task[key] === restored[key]);
//     }
//   }
// }

// const strinfiedTasks = JSON.stringify(tasks, replacer);
// const parsed = JSON.parse(stringified);
// for (const parsedTask of parsed) {
//   parsedTask.dueDate = parseJSON(parsedTask.dueDate);
// }

export function getTasks() {
  return localStorage.getItem("tasks");
}

export function getProjects() {
  return localStorage.getItem("projects");
}

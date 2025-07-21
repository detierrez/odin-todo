import "modern-normalize";
import "./css/reset.css";

import app from "./modules/app";

// import "./modules/project"
// import "./modules/storage"

// import "./modules/sandbox"
// import "./modules/task"

import "./modules/demoSetter";
import "./modules/projectsTasksController";
import "./modules/sandbox";
import "./modules/auto-storing-object";

import { Task } from "./modules/task";

const task = Object.values(Task.tasksById)[0];
console.log(task);
task.title = "EUREKA";

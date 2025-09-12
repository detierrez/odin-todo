import "modern-normalize";
import "./css/reset.css";
import "./css/base.css"

import "./modules/initializer";

import app from "./modules/app";
import "./modules/ui-controller"

const projects = app.getProjects();
console.log({ projects });
console.log(app.getTasks())
const project = projects[0];
const totalCompleted = project.totalCompleted;
const tasks = project.tasks;
console.log({ projects, project, totalCompleted, tasks });
// app.deleteProject(project.id);

window.app = app;

// import "./modules/storable";
// import "./modules/task"

// import "./modules/zandbox"

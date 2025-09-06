import "modern-normalize";
import "./css/reset.css";

import "./modules/initializer";

import app from "./modules/app";

const projects = app.getProjects();
console.log({ projects });
const project = projects[0];
const totalCompleted = project.totalCompleted;
const tasks = project.tasks;
console.log({ projects, project, totalCompleted, tasks });
app.deleteProject(project.id);

// import "./modules/storable";
// import "./modules/task"

// import "./modules/zandbox"

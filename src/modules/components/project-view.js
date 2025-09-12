import "./project-view.css";
import createTaskCard from "./task-card";
import createTaskList from "./task-list";

export default function createProjectView(project) {
  const projectView = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = project.title;
  projectView.append(title);

  const description = document.createElement("p");
  description.textContent = project.description;
  description.className = "description";
  projectView.append(description);

  const tasks = project.tasks.sort((a, b) => a.dueDate - b.dueDate);
  const pendingTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  if (pendingTasks.length) {
    const pendingTaskList = createTaskList(pendingTasks);
    projectView.append(pendingTaskList);
  }

  if (completedTasks.length) {
    const completedTaskList = createTaskList(completedTasks);
    projectView.append(completedTaskList);
  }

  projectView.className = "project-view";
  return projectView;
}

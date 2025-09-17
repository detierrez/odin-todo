import { createAddButton } from "../icon-button";
import "./style.css";
import createTaskList from "../task-list";

export default function createProjectView({ project, onAddClick, ...args }) {
  const projectView = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = project.title;
  projectView.append(title);

  const description = document.createElement("p");
  description.textContent = project.description;
  description.className = "description";
  projectView.append(description);

  const addButton = createAddButton();
  addButton.addEventListener('click', onAddClick)
  projectView.append(addButton);

  const tasks = project.tasks.sort((a, b) => a.dueDate - b.dueDate);
  const pendingTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  if (pendingTasks.length) {
    const pendingTaskList = createTaskList({ tasks: pendingTasks, ...args });
    projectView.append(pendingTaskList);
  }

  if (completedTasks.length) {
    const completedTaskList = createTaskList({
      tasks: completedTasks,
      ...args,
    });
    projectView.append(completedTaskList);
  }

  projectView.className = "project-view";
  return projectView;
}

import { createAddButton } from "../icon-button";
import "./style.css";
import createTaskList from "../task-list";
import TaskList from "../task-list";

export default function createProjectView({ project, onAddClick, ...args }) {
  console.log(project)
  const projectView = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = project.title;
  projectView.append(title);

  const description = document.createElement("p");
  description.textContent = project.description;
  description.className = "description";
  projectView.append(description);

  const addContainer = document.createElement("div");
  addContainer.className = "add-container";

  const addLabel = document.createElement("label");
  addLabel.className = "add-label";
  addLabel.htmlFor = "add-button";
  addLabel.textContent = "New task";
  addContainer.append(addLabel);

  const addButton = createAddButton();
  addButton.id = "add-button";
  addContainer.append(addButton);
  projectView.append(addContainer);

  const taskList = new TaskList({ tasks: project.tasks, ...args });
  projectView.append(taskList.element);

  addButton.addEventListener("click", (event) => {
    onAddClick(event, taskList);
  });

  // if (completedTasks.length) {
  //   const completedTaskList = new TaskList({
  //     tasks: completedTasks,
  //     ...args,
  //   });
  //   projectView.append(completedTaskList.element);
  // }

  projectView.className = "project-view";
  return projectView;
}

import { createAddButton } from "../icon-button";
import "./style.css";
import createTaskList from "../task-list";
import TaskList from "../task-list";

export default function createProjectView({ project, onAddClick, ...args }) {
  const projectView = document.createElement("div");
  projectView.className = "project-view";

  const title = document.createElement("h2");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;
  description.className = "description";

  const addContainer = document.createElement("div");
  addContainer.className = "add-container";

  const addLabel = document.createElement("label");
  addLabel.className = "add-label";
  addLabel.htmlFor = "add-button";
  addLabel.textContent = "New task";

  const addButton = createAddButton();
  addButton.id = "add-button";

  addContainer.append(addButton);
  addContainer.append(addLabel);

  const taskList = new TaskList({ tasks: project.tasks, ...args });
  addButton.addEventListener("click", (event) => {
    onAddClick(event, taskList);
  });

  projectView.append(title);
  projectView.append(description);
  projectView.append(addContainer);
  projectView.append(taskList.element);

  return projectView;
}

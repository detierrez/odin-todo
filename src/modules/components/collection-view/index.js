import { createAddButton } from "../icon-button";
import "./style.css";
import TaskList from "../task-list";

// class ProjectView {
//   constructor() {
//     this.element = document.createElement("div");
//     projectView.className = "project-view";
//   }
// }

export default function createCollectionView({
  collection,
  onAddClick,
  ...args
}) {
  const collectionView = document.createElement("div");
  collectionView.className = "collection-view";

  const title = document.createElement("h2");
  title.textContent = collection.title;

  const description = document.createElement("p");
  description.textContent = collection.description;
  description.className = "description";

  const addContainer = document.createElement("div");
  addContainer.className = "add-container";

  const addLabel = document.createElement("label");
  addLabel.className = "add-label";
  addLabel.htmlFor = "add-button";
  addLabel.textContent = "New task";

  const addButton = createAddButton();
  addButton.id = "add-button";

  addContainer.append(addLabel);
  addContainer.append(addButton);

  const taskList = new TaskList({ tasks: collection.tasks, ...args });
  addButton.addEventListener("click", (event) => {
    onAddClick(event, taskList);
  });

  collectionView.append(title);
  collectionView.append(description);
  collectionView.append(addContainer);
  collectionView.append(taskList.element);

  return collectionView;
}

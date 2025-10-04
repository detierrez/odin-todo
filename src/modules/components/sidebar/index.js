import {createIconButton} from "../icon-button";
import "./style.css";

export default function createSidebar({
  getCollections,
  getProjects,
  onCollectionClick,
  onProjectAdd,
}) {
  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar");

  const pageTitle = document.createElement("h1")
  pageTitle.innerHTML = "<a href=''>Dew it</a>"

  const collectionsContainer = document.createElement("div");
  collectionsContainer.classList.add("collections-container");

  for (const collection of getCollections()) {
    collectionsContainer.append(
      createCollectionButton(collection, "collection", onCollectionClick)
    );
  }

  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("projects-container");

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");
  titleContainer.innerHTML = "<h2>Projects</h2>";
  const addProjectButton = createIconButton("plus");
  addProjectButton.addEventListener("click", onProjectAdd);
  titleContainer.append(addProjectButton);

  projectsContainer.append(titleContainer);
  for (const project of getProjects()) {
    projectsContainer.append(
      createCollectionButton(project, "project", onCollectionClick)
    );
  }

  sidebar.append(pageTitle)
  sidebar.appendChild(collectionsContainer);
  sidebar.appendChild(projectsContainer);

  return sidebar;
}

function createCollectionButton(collection, type, onClick) {
  const button = document.createElement("button");
  button.classList.add("collection-button");
  if (!collection.title) {
    button.textContent = "New project";
  } else {
    button.textContent = collection.title;
  }
  button.dataset.collectionId = collection.id;
  button.dataset.collectionType = type;
  button.addEventListener("click", onClick);
  return button;
}

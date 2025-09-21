import "./style.css";

export default function createSidebar({
  collections,
  projects,
  onCollectionClick,
}) {
  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar");

  const collectionsContainer = document.createElement("div");
  collectionsContainer.classList.add("collections-container");
  collectionsContainer.innerHTML = "<h2>Collections</h2>";

  for (const collection of collections) {
    const btn = document.createElement("button");
    btn.textContent = collection.title;
    btn.dataset.id = collection.id;
    btn.dataset.type = "collection";

    btn.addEventListener("click", onCollectionClick)

    collectionsContainer.appendChild(btn);
  }

  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("projects-container");
  projectsContainer.innerHTML = "<h2>Projects</h2>";

  for (const project of projects) {
    const btn = document.createElement("button");
    btn.textContent = project.title;
    btn.dataset.id = project.id;
    btn.dataset.type = "project";
    btn.addEventListener("click", onCollectionClick);
    projectsContainer.appendChild(btn);
  }

  sidebar.appendChild(collectionsContainer);
  sidebar.appendChild(projectsContainer);

  return sidebar;
}

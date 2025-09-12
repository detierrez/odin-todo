import app from "./app";
import { createProjectButton } from "./components/project-button";
import createProjectView from "./components/project-view";

const collectionsContainer = document.querySelector(".collections-container");
const collections = app.getCollections();
for (const collection of collections) {
  const btn = createProjectButton(collection);
  btn.addEventListener("click", renderCollectionView);
  collectionsContainer.appendChild(btn);
}

function renderCollectionView(event) {
  const projectId = this.dataset.id;
  const project = app.getCollection(projectId);
  const projectView = createProjectView(project);
  divMain.replaceChildren(projectView);
}

const projectsContainer = document.querySelector(".projects-container");
const projects = app.getProjects();
for (const project of projects) {
  const btn = createProjectButton(project);
  btn.addEventListener("click", renderProjectView);
  projectsContainer.appendChild(btn);
}

function renderProjectView(event) {
  const projectId = this.dataset.id;
  const project = app.getProject(projectId);
  const projectView = createProjectView(project);
  divMain.replaceChildren(projectView);
}

const btn = createProjectButton("+");
projectsContainer.appendChild(btn);

const divMain = document.querySelector(".main");
const projectView = createProjectView(projects[0]);

divMain.append(projectView);



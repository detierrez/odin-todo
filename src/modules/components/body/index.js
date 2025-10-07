import "./style.css";
import createSidebar from "../sidebar";
import createCollectionView from "../collection-view";

export default function createBody({
  getDefaultCollection,
  getCollectionFromEvent,
  createProjectFromEvent,
  updateProjectFromEvent,
  deleteProjectFromEvent,
  ...args
}) {
  const body = document.createElement("div");
  body.classList.add("app-body");

  let main = document.createElement("div");
  let sidebar = document.createElement("div");
  renderDefaultView();

  body.appendChild(sidebar);
  body.appendChild(main);

  return body;

  function onCollectionClick(event) {
    const collection = getCollectionFromEvent(event);
    renderCollection(collection);
  }

  function onProjectAdd(event) {
    const project = createProjectFromEvent(event);
    renderCollection(project);
    renderSidebar();
    main.querySelector(".title").focus();
  }

  function onProjectChange(event) {
    updateProjectFromEvent(event);
    renderSidebar();
  }

  function onProjectDelete(event) {
    deleteProjectFromEvent(event);
    renderDefaultView();
  }

  function renderCollection(collection) {
    const newView = createCollectionView({
      collection,
      onProjectDelete,
      onProjectChange,
      ...args,
    });
    newView.classList.add("main");
    main.replaceWith(newView);
    main = newView;
  }

  function renderSidebar() {
    const newSidebar = createSidebar({
      onCollectionClick,
      onProjectAdd,
      ...args,
    });
    sidebar.replaceWith(newSidebar);
    sidebar = newSidebar;
  }

  function renderDefaultView() {
    const inbox = getDefaultCollection();
    renderCollection(inbox);
    renderSidebar();
  }
}

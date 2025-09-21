import "./style.css";
import createSidebar from "../sidebar";
import createCollectionView from "../collection-view";

export default function createBody({
  sidebarArgs,
  mainArgs,
  getCollectionFromEvent,
}) {
  const body = document.createElement("div");
  body.classList.add("app-body");

  const renderCollection = function (collection) {
    const newView = createCollectionView({ collection, ...mainArgs });
    main.replaceWith(newView);
    main = newView;
  };

  const onCollectionClick = function (event) {
    const collection = getCollectionFromEvent(event);
    renderCollection(collection);
  }

  const sidebar = createSidebar({
    onCollectionClick,
    ...sidebarArgs,
  });

  let main = document.createElement("div");

  body.appendChild(sidebar);
  body.appendChild(main);

  return body;
}

import "./style.css";
import createSidebar from "../sidebar";
import createCollectionView from "../collection-view";

export default function createBody({ getCollectionFromEvent, ...args }) {
  const body = document.createElement("div");
  body.classList.add("app-body");

  const renderCollection = function (collection) {
    const newView = createCollectionView({ collection, ...args });
    main.replaceWith(newView);
    main = newView;
  };

  const onCollectionClick = function (event) {
    const collection = getCollectionFromEvent(event);
    renderCollection(collection);
  };

  const sidebar = createSidebar({
    onCollectionClick,
    ...args,
  });

  let main = document.createElement("div");

  body.appendChild(sidebar);
  body.appendChild(main);

  return body;
}

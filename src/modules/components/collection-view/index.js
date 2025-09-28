import "./style.css";
import createTaskView from "../task-view";
import createFieldElement from "../field-element";
import createIconButton from "../icon-button";

export default function createCollectionView({
  collection,
  onAddClick,
  onProjectDelete,
  onProjectChange,
  ...args
}) {
  const collectionView = document.createElement("div");
  collectionView.className = "collection-view";

  const title = createFieldElement({
    type: "title",
    value: collection.title,
    onValueChange: onProjectChange,
    dataset: {
      collectionId: collection.id,
      collectionProperty: "title",
    },
  });

  const description = document.createElement("p");
  description.textContent = collection.description;
  description.className = "description";

  const { taskView, addTaskOnEvent } = createTaskView({
    tasks: collection.tasks,
    ...args,
  });

  const deleteButton = createIconButton("trashBin");
  deleteButton.dataset.collectionId = collection.id;
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", onProjectDelete);

  const addButton = createIconButton("plus");
  addButton.classList.add("add-button");
  addButton.addEventListener("click", addTaskOnEvent);

  collectionView.append(title);
  collectionView.append(deleteButton);
  collectionView.append(taskView);
  collectionView.append(addButton);

  return collectionView;
}

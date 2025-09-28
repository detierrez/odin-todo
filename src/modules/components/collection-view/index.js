import "./style.css";
import createTaskList from "../task-list";
import createFieldElement from "../field-element";
import { createIconButton } from "../icon-button";
import { isLeapYearWithOptions } from "date-fns/fp";

export default function createCollectionView({
  collection,
  isProject,
  onAddClick,
  onProjectDelete,
  onProjectChange,
  ...args
}) {
  const collectionView = document.createElement("div");
  collectionView.className = "collection-view";

  let titleArgs;
  let deleteButton;
  if (isProject(collection)) {
    deleteButton = createIconButton("trashBin");
    deleteButton.dataset.collectionId = collection.id;
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", onProjectDelete);
    collectionView.append(deleteButton);

    titleArgs = {
      onValueChange: onProjectChange,
      dataset: {
        collectionId: collection.id,
        collectionProperty: "title",
      },
    };
  } else {
    titleArgs = {
      isReadOnly: true,
    };
  }

  const title = createFieldElement({
    type: "title",
    value: collection.title,
    ...titleArgs,
  });

  const { taskList, addTaskOnEvent } = createTaskList({
    tasks: collection.tasks,
    ...args,
  });

  const addButton = createIconButton("plus");
  addButton.classList.add("add-button");
  addButton.addEventListener("click", addTaskOnEvent);

  collectionView.append(title);
  collectionView.append(taskList);
  collectionView.append(addButton);
  if (deleteButton) collectionView.append(deleteButton);

  return collectionView;
}

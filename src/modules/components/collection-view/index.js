import "./style.css";
import createTaskView from "../task-view";
import createFieldElement from "../field-element";

export default function createCollectionView({
  collection,
  onAddClick,
  updateProjectFromEvent,
  ...args
}) {
  const collectionView = document.createElement("div");
  collectionView.className = "collection-view";

  const title = document.createElement("h2");
  title.textContent = collection.title;

  const description = document.createElement("p");
  description.textContent = collection.description;
  description.className = "description";

  const taskView = createTaskView({ tasks: collection.tasks, ...args });

  collectionView.append(
    createFieldElement({
      type: "title",
      value: collection.title,
      onValueChange: updateProjectFromEvent,
      dataset: {
        collectionId: collection.id,
        collectionProperty: "title",
      },
    })
  );
  // collectionView.append(
  //   createFieldElement({
  //     type: "title",
  //     value: collection.title,
  //     isReadOnly: true,
  //   })
  // );
  // collectionView.append(
  //   createFieldElement({
  //     type: "description",
  //     value: collection.description,
  //     onValueChange: updateProjectFromEvent,
  //     dataset: {
  //       collectionId: collection.id,
  //       collectionProperty: "description",
  //     },
  //   })
  // );
  collectionView.append(taskView);

  return collectionView;
}

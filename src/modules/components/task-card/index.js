import "./style.css";
import createDatePicker from "../date-picker";
import createIconButton, { createTwoSidedIconButton } from "../icon-button";
import createFieldElement from "../field-element";

export default function createTaskCard({
  task,
  onCheckClick,
  onDeleteClick,
  onValueChange,
  ...args
}) {
  const taskCard = document.createElement("div");
  taskCard.className = "task-card";
  taskCard.dataset.taskId = task.id;
  taskCard.classList.add(task.isCompleted ? "completed" : "not-completed");
  taskCard.addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("expanded");
  });

  const title = createFieldElement({
    type: "title",
    value: task.title,
    onValueChange,
    dataset: {
      taskId: task.id,
      taskProperty: "title",
    },
  });

  const datePicker = createDatePicker({
    taskId: task.id,
    date: task.dueDate,
    ...args,
  });

  const description = createFieldElement({
    type: "description",
    value: task.description,
    onValueChange,
    dataset: {
      taskId: task.id,
      taskProperty: "description",
    },
  });

  const [iconA, iconB] = task.isCompleted
    ? ["notCheck", "check"]
    : ["check", "notCheck"];
  const checkButton = createTwoSidedIconButton(iconA, iconB);
  checkButton.classList.add("check-button");
  checkButton.dataset.taskId = task.id;
  checkButton.addEventListener("click", (event) => {
    taskCard.classList.toggle("completed");
    taskCard.classList.toggle("not-completed");
    onCheckClick(event);
  });

  const deleteButton = createIconButton("trashBin");
  deleteButton.classList.add("delete-button");
  deleteButton.dataset.taskId = task.id;
  deleteButton.addEventListener("click", (event) => {
    taskCard.remove();
    onDeleteClick(event);
  });

  taskCard.append(title);
  taskCard.append(checkButton);
  taskCard.append(deleteButton);
  taskCard.append(datePicker);
  taskCard.append(description);

  for (const element of taskCard.children) {
    element.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
  return taskCard;
}

import {
  endOfDay,
  endOfToday,
  formatDistanceToNow,
  formatRelative,
  intlFormat,
  intlFormatDistance,
  isWithinInterval,
  startOfToday,
} from "date-fns";
import "./style.css";
import createDatePicker from "../date-picker";
import { createCheckButton, createDeleteButton } from "../icon-button";

export default function createTaskCard({
  task,
  stopPropagation,
  onCheckClick,
  onDeleteClick,
  onValueChange,
  ...args
}) {
  const taskCard = document.createElement("button");
  taskCard.className = "task-card";
  taskCard.dataset.taskId = task.id;
  taskCard.classList.add(task.isCompleted ? "completed" : "not-completed");

  const title = document.createElement("input");
  title.className = "title";
  title.value = task.title;
  title.dataset.property = "title";
  title.placeholder = "Add a title..."
  title.addEventListener("change", onValueChange);
  taskCard.append(title);

  const buttonsGroup = document.createElement("div");
  buttonsGroup.className = "buttons-group";

  {
    const checkButton = createCheckButton();
    checkButton.dataset.taskId = task.id;
    checkButton.card = taskCard;
    checkButton.addEventListener("click", onCheckClick);
    buttonsGroup.append(checkButton);

    const deleteButton = createDeleteButton();
    deleteButton.dataset.taskId = task.id;
    deleteButton.card = taskCard;
    deleteButton.addEventListener("click", onDeleteClick);
    buttonsGroup.append(deleteButton);
  }
  taskCard.append(buttonsGroup);

  const datePicker = createDatePicker({
    taskId: task.id,
    date: task.dueDate,
    ...args,
  });
  taskCard.append(datePicker);

  const description = document.createElement("textarea");
  description.className = "description";
  // description.rows = 5;
  description.value = task.description;
  description.placeholder = "Add a description..."
  description.dataset.property = "description";
  description.addEventListener("change", onValueChange);

  taskCard.append(description);

  // for (const child of taskCard.children) {
  //   child.addEventListener("click", stopPropagation);
  //   child.addEventListener("keyup", stopPropagation);
  // }
  return taskCard;
}

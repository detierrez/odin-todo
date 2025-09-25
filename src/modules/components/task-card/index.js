import "./style.css";
import createDatePicker from "../date-picker";
import createIconButton, {
  createCheckButton,
  createDeleteButton,
  createTwoSidedIconButton,
} from "../icon-button";
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

  taskCard.append(
    createFieldElement({
      type: "title",
      value: task.title,
      onValueChange,
      dataset: {
        taskId: task.id,
        taskProperty: "title",
      },
    })
  );

  const buttonsGroup = document.createElement("div");
  buttonsGroup.className = "buttons-group";

  {
    const checkButton = createTwoSidedIconButton("check", "notCheck");
    checkButton.dataset.taskId = task.id;
    checkButton.card = taskCard;
    checkButton.addEventListener("click", (event) => {
      taskCard.classList.toggle("completed");
      taskCard.classList.toggle("not-completed");
      onCheckClick(event);
    });
    buttonsGroup.append(checkButton);

    const deleteButton = createIconButton("trashBin");
    deleteButton.dataset.taskId = task.id;
    deleteButton.addEventListener(
      "click",
      (event) => {
        taskCard.remove();
        onDeleteClick(event);
      },
      true
    );
    buttonsGroup.append(deleteButton);
  }
  taskCard.append(buttonsGroup);

  taskCard.append(
    createDatePicker({
      taskId: task.id,
      date: task.dueDate,
      ...args,
    })
  );

  taskCard.append(
    createFieldElement({
      type: "description",
      value: task.description,
      onValueChange,
      dataset: {
        taskId: task.id,
        taskProperty: "description",
      },
    })
  );

  return taskCard;
}

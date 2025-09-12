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
import "./task-card.css";

export default function createTaskCard(task) {
  const taskCard = document.createElement("button");
  taskCard.className = "task-card";

  const title = document.createElement("input");
  title.value = task.title;
  taskCard.append(title);

  const dateDetails = document.createElement("input");
  // dateDetails.setAttribute("type", "date");
  dateDetails.className = "date-details";

  const dateFormatted = document.createElement("span");
  dateFormatted.className = "date-formatted";
  dateFormatted.textContent = " - ";
  dateFormatted.textContent += intlFormat(task.dueDate, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  // dateDetails.append(dateFormatted);
  const dateDistance = document.createElement("span");
  dateDistance.className = "date-distance";
  const isDueToday = isWithinInterval(task.dueDate, {
    start: startOfToday,
    end: endOfToday,
  });
  const distance = isDueToday
    ? "today"
    : intlFormatDistance(task.dueDate, new Date()).replace("/$./");
  dateDistance.textContent = distance[0].toUpperCase() + distance.slice(1);

  dateDetails.value = distance;
  dateDetails.append(dateDistance);

  taskCard.append(dateDetails);

  const description = document.createElement("textarea");
  description.textContent = task.description;

  taskCard.append(description);
  if (task.isCompleted) taskCard.classList.add("completed");
  return taskCard;
}

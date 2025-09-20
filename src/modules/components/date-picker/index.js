import "./style.css";
import { format, intlFormat, intlFormatDistance, isToday } from "date-fns";
import app from "../../app";

export default function createDatePicker({
  taskId,
  date,
  onDateChange,
  ...args
}) {
  const datePicker = document.createElement("div");
  datePicker.className = "date-picker";

  const dateLabel = document.createElement("p");
  dateLabel.textContent = getLabelText(date);
  dateLabel.className = "date-distance";
  datePicker.append(dateLabel);

  // const dateFormatted = document.createElement("span");
  // dateFormatted.className = "date-formatted";
  // dateFormatted.textContent = ": " + intlFormat(date, {
  //   weekday: "long",
  //   month: "short",
  //   day: "numeric",
  // });
  // dateLabel.append(dateFormatted);

  const dateInput = document.createElement("input");
  dateInput.className = "date-input";
  dateInput.setAttribute("type", "date");
  dateInput.dataset.taskId = taskId;
  dateInput.value = format(date, "yyyy-MM-dd");
  dateInput.getLabelText = getLabelText;
  dateInput.label = dateLabel;
  dateInput.addEventListener("change", (event) => {
    const newDate = new Date(event.target.value.replace(/-/g, "/"));
    dateLabel.textContent = getLabelText(newDate);
    if (typeof onDateChange === "function") {
      onDateChange(event, newDate);
    }
  });
  datePicker.append(dateInput);

  return datePicker;
}

function getLabelText(date) {
  const dateDistance = isToday(date)
    ? "today"
    : intlFormatDistance(date, new Date());

  return dateDistance[0].toUpperCase() + dateDistance.slice(1);
}

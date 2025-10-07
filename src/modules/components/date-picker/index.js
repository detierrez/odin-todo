import "./style.css";
import { format, intlFormatDistance, isToday } from "date-fns";

export default function createDatePicker({
  taskId,
  date = new Date(),
  onDateChange
}) {
  const datePicker = document.createElement("button");
  datePicker.classList.add("date-picker", "field-element");

  const dateLabel = document.createElement("span");
  dateLabel.textContent = getLabelText(date);
  dateLabel.className = "date-distance";

  // // const dateFormatted = document.createElement("span");
  // // dateFormatted.className = "date-formatted";
  // // dateFormatted.textContent = ": " + intlFormat(date, {
  // //   weekday: "long",
  // //   month: "short",
  // //   day: "numeric",
  // // });
  // // dateLabel.append(dateFormatted);

  const dateInput = document.createElement("input");
  dateInput.className = "input";
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

  datePicker.addEventListener("click", () => {
    dateInput.showPicker();
  });

  datePicker.append(dateInput);
  datePicker.append(dateLabel);

  return datePicker;
}

function getLabelText(date) {
  const dateDistance = isToday(date)
    ? "today"
    : intlFormatDistance(date, new Date());

  return dateDistance;
  // return dateDistance[0].toUpperCase() + dateDistance.slice(1);
}

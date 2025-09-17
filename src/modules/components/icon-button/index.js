import "./style.css";
import trashBinIcon from "@icons/trash-bin.svg";
import checkIcon from "@icons/check.svg";
import notCheckIcon from "@icons/not-check.svg";
import plusIcon from "@icons/plus.svg";

export default function createIconButton(icon) {
  const iconButton = document.createElement("button");
  iconButton.className = "icon-button";

  iconButton.append(createIconElement(icon));

  return iconButton;
}

export function createDeleteButton() {
  const deleteButton = createIconButton(trashBinIcon);
  return deleteButton;
}

export function createCheckButton() {
  const checkButton = document.createElement("button");
  checkButton.classList.add("icon-button", "check-button");

  let img = createIconElement(checkIcon);
  img.classList.add("check-icon");
  checkButton.append(img);

  img = createIconElement(notCheckIcon);
  img.classList.add("not-check-icon");
  checkButton.append(img);

  return checkButton;
}

export function createAddButton() {
  const addButton = document.createElement("button");
  addButton.classList.add("icon-button", "add-button");

  let img = createIconElement(plusIcon);
  addButton.append(img);

  return addButton;
}

function createIconElement(icon) {
  const img = document.createElement("img");
  img.src = icon;
  return img;
}

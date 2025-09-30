import "./style.css";
import trashBin from "@icons/trash-bin.svg";
import check from "@icons/check.svg";
import notCheck from "@icons/not-check.svg";
import plus from "@icons/plus.svg";
import arrow from "@icons/arrow.svg";

const iconsByName = {
  trashBin,
  check,
  notCheck,
  plus,
  arrow,
};

export function createIconButton(iconName) {
  const iconButton = document.createElement("button");
  iconButton.classList.add("icon-button");

  iconButton.append(createIconElement(iconName));

  return iconButton;
}

export function createTwoSidedIconButton(iconNameA, iconNameB) {
  const iconButton = createIconButton(iconNameA);
  iconButton.append(createIconElement(iconNameB));
  iconButton.classList.add("two-sided", "side-a");

  iconButton.addEventListener("click", (event) => {
    iconButton.classList.toggle("side-a");
    iconButton.classList.toggle("side-b");
  });

  return iconButton;
}

export function createLabeledButton(iconName, labelText) {
  const label = document.createElement("span");
  label.className = "icon-button-label";
  label.textContent = labelText;

  const button = createIconButton(iconName);

  label.append(button);

  return label;
}

function createIconElement(iconName) {
  const icon = iconsByName[iconName];
  const img = document.createElement("img");
  img.src = icon;
  return img;
}

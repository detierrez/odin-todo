import "./style.css";

export default function createFieldElement({
  type,
  value,
  dataset,
  onValueChange,
  isReadOnly = false,
}) {
  let tag;
  if (type === "title") {
    tag = "input";
  } else if (type === "description") {
    tag = "textarea";
  }
  const element = document.createElement(tag);
  element.classList.add("field-element", type);
  element.value = value;
  element.placeholder = `Add a ${type}...`;

  if (isReadOnly) {
    element.setAttribute("readonly", "");
  } else {
    Object.assign(element.dataset, dataset);
    element.addEventListener("change", onValueChange);
  }

  if (type === "title") {
    element.setAttribute("maxlength", "20");
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.currentTarget.blur();
      }
    });
  }

  return element;
}

export function createSelect(defaultOption, options, selectedValue) {
  const select = document.createElement("select");
  select.classList.add("field-element");

  const { value, text } = defaultOption;
  select.append(createOption(value, text, value === selectedValue));

  for (const { value, text } of options) {
    select.append(createOption(value, text, value === selectedValue));
  }

  return select;
}

function createOption(value, text, isSelected) {
  const option = document.createElement("option");
  option.textContent = text;
  option.value = value;
  if (isSelected) option.setAttribute("selected", "");

  return option;
}

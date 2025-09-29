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

export function createSelect(options, selected) {
  const select = document.createElement("select");
  select.classList.add("field-element");

  for (const option of options) {
    console.log(option);
    const element = document.createElement("option");
    element.textContent = option;
    if (option === selected) element.setAttribute("selected", "");
    select.append(element);
  }

  return select;
}

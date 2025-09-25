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

  return element;
}

import "./style.css";

export default function createExpandable(...content) {
  const expandable = document.createElement("div");
  expandable.classList.add("expandable");

  const inner = document.createElement("div");
  inner.classList.add("inner");

  inner.append(...content);
  expandable.append(inner);

  function toggleExpandable() {
    expandable.classList.toggle("expanded");
  }

  return { expandable, toggleExpandable };
}

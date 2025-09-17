import "./style.css";

export function createProjectButton(project) {
  const btn = document.createElement("button");
  btn.className = "project-button";
  btn.dataset.id = project.id;

  const title = document.createElement("div");
  title.textContent = project.title;
  btn.append(title);

  const pending = document.createElement("div");
  const pendingAmount = project.totalPending;
  pending.textContent = pendingAmount;
  pending.className = "pending";
  pending.className += pendingAmount > 0 ? "" : " hidden";
  // btn.append(pending);

  return btn;
}

import "./style.css";
import createSidebar from "../sidebar";
import createProjectView from "../project-view";

export default function createBody({
  sidebarArgs,
  mainArgs,
}) {
  const body = document.createElement("div");
  body.classList.add("app-body");

  const sidebar = createSidebar(sidebarArgs);
  const main = createProjectView(mainArgs);

  body.appendChild(sidebar);
  body.appendChild(main);

  return body;
}

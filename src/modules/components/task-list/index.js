import "./style.css";
import createTaskCard from "../task-card";

export default class TaskList {
  constructor({ tasks, ...args }) {
    this.element = document.createElement("div");
    this.element.className = "task-list";
    this.args = args;
    this.render(tasks);
  }

  render(tasks) {
    tasks = tasks.sort((a, b) => a.dueDate - b.dueDate);
    const pendingTasks = tasks.filter((task) => !task.isCompleted);
    const completedTasks = tasks.filter((task) => task.isCompleted);
    tasks = pendingTasks.concat(completedTasks);

    for (const task of tasks) {
      const taskCard = createTaskCard({ task, ...this.args });
      this.element.append(taskCard);
    }
  }

  addTask(task) {
    const taskCard = createTaskCard({ task, ...this.args });
    this.element.insertBefore(taskCard, this.element.firstChild);
  }
}

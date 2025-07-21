import { Task } from "./task";
import { Project, Collection } from "./project";

const storedClasses = [Task, Project];

const itemsByClass = {};
for (const _class of storedClasses) {
  itemsByClass[_class.name] = [];
}

const storedItems = Object.values({ ...localStorage });
for (const item of storedItems) {
  const { className, itemArguments } = JSON.parse(item);
  itemsByClass[className].push(itemArguments);
}

for (const _class of storedClasses) {
  for (const itemArguments of itemsByClass[_class.name]) {
    new _class(itemArguments);
  }
}

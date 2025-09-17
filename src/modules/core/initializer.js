import { Task } from "./task";
import { Project, Collection } from "./project";

import demoData from "./demo-data";

localStorage.clear();

if (localStorage.length === 0) {
  for (const _Class in demoData) {
    for (const itemArguments of demoData[_Class]) {
      localStorage.setItem(
        itemArguments.id,
        JSON.stringify({ className: _Class, itemArguments })
      );
    }
  }
}

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
    _class.create(itemArguments);
  }
}

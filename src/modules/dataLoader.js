function loadItemsByClass(expectedClasses) {
  const itemsByClass = {};
  for (const _class of expectedClasses) {
    itemsByClass[_class.name] = {};
  }

  const storedItems = { ...localStorage };
  for (const id in storedItems) {
    const { className, item } = JSON.parse(storedItems[id]);
    itemsByClass[className][id] = item;
  }
  return itemsByClass;
}

export default loadItemsByClass;
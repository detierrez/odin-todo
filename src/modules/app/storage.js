class Storage {
  static save(item) {
    localStorage.setItem(item.id, JSON.stringify(item));
  }

  static remove(item) {
    localStorage.removeItem(item.id);
  }
}

export default Storage;

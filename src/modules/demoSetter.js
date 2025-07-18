import demoData from "./demoData";

localStorage.clear();

if (localStorage.length === 0) {
  setDemoData();
}

function setDemoData() {
  for (const className in demoData) {
    for (const item of demoData[className]) {
      localStorage.setItem(
        item.id,
        JSON.stringify({ className, item })
      );
    }
  }
}

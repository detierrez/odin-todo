import demoData from "./demoData";

localStorage.clear();

if (localStorage.length === 0) {
  setDemoData();
}

function setDemoData() {
  for (const className in demoData) {
    for (const itemArguments of demoData[className]) {
      localStorage.setItem(
        itemArguments.id,
        JSON.stringify({ className, itemArguments })
      );
    }
  }
}

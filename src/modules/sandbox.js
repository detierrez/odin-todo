console.log("/// Sandbox Start ///")
// class Person {
//   constructor(name) {
//     this.name = name;
//     this.partners = [];
//   }
//   addPartner(person) {
//     this.partners.push(person);
//   }

import { tr } from "date-fns/locale";

// import initialData from "./initialData";

//   toJSON(key) {
//     if (key) {
//       return this.name;
//     }
//     return { class: this.constructor.name, ...this };
//   }
// }

// const person1 = new Person("John");
// const person2 = new Person("Jack");

// person1.addPartner(person2);
// person2.addPartner(person1);

// const stringified = JSON.stringify(person1);
// const parsed = JSON.parse(stringified);

// console.log("stringified:", stringified);
// console.log("parsed:", parsed);

// console.log(person1.toString())

console.log("Before");

// class Gen1 {
//   static instances = [];

//   static add(instance) {
//     this.instances.push(instance);
//   }

//   constructor() {
//     this.id = crypto.randomUUID();
//     Gen1.add(this)
//   }

//   register() {
//     this.constructor.add(this);
//   }
// }

// class Gen2 extends Gen1 {
//   static instances = [];

//   constructor() {
//     super();

//     Gen2.add(this)
//   }
// }

// const gen1Instance = new Gen1();
// const gen2Instance = new Gen2();

// console.log("Gen1 instances:", Gen1.instances);
// console.log("Gen2 instances:", Gen2.instances);

console.log("Saver class test");















console.log("\\\\\\\\ Sandbox End \\\\\\\\")

export default class PubSub {
  static subscribers = [];

  static subscribe(subscriber) {
    this.subscribers.push(subscriber);

    const subscribers = this.subscribers;
    const publish = function ({method, object}) {
      for (const subscriber of subscribers) {
        if (subscriber === this) continue;
        this[method](object);
      }
    };

    return publish;
  }
}

// EXAMPLE

// class A {
//   static publish = PubSub.subscribe(this);
//   static onPublishment(data) {
//     console.log(`A received "${data}"`);
//   }
// }

// class B {
//   static publish = PubSub.subscribe(this);
//   static onPublishment(data) {
//     console.log(`B received "${data}"`);
//   }
// }

// A.publish("hi from A");
// B.publish("hello from Bee");

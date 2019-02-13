var Pipeline = require('./pipeline');

try {

  module.exports = class ToppingChef extends Pipeline {

    constructor() {
      super();
      // this.activeToppings = 0; // activeTopping <= maxActiveTopping; // we don't need this
      this.defaultToppingsTime = 4; // 4 sec // can only be static property with ES6
      // this.maxActiveToppings = 2; // 2 sec // we don't need this

    }

    async createTopping(order) {

      this.busy = true;
      let createToppingsTime = Math.ceil(order.toppings/2) * this.defaultToppingsTime;
      await this.timeout(createToppingsTime);
      this.busy = false;

    }

  };

} catch (err) {
  console.log('error in topping-chef.js');
  console.log(err);
}

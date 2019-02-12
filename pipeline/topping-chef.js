var Pipline = require('./pipline');

try {

  module.exports = class ToppingChef extends Pipline {

    constructor() {
      super();
      this.activeTopping = 0; // activeTopping <= maxActiveTopping;
      this.createToppingTime = 4; // 4 sec // can only be static property with ES6
      this.maxActiveTopping = 2; // s sec

    }

    createTopping() {
      return this.createToppingTime;
    }

  };

} catch (err) {
  console.log('error in topping-chef.js');
  console.log(err);
}

var doughChef = require("./pipeline/dough-chef.js");
var toppingChef = require("./pipeline/topping-chef.js");
var oven = require("./pipeline/oven.js");
var waiter = require("./pipeline/waiter.js");

try {

  module.exports = class Restaurant {

    constructor(data) {
      this.id = data.id;
      this.doughChefs = []; // array of objects
      this.toppingChefs = []; // array of objects
      this.ovens = []; // array of objects
      this.waiters = []; // array of objects
      this.orders = []; // array of objects

      delete data.id;
      this.addPipelineResources(data);

    }

    addPipelineResources(data) {

      for (var key in data) {

        let numberOfObjects = data[key];

        switch (key) {

          case 'doughChefs':
            for (var i = 0; i < numberOfObjects; i++) {
              this.doughChefs.push(new doughChef());
            }
            break;

          case 'toppingChefs':
            for (var i = 0; i < numberOfObjects; i++) {
              this.toppingChefs.push(new toppingChef());
            }
            break;

          case 'ovens':
            for (var i = 0; i < numberOfObjects; i++) {
              this.ovens.push(new oven());
            }
            break;

          case 'waiters':
            for (var i = 0; i < numberOfObjects; i++) {
              this.waiters.push(new waiter());
            }
            break;

        }

      }

    }

    addNewOrders(ordersData) {

    }

  };


} catch (err) {
  console.log('error in restaurant.js');
  console.log(err);
}

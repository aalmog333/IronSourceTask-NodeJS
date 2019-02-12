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

      this.addPipelineResources(data);

    }

    addPipelineResources(data) {

      data.forEach(function(value, index) {

        switch (index) {

          case 'doughChefs':
          for (var key in value) {
            value[key]
          }
            value.forEach(function(doughChefId) {
              this.doughChefs.push(new doughChef(doughChefId, false));
            })
            break;

          case 'toppingChefs':
            value.forEach(function(toppingChefId) {
              this.toppingChefs.push(new toppingChef(toppingChefId, false, 0));
            })
            break;

          case 'ovens':
            value.forEach(function(ovenId) {
              this.ovens.push(new oven(ovenId, false));
            })
            break;

          case 'waiters':
            value.forEach(function(waiterId) {
              this.waiters.push(new waiter(waiterId, false));
            })
            break;

        }

      });

    }

    addNewOrders(ordersData) {

    }

  };


} catch (err) {
  console.log('error in restaurant.js');
  console.log(err);
}

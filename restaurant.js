var DoughChef = require("./pipeline/dough-chef.js");
var ToppingChef = require("./pipeline/topping-chef.js");
var Oven = require("./pipeline/oven.js");
var Waiter = require("./pipeline/waiter.js");
var Order = require("./order.js");

try {

  module.exports = class Restaurant {

    constructor(data) {
      this.id = data.id;
      this.doughChefs = []; // array of objects
      this.toppingChefs = []; // array of objects
      this.ovens = []; // array of objects
      this.waiters = []; // array of objects
      this.orders = []; // array of objects

      this.startTime = null;
      this.endTime = null;

      delete data.id;
      this.addPipelineResources(data);

    }

    // @param {object} data
    addPipelineResources(data) {

      for (var key in data) {

        let numberOfObjects = data[key];

        switch (key) {

          case 'doughChefs':
            for (var i = 0; i < numberOfObjects; i++) {
              this.doughChefs.push(new DoughChef());
            }
            break;

          case 'toppingChefs':
            for (var i = 0; i < numberOfObjects; i++) {
              this.toppingChefs.push(new ToppingChef());
            }
            break;

          case 'ovens':
            for (var i = 0; i < numberOfObjects; i++) {
              this.ovens.push(new Oven());
            }
            break;

          case 'waiters':
            for (var i = 0; i < numberOfObjects; i++) {
              this.waiters.push(new Waiter());
            }
            break;

        }

      }

    }

    // @param {array} ordersData
    async addNewOrders(ordersData) {

      var d = new Date();
      var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      this.startTime = time; // d.getTime(); ????

      for (var i = 0; i < ordersData.length; i++) {

        this.orders.push(new Order(ordersData[i].id, ordersData[i].toppings));
        // this.timeout(5);
        // await setTimeout(function() {
        //   console.log('here1');
        // }, 1000 * 10);
      }

      await Promise.all(this.orders.map(async (order) => {

        await order.startPipelineProcess(this); // asynchronous process

        // await this.timeout(5);
        // console.log('here2');

        // this.orders.push(new Order(ordersData[i].id)
        // const contents = await fs.readFile(file, 'utf8')
        // console.log(contents)
      }));
      // console.log(this.doughChefs);
    };

    timeout(sec) {
      return new Promise(resolve => setTimeout(resolve, 1000 * sec));
    }

    printFinalReport() {
      //in one log file report
      // The total preparation time for the whole process of this group of order from start to end (when the last order finished her preparation)
      //The preparation time for each order (from start to end)
    }

  }

} catch (err) {
  console.log('error in restaurant.js');
  console.log(err);
}

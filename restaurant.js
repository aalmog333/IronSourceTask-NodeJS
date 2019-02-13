var DoughChef = require("./pipeline/dough-chef.js");
var ToppingChef = require("./pipeline/topping-chef.js");
var Oven = require("./pipeline/oven.js");
var Waiter = require("./pipeline/waiter.js");
var Order = require("./order.js");

const fs = require('fs');

try {

  module.exports = class Restaurant {

    constructor(data) {
      this.id = data.id;
      this.doughChefs = []; // array of objects
      this.toppingChefs = []; // array of objects
      this.ovens = []; // array of objects
      this.waiters = []; // array of objects
      this.orders = []; // array of objects

      this.startOrdersTime = null;
      this.endOrdersTime = null;

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

      this.startOrdersTime = new Date();

      // crate order objects
      for (var i = 0; i < ordersData.length; i++) {

        this.orders.push(new Order(ordersData[i].id, ordersData[i].toppings));

      }

      // start pipeline asynchronous processes
      await Promise.all(this.orders.map(async (order) => {

        await order.startPipelineProcess(this); // asynchronous process

      }));

      this.endOrdersTime = new Date();

    };

    // printing in report log file:
    // The total preparation time for the whole process of this group of orders, from start to end
    // The preparation time for each order (from start to end)
    printFinalReport() {

      console.log('in here2');
      let startTime = this.getTime(this.startOrdersTime);
      let endTime = this.getTime(this.endOrdersTime);
      let totalTime = Math.round((this.endOrdersTime.getTime() - this.startOrdersTime.getTime()) / 1000);
      let str = "Restaurant ID - (" + this.id + ") | start time: " + startTime + " | end time: " + endTime + " | total time: " + totalTime + " seconds";
      console.log(str);
      fs.appendFileSync('./log/report.txt', str + '\n');

      for (var i = 0; i < this.orders.length; i++) {

        let order = this.orders[i];
        let orderStartTime = this.getTime(order.startTime);
        let orderEndTime = this.getTime(order.endTime);
        let orderTotalTime = (order.endTime.getTime() - order.startTime.getTime()) / 1000;
        let str = "Order ID - (" + order.id + ") | start time: " + orderStartTime + " | end time: " + orderEndTime + " | total time: " + orderTotalTime + " seconds";
        console.log(str);
        fs.appendFileSync('./log/report.txt', str + '\n');
      }

    }

    getTime(d = new Date()) {

      var hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
      var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
      var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

      return hours + ":" + minutes + ":" + seconds;

    }

  }

} catch (err) {
  console.log('error in restaurant.js');
  console.log(err);
}

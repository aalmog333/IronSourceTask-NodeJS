// const fse = require('fs-extra');
const fs = require('fs');

module.exports = class Order {

  constructor(id) {
    this.id = id;
    this.stage = 0;

    var d = new Date();
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    this.startTime = time;
    this.endTime = null;

    this.log(time);

  }

  // write to log the current stage of the order
  log(time = null) {

    var stageName = null;

    switch (this.stage) {

      case 0:
        stageName = "waiting";
        break;

      case 1:
        stageName = "dough";
        break;

      case 2:
        stageName = "topping";
        break;

      case 3:
        stageName = "oven";
        break;

      case 4:
        stageName = "serving";
        break;

      case 4:
        stageName = "completed";
        break;

    }

    let str = "Order ID - (" + this.id + ") - is " + stageName + ( time ? ' | time = ' + time : '');
    console.log(str);
    fs.appendFileSync('./log/log.txt', str + '\n');
    // var ordersData = JSON.parse(fs.readFileSync('./DB/orders.json', 'utf8'));
    // myRestaurantOrdersData = ordersData.find(x => x.id === this.id);
    // fs.writeFileSync('./DB/orders.json', 'utf8');
    //TODO: write to log file;

  }

  async startPipelineProcess(restaurant) {

    return new Promise((resolve, reject) => {

      let str = "Order ID - (" + this.id + ") - " + "Restaurant ID = " + restaurant.id;
      console.log(str);
      fs.appendFileSync('./log/log.txt', str + '\n');
      resolve();
    });
  }

};

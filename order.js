const fs = require('fs');

module.exports = class Order {

  constructor(id,toppings) {
    this.id = id;
    this.toppings = toppings;
    this.stage = 0;
    this.startTime = new Date();
    this.endTime = null;

    this.log(this.startTime);

  }

  // write to log the current stage of the order
  // currently using it only for created and completed stages
  log(date = null) {

    let stageName = this.getStageName();
    let time = date ? this.getTime(date) : null;

    let str = "Order ID - (" + this.id + ") - is " + stageName + (time ? ' | time = ' + time : '');
    console.log(str);
    fs.appendFileSync('./log/log.txt', str + '\n');

  }

  async startPipelineProcess(restaurant) {

    // let str = "Order ID - (" + this.id + ") - " + "Restaurant ID = " + restaurant.id;
    // console.log(str);
    // fs.appendFileSync('./log/log.txt', str + '\n');

    this.stage = 1; // waiting dough
    await this.sendToDoughChef(restaurant.doughChefs);
    this.stage = 3; // waiting topping
    await this.sendToppingChef(restaurant.toppingChefs);
    this.stage = 5; // waiting oven
    await this.sendToOven(restaurant.ovens);
    this.stage = 7; // waiting waiter
    await this.sendToWaiter(restaurant.waiters);
    this.stage = 9; // completed

    this.endTime = new Date();
    this.log(this.endTime);

  }

  async sendToDoughChef(doughChefs) {

    for (var i = 0; i < doughChefs.length; i++) {

      if (!doughChefs[i].busy) {
        console.log("Order ID - (" + this.id + ") - sending to doughChef");
        this.stage = 2; // dough
        await doughChefs[i].createDough(this);
        break;
      }
    }

    if (this.stage == 1) { // if still waiting for dough
      // if we are here it means that currently there is no available dough chef. so we will check again in 1 sec
      console.log('Order ID - (' + this.id + ') - all doughChefs are busy');
      var that = this;
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          resolve(that.sendToDoughChef(doughChefs))
        }, 1000 * 1);
      });

    }

    // console.log('Order ID - (' + this.id + ') - here in the end of sendToDoughChef()');

  }

  async sendToppingChef(toppingChefs) {

    for (var i = 0; i < toppingChefs.length; i++) {

      if (!toppingChefs[i].busy) {
        console.log("Order ID - (" + this.id + ") - sending to toppingChef");
        this.stage = 4; // topping
        await toppingChefs[i].createTopping(this);
        break;
      }
    }

    if (this.stage == 3) { // if still waiting for topping chef
      // if we are here it means that currently there is no available topping chef. so we will check again in 1 sec
      console.log('Order ID - (' + this.id + ') - all toppingChefs are busy');
      var that = this;
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          resolve(that.sendToppingChef(toppingChefs))
        }, 1000 * 1);
      });
    }

    // console.log('Order ID - (' + this.id + ') - here in the end of sendToppingChef()');

  }

  async sendToOven(ovens) {

    for (var i = 0; i < ovens.length; i++) {

      if (!ovens[i].busy) {
        console.log("Order ID - (" + this.id + ") - sending to oven");
        this.stage = 6; // oven
        await ovens[i].bake(this);
        break;
      }
    }

    if (this.stage == 5) { // if still waiting for oven
      // if we are here it means that currently there is no available oven. so we will check again in 1 sec
      console.log('Order ID - (' + this.id + ') - all ovens are busy');
      var that = this;
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          resolve(that.sendToOven(ovens))
        }, 1000 * 1);
      });
    }

    // console.log('Order ID - (' + this.id + ') - here in the end of sendToOven()');

  }

  async sendToWaiter(waiters) {

    for (var i = 0; i < waiters.length; i++) {

      if (!waiters[i].busy) {
        console.log("Order ID - (" + this.id + ") - sending to waiter");
        this.stage = 8; // waiter (*serving)
        await waiters[i].serve(this);
        break;
      }
    }

    if (this.stage == 7) { // if still waiting for waiter
      // if we are here it means that currently there is no available waiter. so we will check again in 1 sec
      console.log('Order ID - (' + this.id + ') - all waiters are busy');
      var that = this;
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          resolve(that.sendToWaiter(waiters))
        }, 1000 * 1);
      });
    }

    // console.log('Order ID - (' + this.id + ') - here in the end of sendToWaiter()');

  }

  getStageName() {

    let stageName;

    switch (this.stage) {

      case 0:
        stageName = "created";
        break;

      case 1:
        stageName = "waiting dough";
        break;

      case 2:
        stageName = "dough";
        break;

      case 3:
        stageName = "waiting topping";
        break;

      case 4:
        stageName = "topping";
        break;

      case 5:
        stageName = "waiting oven";
        break;

      case 6:
        stageName = "oven";
        break;

      case 7:
        stageName = "waiting waiter";
        break;

      case 8:
        stageName = "waiter";
        break;

      case 9:
        stageName = "completed";
        break;

    }

    return stageName;

  }

  getTime(d = new Date()) {

    var hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

    return hours + ":" + minutes + ":" + seconds;

  }

}

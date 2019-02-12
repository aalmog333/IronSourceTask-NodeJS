var Pipline = require('./pipline');

module.exports = class Waiter extends Pipline {

  constructor() {
    super();
    this.serveTime = 5; // 5 sec
  }

  serve() {
    return this.serveTime;
  }

};

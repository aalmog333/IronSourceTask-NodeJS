var Pipeline = require('./pipeline');

module.exports = class Waiter extends Pipeline {

  constructor() {
    super();
    this.serveTime = 5; // 5 sec
  }

  async serve(order) {
    this.busy = true;
    await this.timeout(this.serveTime);
    this.busy = false;
  }

};

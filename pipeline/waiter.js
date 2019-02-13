var Pipeline = require('./pipeline');

module.exports = class Waiter extends Pipeline {

  constructor() {
    super();
    this.serveTime = 5; // 5 sec
  }

  async serve() {
    this.busy = true;
    return await timeout(this.serveTime);
  }

};

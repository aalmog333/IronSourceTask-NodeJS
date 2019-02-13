var Pipeline = require('./pipeline');

module.exports = class Oven extends Pipeline {

  constructor() {
    super();
    this.bakeTime = 10; // 10 sec
  }

  async bake(order) {
    this.busy = true;
    await this.timeout(this.bakeTime);
    this.busy = false;
  }

};

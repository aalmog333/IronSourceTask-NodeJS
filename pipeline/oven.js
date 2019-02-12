var Pipeline = require('./pipeline');

module.exports = class Oven extends Pipeline {

  constructor() {
    super();
    this.bakeTime = 10; // 10 sec
  }

  async bake() {
    return await timeout(this.bakeTime);
  }

};

var Pipline = require('./pipline');

module.exports = class Oven extends Pipline {

  constructor() {
    super();
    this.bakeTime = 10; // 10 sec
  }

  bake() {
    return this.bakeTime;
  }

};

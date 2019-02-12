var Pipline = require('./pipline');

module.exports = class Oven extends Pipline {

  constructor(id,busy) {
    super(id,busy);
    this.bakeTime = 10; // 10 sec
  }

  bake() {
    return this.bakeTime;
  }

};

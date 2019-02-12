var Pipline = require('./pipline');

try {
  module.exports = class DoughChef extends Pipline {

    constructor(id, busy) {
      super(id, busy);
      this.createDoughTime = 7; // 7 sec // can only be static property with ES6
    }

    async createDough() {
      // add async await with set timeout and maybe put it inside pipline; and only in
      return await setTimeOut(this.createDoughTime * 1000);
    }

  };

} catch (err) {
  console.log('error in dough-chef.js');
  console.log(err);
}

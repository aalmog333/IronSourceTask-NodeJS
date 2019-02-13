var Pipeline = require('./pipeline');

try {
  module.exports = class DoughChef extends Pipeline {

    constructor() {
      super();
      this.createDoughTime = 7; // 7 sec // can only be static property with ES6
    }

    async createDough(order) {
      // add async await with set timeout and maybe put it inside Pipeline;
      this.busy = true;
      await this.timeout(this.createDoughTime);
      this.busy = false;
    }

  };

} catch (err) {
  console.log('error in dough-chef.js');
  console.log(err);
}

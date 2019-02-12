var Pipeline = require('./pipeline');

try {
  module.exports = class DoughChef extends Pipeline {

    constructor() {
      super();
      this.createDoughTime = 7; // 7 sec // can only be static property with ES6
    }

    async createDough() {
      // add async await with set timeout and maybe put it inside Pipeline;
      return await timeout(this.createDoughTime);
    }

  };

} catch (err) {
  console.log('error in dough-chef.js');
  console.log(err);
}

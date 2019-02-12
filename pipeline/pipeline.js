module.exports = class Pipeline {

  constructor() {
    this.busy = false;
  }

  timeout(sec) {
    return new Promise(resolve => setTimeout(resolve, 1000 * sec));
  }

};

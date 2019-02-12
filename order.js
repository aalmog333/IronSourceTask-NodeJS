const fs = require('fs-extra')

module.exports = class Order {

  constructor(id) {
    this.id = id;
    this.stage = 0;
    
  }

  log(stage) {

    var stageName = null;

    switch stage {

      case 0:
        stageName = "waiting";
      break;

      case 1:
        stageName = "dough";
      break;

      case 2:
        stageName = "topping";
      break;

      case 3:
        stageName = "oven";
      break;

      case 4:
        stageName = "serving";
      break;

      case 4:
        stageName = "completed";
      break;

    }

    //TODO: write to log file;

  }

};

Oven.bakeTime = 10;

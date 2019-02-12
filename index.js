// here we write all the main code

// *************** Notes ********************


// ******************************************


var restaurant = require("./restaurant.js");
var fs = require('fs');

try {

  // first step - get Restaurant info from db and create Restaurant object;

  // restaurants.json contains array of all restaurants data (for future needs)
  // each restaurant object contains properties of all the pipline roles. each role contains array of ids
  var restaurantsData = JSON.parse(fs.readFileSync('./DB/restaurants.json', 'utf8'));
  // orders.json contains array of all orders data, for all the restaurants (for future needs)
  var ordersData = JSON.parse(fs.readFileSync('./DB/orders.json', 'utf8'));

  // create new restaurant object
  restaurantData = restaurantsData.find(x => x.id === 1);
  myRestaurant = new restaurant(restaurantData);

  // send new orders to myRestaurant
  myRestaurantOrdersData = ordersData.find(x => x.restaurantId === 1);
  myRestaurant.addNewOrders(myRestaurantOrdersData);

  // get Restaurant employees info from db and create object for each employee;


  // add asyncronic process for each oder with sleep and each stage add the the the order waited by clculating the timestamp

  //in one log file report
  // The preparation time from start to end
  //The preparation time for each order


} catch (err) {
  console.log('error in index.js');
  console.log(err);
}

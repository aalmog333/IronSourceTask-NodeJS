// here we write all the main code

// *************** Notes ********************


// ******************************************


var restaurant = require("./restaurant.js");
var fs = require('fs');

try {

  // first step - get Restaurant info from db and create Restaurant object;

  // restaurants.json contains array of all restaurants data (for future needs)
  // each restaurant object contains properties of all the pipeline roles. each role contains array of ids
  var restaurantsData = JSON.parse(fs.readFileSync('./DB/restaurants.json', 'utf8'));
  // orders.json contains array of all orders data, for all the restaurants (for future needs)
  var ordersData = JSON.parse(fs.readFileSync('./DB/orders.json', 'utf8'));

  // create new restaurant object
  restaurantData = restaurantsData.find(x => x.id === 1);
  myRestaurant = new restaurant(restaurantData);

  // send new orders to myRestaurant
  myRestaurantOrdersData = ordersData.find(x => x.restaurantId === 1);
  myRestaurant.addNewOrders(myRestaurantOrdersData);
  myRestaurant.printFinalReport(); // only when all the order finished their preparation pipeline process

} catch (err) {
  console.log('error in index.js');
  console.log(err);
}

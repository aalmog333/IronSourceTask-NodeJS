// here we write all the main code

// *************** Notes ********************


// ******************************************


var restaurant = require("./restaurant.js");
var fs = require('fs');

try {

  // clear log & report files content
  fs.writeFileSync('./log/log.txt', '');
  fs.writeFileSync('./log/report.txt', '');

  // first step - get Restaurant info from db and create Restaurant object;
  // restaurants.json contains array of all restaurants data (for future needs)
  // each restaurant object contains properties of all the pipeline roles. each role contains array of ids
  var restaurantsData = JSON.parse(fs.readFileSync('./DB/restaurants.json', 'utf8'));

  // create new restaurant object
  var restaurantData = restaurantsData.find(x => x.id === 1);
  var myRestaurant = new restaurant(restaurantData);

  // second step - get orders
  // orders.json contains array of all orders data, for all the restaurants (for future needs)
  var ordersData = JSON.parse(fs.readFileSync('./DB/orders.json', 'utf8'));
  var myRestaurantOrdersData = ordersData.filter(x => x.restaurantId === 1);

  // send new orders to myRestaurant
  // start pipeline asynchronous processes
  new Promise( (resolve, reject) => {
    resolve(myRestaurant.addNewOrders(myRestaurantOrdersData));
  }).then( () => {
    console.log('in here1');
    myRestaurant.printFinalReport(); // only when all the order finished their preparation pipeline process
  }).catch( (err) => {
    console.log('error in index.js -> addNewOrders | printFinalReport');
    console.log(err);
  });

  // myRestaurant.printFinalReport(); // only when all the order finished their preparation pipeline process

} catch (err) {
  console.log('error in index.js');
  console.log(err);
}

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-HXfZ8iFz9Ke8hgIBEab-DBrR5cbsa54",
    authDomain: "the-coffee-shop-f75fd.firebaseapp.com",
    databaseURL: "https://the-coffee-shop-f75fd.firebaseio.com",
    projectId: "the-coffee-shop-f75fd",
    storageBucket: "",
    messagingSenderId: "377468538359"
  };
  firebase.initializeApp(config);


var database = firebase.database();

// create reservationData object which will be populated with user input
var reservationData = {};

// set the day when an option is clicked on
$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
});

// when submitted, the name data should be set
// and all data should be sent to your database
$('.reservation-form').on('submit', function(event) {
  event.preventDefault();

  reservationData.name = $('.reservation-name').val();


  // create a section for reservations data in your db
  var reservationsReference = database.ref('reservations');

  reservationsReference.push(reservationData);
});


// retrieve reservations data when page loads and when reservations are added
function getReservations() {

  // use reference to database to listen for changes in reservations data
  database.ref('reservations').on('value', function(results) {

    // Get all reservations stored in the results we received back from Firebase
    var allReservations = results.val();

    // remove all list reservations from DOM before appending list reservations
    $('.reservations').empty();

    // iterate (loop) through all reservations coming from database call
    for (var reservation in allReservations) {

      // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };


      // Get the HTML from our Handlebars reservation template
      var source = $("#reservation-template").html();

      // Compile our Handlebars template
      var template = Handlebars.compile(source);

      // Pass the data for this reservation (context) into the template
      var reservationListItem = template(context);

      // Append newly created reservation to reservations list.
      $('.reservations').append(reservationListItem);

    }

  });

}

// When page loads, get reservations
getReservations();





















function initMap() {
	
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 20,
    
	  zoomControl: false,
	  mapTypeControl: true,
	  scaleControl: true,
	  streetViewControl: true,
	  rotateControl: true,
	  fullscreenControl: true,
	  
	  styles: styles
    
  });

	var styles = [
		
		{
			stylers: [
				
				{hue: '#00ffe6'},
				{saturation: -20}
				
			]
			
		}
		
	];
	
	var marker = new google.maps.Marker ({
		
		position: {lat: 40.8054491, lng: -73.9654415},
		map: map
		
	});
	

}

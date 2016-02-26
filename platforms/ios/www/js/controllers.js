angular.module('starter.controllers', ['ionic'])
.constant('FORECASTIO_KEY', '7cc9527d79b9d450c5e1fd4444826eef')
.controller('HomeCtrl', function($scope,$state,Weather,DataStore) {
     //Detect Platform
     $scope.platform = ionic.Platform.platform();
	//read default settings into scope
	console.log('inside home');
	$scope.city  = DataStore.city;
	var latitude  =  DataStore.latitude;
	var longitude = DataStore.longitude;
		
	//call getCurrentWeather method in factory ‘Weather’
	Weather.getCurrentWeather(latitude,longitude).then(function(resp) {
      $scope.current = resp.data;
      console.log('GOT CURRENT', $scope.current);

        var geocoder = new google.maps.Geocoder;
        var latlng = {lat: latitude, lng: longitude};

        geocoder.geocode({'location': latlng}, function(results, status) {
            console.log("vfg",latlng);
        });
      //debugger;
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });

    //$scope.getCity = function(){
    //    var geocoder = new google.maps.Geocoder;
    //    var latlng = {lat: latitude, lng: longitude};
    //
    //    geocoder.geocode({'location': latlng}, function(results, status) {
    //        console.log("vfg",latlng);
    //    });
    //}();

})
.controller('LocationsCtrl', function($scope,$state, Cities,DataStore) {
  $scope.cities = Cities.all();

  $scope.changeCity = function(cityId) {
  	//get lat and longitude for seleted location
	var lat  = $scope.cities[cityId].lat; //latitude
	var lgn  = $scope.cities[cityId].lgn; //longitude
	var city = $scope.cities[cityId].name; //city name

	DataStore.setCity(city);
	DataStore.setLatitude(lat);
	DataStore.setLongitude(lgn);
	
  	$state.go('tab.home');
  }
})
.controller('SettingsCtrl', function($scope) {
	//manages app settings
});

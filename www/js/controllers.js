angular.module('starter.controllers', ['ionic','ngResource'])
.controller('HomeCtrl', function($scope, $state,$http, $q) {
     var FORECASTIO_KEY = '7cc9527d79b9d450c5e1fd4444826eef';

     //Detect Platform
     $scope.platform = ionic.Platform.platform();

     //Variables
     var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

    //Gogle map Data Fetch
    function getLocation() {
        var deferred = $q.defer();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
        function showPosition(position) {
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
            deferred.resolve();
        }
        return deferred.promise;
    }
    function getCity(){
        var geocoder = new google.maps.Geocoder;
        var latlng = {
            lat: parseFloat($scope.latitude),
            lng: parseFloat($scope.longitude)
        };

        geocoder.geocode({'location': latlng}, function(results, status) {
            console.log("Location Details Object ",results);
            $scope.city= results[7].formatted_address;
        });
    };
    function getCurrentWeather(lat, lng) {
        return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
    };
    getLocation().then(getCity);
    getLocation().then(function(){
        getCurrentWeather($scope.latitude,$scope.longitude).then(function(resp) {
            $scope.current = resp.data;
            console.log('GOT CURRENT Frecase io data :', $scope.current);
            //debugger;
        }, function(error) {
            //alert('latle to get current conditions');
            console.error(error);
        })
    });
})

.controller('LocationsCtrl', function($scope,$state,$http,$q,$resource) {
  var FORECASTIO_KEY = '7cc9527d79b9d450c5e1fd4444826eef';
  $scope.cities = [
      { id: 0, name: 'Miami', lat:25.7877 , lgn: 80.2241 },
      { id: 1, name: 'New York City' ,lat: 40.7127 , lgn: 74.0059 },
      { id: 2, name: 'London' ,lat:51.5072 , lgn: 1.1275 },
      { id: 3, name: 'Los Angeles' ,lat: 34.0500 , lgn: 118.2500 },
      { id: 4, name: 'Dallas' ,lat: 32.7758 , lgn:96.7967  },
      { id: 5, name: 'Frankfurt' ,lat:50.1117 , lgn: 8.6858 },
      { id: 6, name: 'New Delhi' ,lat:28.6100 , lgn: 77.2300 }
  ];

  $scope.changeCity = function(cityId) {
  	//get lat and longitude for seleted location
	var lat  = $scope.cities[cityId].lat; //latitude
	var lgn  = $scope.cities[cityId].lgn; //longitude
	var city = $scope.cities[cityId].name; //city name

      $scope.setLatitude = function (value) {
          $scope.latitude = value;
      };

      $scope.setLongitude = function (value) {
          $scope.longitude = value;
      };

      $scope.setLatitude(lat);
      $scope.setLongitude(lgn);

      console.log($scope.longitude + "and" + $scope.latitude);

      var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

      //Gogle map Data Fetch
      function getCity(){
          var geocoder = new google.maps.Geocoder;
          var latlng = {
              lat: parseFloat($scope.latitude),
              lng: parseFloat($scope.longitude)
          };

          geocoder.geocode({'location': latlng}, function(results, status) {
              console.log("Location Details Object ",results);
              $scope.city= results[7].formatted_address;
          });
      };
      function getCurrentWeather(lat, lng) {
          return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
      };
      getCity();
      getCurrentWeather($scope.latitude,$scope.longitude).then(function(resp) {
          $scope.current = resp.data;
          console.log('GOT CURRENT Frecase io data :', $scope.current);
          //debugger;
      }, function(error) {
          //alert('latle to get current conditions');
          console.error(error);
      })

	
  	$state.go('tab.home');
  }
})
.controller('SettingsCtrl', function($scope) {
	//manages app settings
});

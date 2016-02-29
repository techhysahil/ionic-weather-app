angular.module('starter.controllers', ['ionic','ngResource'])
.controller('HomeCtrl', function($scope, $state, $http, $q, $stateParams, HomeServices) {
     var FORECASTIO_KEY = '7cc9527d79b9d450c5e1fd4444826eef';

        console.log("stateparam:",$stateParams.context);

     //Detect Platform
     $scope.platform = ionic.Platform.platform();

     var data = HomeServices.CurrentLoactionData().then(function(data){
         console.log("get object",data);
         $scope.city= data.city;
         $scope.country= data.country;
         $scope.current= data.current;
     });
     console.log("get current scope",$scope);
})

.controller('LocationsCtrl', function($scope,$state,$http,$q,$resource, HomeServices) {
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

      console.log("latlng value:", lat + " " + lgn);

      var data = HomeServices.dataByCoOrd(lat, lgn).then(function(data){
          $scope.city= data.city;
          $scope.country= data.country;
          $scope.current= data.current;
          console.log("get chnaged object data",data);
      });

      var context = {
          a: 1,
          b: 2
      }
      $state.go('tab.home',{"context" : "hello"});
  }
})
.controller('SettingsCtrl', function($scope) {
	//manages app settings
});

//'use strict';
//var FORECASTIO_KEY = '7cc9527d79b9d450c5e1fd4444826eef';
//
//angular.module('starter', ['$http'])
//    .service('getweather', function(){
//        var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';
//
//        this.getCurrentWeather = function(lat, lng) {
//            return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
//        }
//        this.getCurrentWeather($scope.latitude,$scope.longitude).then(function(resp) {
//            return resp;
//        }, function(error) {
//            return(error);
//        });
//});

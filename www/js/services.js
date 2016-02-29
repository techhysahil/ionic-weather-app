angular.module('starter.services', ['ngResource'])
    .factory('sharedServices', function($resource) {

        return {

        }
    })
    .factory('HomeServices', function($resource,$q,$http) {
        var FORECASTIO_KEY = '7cc9527d79b9d450c5e1fd4444826eef';
        var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';
        var scope={

        };

        //Gogle map Data Fetch
        function getLocation() {
            var deferred = $q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
            function showPosition(position) {
                scope.latitude = position.coords.latitude;
                scope.longitude = position.coords.longitude;
                deferred.resolve();
            }
            return deferred.promise;
        }
        function getCity(){
            var geocoder = new google.maps.Geocoder;
            var latlng = {
                lat: parseFloat(scope.latitude),
                lng: parseFloat(scope.longitude)
            };

            geocoder.geocode({'location': latlng}, function(results, status) {
                console.log("Location Details Object ",results);
                scope.city= results[7].formatted_address;
            });
        };
        function getCurrentWeather(lat, lng) {
            return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
        };

        getLocation().then(function(){
            getCurrentWeather(scope.latitude,scope.longitude).then(function(resp) {
                scope.current = resp.data;
                console.log('GOT CURRENT Frecase io data :', scope.current);
                //debugger;
            }, function(error) {
                //alert('latle to get current conditions');
                console.error(error);
            })
        });

        return {

        }
    })

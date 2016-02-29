angular.module('starter.services', ['ngResource'])
    .factory('HomeServices', function($resource,$q,$http) {
        var FORECASTIO_KEY = '7cc9527d79b9d450c5e1fd4444826eef';
        var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

        var data={

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
                data.latitude = position.coords.latitude;
                data.longitude = position.coords.longitude;
                deferred.resolve();
            }
            return deferred.promise;
        }
        function getCity(lat, long){
            var geocoder = new google.maps.Geocoder;
            var latlng = {
                lat: parseFloat(lat),
                lng: parseFloat(long)
            };

            geocoder.geocode({'location': latlng}, function(results, status) {
                results[0].address_components.forEach(function(key){
                    if (key.types[0] == "country"){
                        data.country = key.long_name;
                    }
                    if (key.types[0] == "locality"){
                        data.city = key.long_name;
                    }
                });
                console.log("curren country name : ",data.country);
            });
        };
        function getCurrentWeather(lat, long) {
            return $http.jsonp(url + lat + ',' + long + '?callback=JSON_CALLBACK');
        };

        return {
            CurrentLoactionData : function(){
                var deferred=$q.defer();
                getLocation().then(function(){
                    getCity(data.latitude,data.longitude);
                });
                return getLocation().then(function(){
                    return getCurrentWeather(data.latitude,data.longitude).then(function(resp) {
                        data.current = resp.data;
                        console.log('GOT CURRENT Frecase io data :', data.current);
                        deferred.resolve();
                        return data
                    }, function(error) {
                        console.error(error);
                    })
                })
                return deferred.promise;
            },
            dataByCoOrd : function(lat, long){
                var deferred=$q.defer();
                getCity(lat,long);
                return getCurrentWeather(lat,long).then(function(resp) {
                    data.current = resp.data;
                    console.log('GOT CURRENT Frecase io data :', data.current);
                    deferred.resolve();
                    return data
                }, function(error) {
                    console.error(error);
                })
                return deferred.promise;
            }
        }
    })

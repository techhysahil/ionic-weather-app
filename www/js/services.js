'use strict';

app.factory('Notes', ['$resource', function($resource) {
    return $resource('/notes/:id', null,
        {
            'update': { method:'PUT' }
        });
}]);

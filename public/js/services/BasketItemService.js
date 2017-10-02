angular.module('BasketItemService', []).factory('BasketItems', ['$http', '$rootScope',
    function($http, $rootScope) {
        var basketService = {};

        basketService.itemCount = 0;

        basketService.broadcastItemCount = function() {
            $rootScope.$broadcast('handleItemCount');
        };


        basketService.getAll = function(callback) {
            caller = this;
            $http({
                method: 'get',
                url: '/api/basketItems/'
            }).success(function(data) {
                caller.itemCount = data.length;
                caller.broadcastItemCount();
                callback(data);
            }).error(function() {
                alert("error");
            });
        };

        basketService.addOne = function(id, callback) {

            caller = this;
            $http({
                method: 'get',
                url: '/api/basketItems/Add/' + id
            }).success(function(data) {
                //setItemCount(10);
                caller.itemCount = data.ItemCount;
                caller.broadcastItemCount();
                callback(null, data);
            }).error(function(err) {
                callback(err);
            });
        };

        return basketService;
    }
]);
angular.module('BasketCtrl', []).controller('BasketController', function($scope, BasketItems) {
    BasketItems.getAll(function(data) {
        $scope.products = data;
    });

    $scope.basketItemCount = BasketItems.itemCount;

    $scope.$on('handleItemCount', function() {
        $scope.basketItemCount = BasketItems.itemCount;
    });

    //$scope.$on('basketUpdate', function(event, args) {alert('caught');});
});
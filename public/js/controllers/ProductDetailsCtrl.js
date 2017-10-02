angular.module('ProductDetailsCtrl', []).controller('ProductDetailsController', function($scope, $routeParams, Products, BasketItems) {
    var id = $routeParams.id;
    
    Products.getOne(id, function(data) {
        $scope.product = data;
    });

    $scope.addToBasket = function(product) {
        BasketItems.addOne(product._id, function(err, data) {
            $scope.$emit('basketUpdate');
            if (err) {
                alert(err);
                return;
            }
        });
    };
});
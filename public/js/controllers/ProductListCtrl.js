angular.module('ProductListCtrl', []).controller('ProductListController', function($scope, Products) {
    Products.getAll(function(data) {
        $scope.products = data;
    });
});
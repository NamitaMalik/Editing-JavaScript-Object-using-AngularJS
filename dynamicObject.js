/**
 * Created by namita on 25/4/15.
 */

var myApp = angular.module('myApp',[]);
myApp.controller('ObjectController',['$scope',function($scope){
$scope.student = {name:"Namita"};

    $scope.updateKey = function(key){
        console.log("abc");
        $scope.student[key] = $scope.student[name];
        delete $scope.student[name];
    }

}]);
/**
 * Created by namita on 25/4/15.
 */

var myApp = angular.module('myApp', []);
myApp.controller('ObjectController', [function () {
    var oc = this;
    oc.student = {name: "Namita"};

    oc.updateKey = function (newKey, oldKey) {
        oc.student[newKey] = oc.student[oldKey];
        delete oc.student[oldKey];
    };

    oc.updateValue = function (newValue, key) {
        oc.student[key] = newValue;
    };

}]);
# Editing JavaScript Object using AngularJS

At times we encounter a situation when we need to edit a **JavaScript** object(JSON). By editing, I mean modifying the keys and values of the object, or dynamically adding a new key and value to the object.

Well, to make such a situation more clear, let us see a scenario:

Suppose there are two input fields and a button:

1. In the first input field, we need to add the key of the object.
2. Second input field takes the value that would be added to the corresponding key(i.e. the first input field).
3. On clicking the 'Add' button, pair of input fields would get added, which can then take the key-value pair.

Here is the **HTML** and **JavaScript** code for it:

**editObject.html**:
```HTML
<!DOCTYPE html>
<html ng-app="myApp">
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body ng-controller="ObjectController as objectController">
<h2>Key-Value:</h2>
<div ng-repeat="oldKey in objectController.notSorted(objectController.student)">
    <label>Key {{$index+1}}</label>
    <input type="text" ng-model="newKey" ng-init="newKey=oldKey" ng-blur="objectController.updateKey(newKey, oldKey)">
    <label>Value {{$index+1}}</label>
    <input type="text" ng-model="newValue" ng-init="newValue=objectController.student[oldKey]"
           ng-blur="objectController.updateValue(newValue,oldKey)">
</div>
</br>
<em>Click on 'Add' to add another key-value pair.</em>
</br>
</br>
<input type="button" value="Add" ng-click="objectController.addNewKey()"/>
<h2>Object:</h2>
{{objectController.student}}
<script src="angular.min.js"></script>
<script src="ObjectController.js"></script>
</body>
</html>
```

**ObjectController.js**:
```JavaScript
/**
 * Created by Namita malik on 25/4/15.
 */
(function (ng) {
    var myApp = ng.module('myApp', []);
    myApp.controller('ObjectController', [function () {
        var objectController = this;
        objectController.student = {name: "Namita", age: "16", class: "XII", school: "BBPS"};
        objectController.updateKey = function (newKey, oldKey) {
            if (newKey == "") {
                delete objectController.student[oldKey];
            } else if (newKey !== oldKey) {
                objectController.student[newKey] = objectController.student[oldKey];
                delete objectController.student[oldKey];
            }
        };
        objectController.updateValue = function (newValue, key) {
            objectController.student[key] = newValue;
        };
        objectController.notSorted = function (object) {
            return object ? Object.keys(object) : [];
        };
        objectController.addNewKey = function () {
            objectController.student[""] = "";
        };
    }]);
})(angular);
```
Before starting with the actual logic in the above code, please note that I have written the above code in **controller as** syntax. Here are a few points for that:

1. I have created an alias `objectController` for my controller `ObjectController` here `<body ng-controller="ObjectController as objectController">`.
2. In the `Controller`, I have not passed **$scope** object to the function, instead I have created a variable named `objectController` and assigned `this` to it. Instead of hanging around with **$scope**, we have added model data and the behaviour to the **controller** instance.
3. Instead of defining function with **$scope**, we define it on **this** (`objectController`).
4. Using **controller as** syntax is a personal choice, but I am finding it more readable and consistent and also I am getting rid of the `$scope`.

Let's now come to the actual **scope** of this post, i.e. editing a **JavaScript** **Object**.

We have a student **object** whose **keys** and **values** are being displayed. We are modifying this **student** object.

If you look at the above demo, we can do two things there:

1. Modify the existing keys/values.
2. Add new key/value.

Here is explanation of both the cases:

####1 : Modify the existing keys/values.
1. We have an `updateKey` function, which is called as soon as user modifies the key. `updateKey()` is called on the **blur** **event** of the **key** field.
2. `updateKey()` takes two parameters i.e. `newKey` and `oldKey`, names of which are self explanatory.
3. Now, let's move on to `HTML` for a while and see what is happening there. Here is the line which we need to investigate these two lines specifically:
 `<div ng-repeat="oldKey in objectController.notSorted(objectController.student)">`
 and
`<input type="text" ng-model="newKey" ng-init="newKey=oldKey" ng-blur="objectController.updateKey(newKey, oldKey)">`.
4. We are iterating the object using the **ng-repeat** directive and hence we are using the `oldKey`, as an **object** can be iterated using the **key**.
5. There is an **ng-model** on the **key** field. This model has been bind to to the `newKey`. We are initializing the value of `newKey` with the `oldKey`.
6. We know that **blur** event is fired when an element looses focus, so when a user ends updating the **key** and moves to the other field using **keyboard** or **clicks** anywhere, `updateKey` function would be called which would take both `newKey` and `oldKey` as its arguments.
7. Now, coming back to our `updateKey` function, we check that if `newKey` is not equal to `oldKey`, I pass the value in the `oldKey` to the `newKey` and then delete the `oldKey` using the **delete** operator.
8. In case user updates an existing key with an empty **string**, in that case, key would be deleted as empty key would not make sense.
9. Now, let's check the `updateValue` function. This function is called when the **blur** event is fired on the the **value** field.
10. On the `HTML` have a look at this code: `<input type="text" ng-model="newValue" ng-init="newValue=objectController.student[oldKey]" ng-blur="objectController.updateValue(newValue,oldKey)">`. The input field for value has model `newValue`. We initialize `newValue` with the value in the `oldKey`. Once user modifies the value and focus is lost, `updateValue()` function is called which takes `newValue` and `oldKey` along with it as its arguments.
11. Let's see the definition part of `updateValue` function. In this function, we are simply passing the updated value(`newValue`) to the `oldKey`.

So this was all about updating key and value. Now let's take up the second case:

####2. Add new key/value.

1. On clicking the "Add" button, `addNewKey` function is called.
2. In the `addKey` function, we are simply adding an empty **string** as the key and assigning empty **string** as a value to it. Now, as soon as user enters a **key** in this newly added **key** field and the field looses the focus, our `updateKey()` function would be called, which would then do all the magic explained above.

Well, this was all about editing objects, you can checkout the full working source code from [here](https://github.com/NamitaMalik/Editing-JavaScript-Object-using-AngularJS).

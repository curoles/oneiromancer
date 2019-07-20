if ("serviceWorker" in navigator) {
  console.log("Service worker is enabled in Navigator");
}

var app = angular.module('OneiroApp', []);

app.controller('OneiroCtrl', function($scope, $http) {
  $http.get("/api/atoms")
  .then(function(response) {
    $scope.oneiroAtoms = response.data;
  });
});

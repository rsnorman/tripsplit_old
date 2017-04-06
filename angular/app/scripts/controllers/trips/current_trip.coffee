angular.module("groupExpenserClientApp")

.controller "CurrentTripCtrl", ['$scope', ($scope) ->

  $scope.showTasksButton()
  $scope.addRightButton "/trips/#{$scope.currentTrip.id}/edit", "edit" if $scope.isOrganizer()

  $scope.setMainHeader $scope.currentTrip.name
  $scope.setSecondaryHeader $scope.currentTrip.total_cost, true
]
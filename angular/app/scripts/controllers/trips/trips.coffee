angular.module("groupExpenserClientApp")
.controller "TripsCtrl", ['$scope', 'trips', '$currentTrip', ($scope, trips, $currentTrip) ->
  $scope.trips = trips

  $scope.showTasksButton()
  $scope.addRightButton "/trips/new", "plus"

  $scope.setMainHeader $scope.currentUser.name
  $scope.setSecondaryHeader 'Trips'

  $currentTrip.set null
]
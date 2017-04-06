angular.module("groupExpenserClientApp")

.controller "TripCtrl", ['$scope', '$routeParams', 'Trip', '$currentTrip', '$location', ($scope, $routeParams, Trip, $currentTrip, $location) ->

  $scope.showTasksButton()

  $scope.setMainHeader "Loading"
  $scope.setSecondaryHeader "Trip"

  Trip.get
    id: $routeParams.tripId || $routeParams.id,
    (trip) ->
      $currentTrip.set(trip)
      $location.path "/current_trip"
]


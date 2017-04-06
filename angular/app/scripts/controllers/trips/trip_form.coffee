angular.module("groupExpenserClientApp").controller "TripFormCtrl", ['$scope', '$location', '$currentTrip', 'Trip', ($scope, $location, $currentTrip, Trip) ->
  $scope.trip = new Trip $scope.currentTrip

  $scope.showBackButton()

  if $scope.trip.id
    $scope.action = 'Update'
  else
    $scope.action = 'Create'

  $scope.setMainHeader $scope.action
  $scope.setSecondaryHeader 'Trip'

  $scope.trip.needs_facebook_event = $scope.trip.facebook_event_id?

  $scope.create = () ->
    if $scope.action == 'Create'
      $scope.trip.$save (trip) ->
        $currentTrip.set(trip)
        $location.path("/trips/" + trip.id)
    else
      $scope.trip.$update (trip) ->
        $currentTrip.set(trip)
        $location.path("/trips/#{$scope.trip.id}")

  $scope.delete = () ->
    if confirm "Are you sure you want to delete this trip?"
      $scope.trip.$destroy ->
        $currentTrip.set null
      $location.path("/trips")
]
angular.module("groupExpenserClientApp")

.controller "TripJoinCtrl", ['$scope', '$location', '$routeParams', '$cookieStore', ($scope, $location, $routeParams, $cookieStore) ->
  
	$scope.setMainHeader 'Joining'
	$scope.setSecondaryHeader 'Trip'

	$cookieStore.put('trip', {id: $routeParams.id * 1})

	if $scope.currentUser
		$location.path "/trips/#{$routeParams.id}"
	else
		$location.path "/"
]
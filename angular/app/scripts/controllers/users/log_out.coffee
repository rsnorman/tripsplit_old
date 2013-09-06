angular.module("groupExpenserClientApp")
.controller "LogOutCtrl", ['$rootScope', '$currentUser', '$currentTrip', '$location', ($rootScope, $currentUser, $currentTrip, $location) ->
	$rootScope.setMainHeader "TripSplit"
	$rootScope.setSecondaryHeader "Logging Out"

	$rootScope.hideAllButtons()

	$currentUser.set null
	$currentTrip.set null
	$rootScope.currentUser = null
	$rootScope.currentTrip = null
	$location.path '/'

]
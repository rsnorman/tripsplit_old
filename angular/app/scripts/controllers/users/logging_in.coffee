angular.module("groupExpenserClientApp").controller "LoggingInCtrl", ['$scope', '$routeParams', 'authService', 'User', ($scope, $routeParams, authService, User) ->

	$scope.setMainHeader "TripSplit"
	$scope.setSecondaryHeader 'Logging In...'

	$scope.user = User.get
    id: $routeParams.id,
    (user) ->
      authService.loginConfirmed user
]
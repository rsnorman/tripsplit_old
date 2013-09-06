angular.module("groupExpenserClientApp").controller "LogInCtrl", ['$scope', 'User', 'authService', '$location', ($scope, User, authService, $location) ->

	if $scope.currentUser
		$location.path('/trips')

	$scope.user =  new User

	$scope.setMainHeader null
	$scope.setSecondaryHeader null

	$scope.hideAllButtons()

	$scope.submit = () ->
		$scope.user.$login().success (user) ->
		authService.loginConfirmed user
]
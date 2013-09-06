angular.module("groupExpenserClientApp").controller "ProfileCtrl", ['$scope', '$location', 'user', '$currentUser', ($scope, $location, user, $currentUser) ->
	$scope.user = user
	$currentUser.set user
	$scope.currentUser = user

	$scope.userUpdated = false

	$scope.setMainHeader "Edit"
	$scope.setSecondaryHeader $scope.user.name

	$scope.showTasksButton()

	$scope.update = () ->
		$scope.userUpdated = false
		$scope.user.$update (user) ->
			$currentUser.set user
			$scope.currentUser = user
			$scope.userUpdated = true
]
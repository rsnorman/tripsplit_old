angular.module("groupExpenserClientApp").factory "$navigation", ['$rootScope', ($rootScope) ->
	$rootScope.backButtonVisible = true
	$rootScope.tasksButtonVisible = false
	$rootScope.rightButton = null

	$rootScope.showBackButton = () ->
		$rootScope.backButtonVisible = true
		$rootScope.tasksButtonVisible = false


	$rootScope.showTasksButton = () ->
		$rootScope.backButtonVisible = false
		$rootScope.tasksButtonVisible = true

	$rootScope.hideAllButtons = () ->
		$rootScope.backButtonVisible = false
		$rootScope.tasksButtonVisible = false
		$rootScope.hideNavigation = true


	$rootScope.addRightButton = (link, type) ->
		$rootScope.rightButton = {
			link: link
			type: type
		}

	$rootScope.$on '$routeChangeStart', () ->
		$rootScope.backButtonVisible = false
		$rootScope.tasksButtonVisible = false
		$rootScope.rightButton = null
		$rootScope.hideNavigation = false
]



angular.module("groupExpenserClientApp")
.directive 'normanLoader', ['$rootScope', '$timeout', ($rootScope, $timeout) ->
	restrict: 'E'
	replace: true,
	template: "<div class='loader'><div class='loader-animation'></div></div>"
	link: (scope, element, attrs) ->
		promise = null
		$rootScope.$on '$routeChangeStart', () ->
			promise = $timeout( (-> element.show().addClass('show-loader')), 200)

		$rootScope.$on '$routeChangeSuccess', () ->
			$timeout.cancel promise
			element.removeClass('show-loader')
			$timeout (->
				element.hide()), 1000
]

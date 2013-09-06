angular.module("groupExpenserClientApp")
.directive 'normScrollShadow', ['$window', ($window) ->
	restrict: 'A'
	link: (scope, element) ->
		win = angular.element($window)
		win.scroll () ->
			if win.scrollTop() == 0
				element.removeClass 'bottom-shadow'
			else
				element.addClass 'bottom-shadow'

]
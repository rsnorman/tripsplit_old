angular.module("groupExpenserClientApp")
.directive 'normParallax', ['$window', ($window) ->
	restrict: 'A'
	link: (scope, element) ->
		win = angular.element($window)
		win.scroll () ->
			element.css
				transform: "translate(0, #{(win.scrollTop() / -2)}px)"

		document.addEventListener("touchmove", (() ->
			win.scroll () ->
				element.css
					transform: "translate(0, #{(win.scrollTop() / -2)}px)"
		), true);


]
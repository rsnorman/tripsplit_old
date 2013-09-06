angular.module("groupExpenserClientApp")
.directive 'normTabs', ['$window', ($window) ->
	restrict: 'A'
	link: (scope, element) ->
		tabEls = element.find('.tab')
		tabEls.click ->
			tabEls.removeClass('active')
			angular.element(this).addClass('active')

]
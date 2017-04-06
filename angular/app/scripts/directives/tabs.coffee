angular.module("groupExpenserClientApp")
	.directive 'normTab', ['$location', '$rootScope', '$navigationStack', 'NormStore', ($location, $rootScope, $navigationStack, NormStore) ->
		restrict: 'E'
		template: '<a href="javascript:;" class="tab" ng-transclude></a>'
		replace: true
		transclude: true
		scope:
			home: '@'
		link: ($scope, $element) ->
			tabSelectorEl = $element.parent().find('.tab-selector')
			selectTab = ->
				angular.element('.tab').removeClass 'active'
				$element.addClass 'active'
				$navigationStack.clear()
				$navigationStack.add $scope.home
				NormStore.put 'lastTab', $scope.home
				tabSelectorEl.css
					left: $element.position().left + ($element.width() / 2) - (tabSelectorEl.width() / 2)

			$element.click ->
				$scope.$apply ->
					$location.path $scope.home

			$rootScope.$on '$routeChangeStart', ->
				selectTab() if $location.path() == $scope.home

				unless angular.element('.tab').hasClass('active')
					selectTab() if $scope.home == NormStore.get('lastTab')
	]
angular.module("groupExpenserClientApp")

.directive 'normBackButton', ['$parse', '$navigationStack', ($parse, $navigationStack) ->
  restrict: 'E'
  templateUrl: "/views/shared/back-button.html"
  link: (scope, element, attrs) ->
  	scope.navigationStack = $navigationStack
]
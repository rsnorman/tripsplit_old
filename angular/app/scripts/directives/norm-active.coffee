angular.module("groupExpenserClientApp")
.directive 'normActiv', ['$parse', ($parse) ->
  restrict: 'A'
  link: (scope, element, attrs) ->
  	scope.$watch () ->
  		element.hasClass 'active'
  	, () ->
  		scope.activeFn() if element.hasClass 'active'
]
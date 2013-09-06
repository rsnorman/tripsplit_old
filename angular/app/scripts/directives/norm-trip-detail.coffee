angular.module("groupExpenserClientApp").directive 'normTripDetail', ['$http', '$templateCache', '$compile', ($http, $templateCache, $compile) ->
  restrict: 'E'
  scope:
  	templateUrl: '@normTemplateUrl'
  link: (scope, element, attrs) ->
  	scope.$watch 'templateUrl', () ->
  		$http.get scope.templateUrl,
  			cache: $templateCache
  		.success (template) ->
  			template = $compile(template)(scope.$parent)
  			element.html template
]
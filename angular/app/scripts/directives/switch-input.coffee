angular.module("groupExpenserClientApp")

.directive 'normInputSwitch', [->
  restrict: 'E'
  template: "<label class='norm-input-switch'><span class='ios-switch-label'>{{label}}</span><input type='checkbox' class='ios-switch' /><div class='switch'></div></label>"
  replace: true
  scope:
  	label: '@'
  	ngModel: '='
  require: '^ngModel'
  link: (scope, element, attrs, ngModelCtrl) ->
  	chbox = element.find '.ios-switch'

  	scope.$watch 'ngModel', (value) ->
  		chbox.attr('checked', value)

  	chbox.change ->
  		scope.$apply ->
  			scope.ngModel = chbox.is(':checked')


]
angular.module("groupExpenserClientApp")

.directive 'normDatepicker', [->
  restrict: 'A'
  require: 'ngModel'
  link: (scope, element, attrs, ngModelCtrl) ->

    scope.$watch (->
      ngModelCtrl.$viewValue)
      ,(value) ->
        if value? || typeof value != 'undefined'
          jsCompliantValue = value.split('-')
          jsCompliantValue[1] = (jsCompliantValue[1] * 1 - 1).toString();
          jsCompliantValue = jsCompliantValue.join('-');
          picker.set('select', jsCompliantValue, {format: 'yyyy-m-dd'}) if value isnt picker.get 'select', 'yyyy-mm-dd'


    element.pickadate
      format: 'yyyy-mm-dd'
      container: 'body'
      onSet: (ui) ->
        ngModelCtrl.$setViewValue picker.get('select', 'yyyy-mm-dd') if picker.get('select', 'yyyy-mm-dd') isnt ngModelCtrl.$viewValue
    picker = element.pickadate('picker')
]
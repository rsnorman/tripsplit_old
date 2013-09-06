angular.module("groupExpenserClientApp")

.directive 'normRow', [->
  restrict: 'E'
  transclude: true,
  templateUrl: "/views/layout/row.html"
  scope:
  	title: '@title'
  	href: '@href'
  	icon: '@icon'
  	src: '@src'
]
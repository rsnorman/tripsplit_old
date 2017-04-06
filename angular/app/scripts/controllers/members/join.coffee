angular.module("groupExpenserClientApp").controller "JoinCtrl", ['$scope', '$cookieStore', '$routeParams', '$location', ($scope, $cookieStore, $routeParams, $location) ->
  $cookieStore.put('UserId', $routeParams.userId)
  $location.path("/")
]

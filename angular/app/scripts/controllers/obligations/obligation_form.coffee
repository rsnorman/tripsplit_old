angular.module("groupExpenserClientApp")
.controller "ObligationFormCtrl", ['$scope', '$location', 'expense', 'obligation', '$currentTrip', ($scope, $location, expense, obligation, $currentTrip) ->

  $scope.expense = expense
  $scope.obligation = obligation

  $scope.setMainHeader "#{expense.name} Obligation"
  $scope.setSecondaryHeader obligation.amount, true

  $scope.showBackButton()

  $scope.update = () ->
    $scope.obligation.$update () ->
      $location.path("/expenses/#{$scope.expense.id}")
      $currentTrip.refresh()

  $scope.delete = () ->
    if confirm "Are you sure you want to delete this obligation?"
      $scope.obligation.amount = 0
      $scope.obligation.$update () ->
        $location.path("/expenses/#{$scope.expense.id}")
        $currentTrip.refresh()
]
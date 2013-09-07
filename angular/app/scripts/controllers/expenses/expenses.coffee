angular.module("groupExpenserClientApp")
.controller "ExpensesCtrl", ['$scope', 'expenses', ($scope, expenses) ->
  $scope.expenses = expenses

  $scope.showTasksButton()
  $scope.addRightButton("/expenses/new", "plus")

  $scope.setMainHeader $scope.currentTrip.name
  $scope.setSecondaryHeader "Expenses"
]
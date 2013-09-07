angular.module("groupExpenserClientApp")
.controller "ExpenseCtrl", ['$scope', 'expense', ($scope, expense) ->
  $scope.expense = expense

  $scope.showBackButton()
  $scope.addRightButton("/expenses/#{$scope.expense.id}/edit", "edit") if $scope.isMine($scope.expense, 'purchaser_id')

  $scope.setMainHeader expense.name
  $scope.setSecondaryHeader expense.cost, true

  $scope.hasTip = () ->
    $scope.expense && $scope.tip && $scope.tip != 0

  $scope.hasObligations = () ->
    $scope.expense && $scope.expense.obligations && $scope.expense.obligations.length != 0

  $scope.hasContributions = () ->
    $scope.expense && $scope.expense.contributions && $scope.expense.contributions.length != 0

  $scope.canEditObligation = (obligation) ->
    $scope.expense.purchaser_id == $scope.currentUser.id || obligation.user_id == $scope.currentUser.id

  $scope.canAddContribution = () ->
    return false unless $scope.expense.obligations
    return false if $scope.expense.contributions.length == $scope.expense.obligations.length
    return true if $scope.expense.purchaser_id == $scope.currentUser.id
    return false for contribution in $scope.expense.contributions when contribution.user_id is $scope.currentUser.id
    true
]
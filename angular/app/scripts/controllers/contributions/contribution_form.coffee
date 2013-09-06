angular.module("groupExpenserClientApp")
.controller "ContributionFormCtrl", ['$scope', '$location', 'expense', 'contribution', 'members', '$currentTrip', ($scope, $location, expense, contribution, members, $currentTrip) ->

  $scope.expense = expense
  $scope.contribution = contribution
  $scope.contribution.amount = $scope.contribution.amount * 1
  $scope.members = members.filter (m) -> m.id != $scope.currentUser.id and m.id != $scope.expense.purchaser_id
  $scope.fromOtherMember = $scope.isMine($scope.expense, 'purchaser_id') || ($scope.contribution.user_id? && $scope.contribution.user_id != $scope.currentUser.id)
  $scope.action =  if $scope.contribution.id then "Update" else "Add"

  $scope.setMainHeader "#{expense.name} Contribution"
  $scope.setSecondaryHeader contribution.amount, true

  $scope.showBackButton()

  $scope.save = () ->
    if $scope.action == "Add"
      $scope.contribution.$save () ->
        $location.path("/trips/#{$scope.expense.trip_id}/expenses/#{$scope.expense.id}")
        $currentTrip.refresh()
    else
      $scope.contribution.$update () ->
        $location.path("/trips/#{$scope.expense.trip_id}/expenses/#{$scope.expense.id}")
        $currentTrip.refresh()

  $scope.delete = () ->
    if confirm "Are you sure you want to delete this contribution?"
      $scope.contribution.$delete () ->
        $location.path("/trips/#{$scope.expense.trip_id}/expenses/#{$scope.expense.id}")
        $currentTrip.refresh()
]
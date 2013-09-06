angular.module("groupExpenserClientApp")
.controller "ExpenseFormCtrl", ['$scope', '$location', 'expense', 'members', '$currentTrip', ($scope, $location, expense, members, $currentTrip) ->
  $scope.expense = expense

  $scope.members = members.filter (m) -> m.id != $scope.currentUser.id

  $scope.expense.setUpNestedAttributes()

  $scope.editObligationsContributions = false
  $scope.addTipVisible = false

  $scope.showBackButton()

  if $scope.expense.id
    $scope.expense.cost = $scope.expense.cost * 1
    $scope.expense.tip = $scope.expense.tip * 1
    $scope.addTipVisible = $scope.expense.hasTip()

    $scope.action = 'Update'

    $scope.setMainHeader expense.name
    $scope.setSecondaryHeader expense.cost, true
  else
    $scope.action = 'Add'
    $scope.setMainHeader "Add"
    $scope.setSecondaryHeader "Expense"

  $scope.hasTip = () ->
    $scope.expense.tip && $scope.expense.tip != 0

  $scope.create = () ->
    if $scope.action == 'Add'
      $scope.expense.$save (expense) ->
        $currentTrip.refresh()
        $location.path "/trips/#{$scope.expense.trip_id}/expenses/#{expense.id}"
    else
      $scope.expense.$update () ->
        $currentTrip.refresh()
        $location.path "/trips/#{$scope.expense.trip_id}/expenses/#{$scope.expense.id}"

  $scope.addTip = () ->
    $scope.addTipVisible = true
    $scope.expense.tip = $scope.expense.cost * 0.15

  $scope.removeTip = () ->
    $scope.addTipVisible = false
    $scope.expense.tip = 0

  $scope.toggleEditObligationsContributions = ->
    $scope.editObligationsContributions = !$scope.editObligationsContributions

  $scope.averageCost = ->
    $scope.expense.cost / ($scope.members.length + 1)

  $scope.markMemberPaid = (member) ->
    contribution = (contribution for contribution in $scope.expense.contributions_attributes when contribution.user_id is member.id)

    if contribution.length > 0
      contribution[0].is_paid = true
    else
      $scope.expense.contributions_attributes.push
        is_paid: true
        user_id: member.id

  $scope.markMemberNotPaid = (member) ->
    contribution = (contribution for contribution in $scope.expense.contributions_attributes when contribution.user_id is member.id)
    contribution[0].is_paid = false

  $scope.markMemberRemoved = (member) ->
    obligation = (obligation for obligation in $scope.expense.obligations_attributes when obligation.user_id is member.id)

    if obligation.length > 0
      obligation[0].amount = 0
      obligation[0].is_average = false
    else
      $scope.expense.obligations_attributes.push
        amount: 0
        is_average: false
        user_id: member.id

    $scope.markMemberNotPaid(member)

  $scope.markMemberUnremoved = (member) ->
    obligation = (obligation for obligation in $scope.expense.obligations_attributes when obligation.user_id is member.id)
    obligation[0].is_average = true

  $scope.isPaid = (member) ->
    contribution = (contribution for contribution in $scope.expense.contributions_attributes when contribution.user_id is member.id)
    contribution.length isnt 0 and contribution[0].is_paid

  $scope.isObligated = (member) ->
    obligation = (obligation for obligation in $scope.expense.obligations_attributes when obligation.user_id is member.id)
    obligation.length is 0 or (obligation[0].amount > 0 or obligation[0].is_average)

  $scope.delete = () ->
    if confirm "Are you sure you want to delete this expense?"
      $scope.expense.$destroy () ->
        $currentTrip.refresh()
        $location.path "/trips/#{$scope.expense.trip_id}/expenses"

]
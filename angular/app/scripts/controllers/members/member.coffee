angular.module("groupExpenserClientApp")
.controller "MemberCtrl", ['$scope', 'member', '$location', '$currentTrip', '$navigationStack', ($scope, member, $location, $currentTrip, $navigationStack) ->

  $scope.member = member
  if $navigationStack.current() == "/trips/#{$scope.currentTrip.id}/members"
    $scope.showBackButton()
  else
    $scope.showTasksButton()

  firstName = $scope.member.name.split(' ')[0]
  lastName = $scope.member.name.split(' ')[1]
  firstName = "" if lastName == firstName
  $scope.setMainHeader(firstName)
  $scope.setSecondaryHeader lastName

  $scope.isMe = (user) ->
    user.id == $scope.currentUser.id


  $scope.hasDueMembers = ->
    $scope.member && $scope.member.due_members && $scope.member.due_members.length != 0

  $scope.hasOweMembers = ->
    $scope.member && $scope.member.owe_members && $scope.member.owe_members.length != 0

  $scope.hasPurchases = () ->
    $scope.member && $scope.member.purchases && $scope.member.purchases.length != 0

  $scope.hasObligations = () ->
    $scope.member && $scope.member.obligations && $scope.member.obligations.length != 0

  $scope.hasContributions = () ->
    $scope.member && $scope.member.contributions && $scope.member.contributions.length != 0

  $scope.delete = () ->
    if confirm "Are you sure you want to delete #{$scope.member.name}?"
      $scope.currentTrip.removeMember($scope.member).success () ->
        $currentTrip.refresh()
        if $scope.isMe($scope.member)
          $location.path('/profile')
        else
          $location.path "/trips/#{$scope.currentTrip.id}/members"
]
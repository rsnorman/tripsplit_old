angular.module("groupExpenserClientApp")
.controller "InviteCtrl", ['$scope', '$http', 'domain', 'friends', 'members', '$currentTrip', '$routeParams', ($scope, $http, domain, friends, members, $currentTrip, $routeParams) ->

  $scope.showBackButton()

  $scope.setMainHeader "Invite"
  $scope.setSecondaryHeader "Friends"

  console.log $routeParams

  $scope.friends = friends
  $scope.members = members
  $scope.social = $routeParams.social

  unless $scope.social
    $scope.social = if friends.length > 0 then 'TripSplit' else if $scope.currentUser.twitter_id then 'Twitter' else 'Facebook'

  myMembersMap = {}
  for row in $scope.members
    myMembersMap[row.id] = row.id

  $scope.switchSocial = (social) ->
    $scope.social = social

  $scope.isActiveSocial = (social) ->
    $scope.social == social

  $scope.isInvited = (friend) ->
    friend.invited || myMembersMap[friend.id]

  $scope.invite = (friend) ->
    friend.invited = true

    $scope.currentTrip.addMember(friend).success ->
      $currentTrip.refresh()

]
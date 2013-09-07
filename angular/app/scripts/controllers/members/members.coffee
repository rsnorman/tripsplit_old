angular.module("groupExpenserClientApp").controller "MembersCtrl", ['$scope', 'members', ($scope, members) ->
  $scope.members = members

  $scope.showTasksButton()

  $scope.addRightButton("/members/invite", "plus") if $scope.isOrganizer()

  $scope.setMainHeader $scope.currentTrip.name
  $scope.setSecondaryHeader "Members"
]


angular.module("groupExpenserClientApp")
.controller "FindFacebookFriendsCtrl", ['$scope', '$http', 'domain', '$currentTrip', '$window', '$routeParams', ($scope, $http, domain, $currentTrip, $window, $routeParams) ->

	$scope.facebookName = ""
	$scope.fetchingFriends = false
	$scope.facebookers = []

	if $routeParams.success == '1'
		$scope.invitedFacebooker = (member for member in $scope.members when member.facebook_id is $routeParams.uid)[0]
		console.log $scope.invitedFacebooker

	$scope.search = ->
		$scope.fetchingFriends = true
		$http.get("#{domain}/facebook_friends/find/#{$scope.facebookName}").success (facebookers) ->
			$scope.fetchingFriends = false
			$scope.facebookers = facebookers

	$scope.facebookInvited = (friend) ->
		result = (member for member in $scope.members when member.facebook_id is friend.uid.toString())
		result.length isnt 0

	$scope.inviteFacebooker = (friend) ->
		$http.post("#{domain}/facebook_friends/invite", {
				name: friend.name,
				facebook_id: friend.uid,
				profile_image_url: friend.pic_square,
				trip_id: $scope.currentTrip.id
			}).success ->
				$currentTrip.refresh()
				friend.invited = true
]
angular.module("groupExpenserClientApp")
.controller "FindTwitterFriendsCtrl", ['$scope', '$http', 'domain', '$currentTrip', ($scope, $http, domain, $currentTrip) ->

	$scope.twitterHandle = ""
	$scope.fetchingFriends = false
	$scope.twitterers = []

	$scope.search = ->
		$scope.fetchingFriends = true
		$http.get("#{domain}/twitter_friends/find/#{$scope.twitterHandle}").success (twitterers) ->
			$scope.fetchingFriends = false
			$scope.twitterers = twitterers

	$scope.twitterInvited = (friend) ->
		result = (member for member in $scope.members when member.twitter_id is friend.id.toString())
		result.length isnt 0

	$scope.inviteTwitterer = (friend) ->
		friend.invited = true

		$http.post("#{domain}/twitter_friends/invite", {
			name: friend.name,
			twitter_id: friend.id,
			profile_image_url: friend.profile_image_url,
			trip_id: $scope.currentTrip.id
		}).success ->
			$currentTrip.refresh()

]
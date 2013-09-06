angular.module("groupExpenserClientApp")
.factory "$currentTrip", ['NormStore', '$rootScope', '$cookieStore', 'Trip', (NormStore, $rootScope, $cookieStore, Trip) ->
	CurrentTrip = {}
	CurrentTrip.get = () ->
		CurrentTrip.set(new Trip(NormStore.get('Trip'))) if NormStore.get('Trip') && !$rootScope.currentTrip
		$rootScope.currentTrip

	CurrentTrip.set = (trip) ->
		$rootScope.currentTrip = trip
		NormStore.put('Trip', trip)
		console.log('setting trip', trip)
		$cookieStore.put('trip', {id: trip.id}) if trip

	CurrentTrip.refresh = (trip) ->
		Trip.get
			id: $rootScope.currentTrip.id,
			(trip) ->
				$rootScope.currentTrip = trip

	CurrentTrip.get()

	CurrentTrip
]
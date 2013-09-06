angular.module("groupExpenserClientApp")


# Expenses
.factory('ExpensesLoader', ['Expense', '$route', '$q', (Expense, $route, $q) ->
  () ->
    delay = $q.defer()
    Expense.query
      tripId: $route.current.params.tripId || $route.current.params.id,
      (expenses) ->
        delay.resolve expenses
    delay.promise;
])

.factory('ExpenseLoader', ['Expense', '$route', '$q', (Expense, $route, $q) ->
  () ->
    delay = $q.defer()
    if $route.current.params.expenseId || $route.current.params.id
      Expense.get
        tripId: $route.current.params.tripId,
        id: $route.current.params.expenseId || $route.current.params.id,
        (expense) ->
          delay.resolve expense
    else
      delay.resolve new Expense
        trip_id: $route.current.params.tripId
    delay.promise;
])

# Obligations
.factory('ObligationLoader', ['Obligation', '$route', '$q', (Obligation, $route, $q) ->
  () ->
    delay = $q.defer()
    Obligation.get
      expenseId: $route.current.params.expenseId,
      id: $route.current.params.id,
      (obligation) ->
        delay.resolve obligation
    delay.promise;
])

# Contributions
.factory('ContributionLoader', ['Contribution', '$route', '$q', (Contribution, $route, $q) ->
  () ->
    delay = $q.defer()
    if $route.current.params.id
      Contribution.get
        expense_id: $route.current.params.expenseId,
        id: $route.current.params.id,
        (contribution) ->
          delay.resolve contribution
    else
      delay.resolve new Contribution
        expense_id: $route.current.params.expenseId
        amount: 0
    delay.promise;
])

# Users
.factory('UserLoader', ['User', '$route', '$q', (User, $route, $q) ->
  () ->
    delay = $q.defer()
    if $route.current.params.memberId || $route.current.params.id
      User.get
        id: $route.current.params.id,
        (user) ->
          delay.resolve user
    delay.promise;
])

# Members
.factory('MembersLoader', ['Member', '$route', '$q', (Member, $route, $q) ->
  () ->
    delay = $q.defer()
    Member.query
      tripId: $route.current.params.tripId || $route.current.params.id,
      (members) ->
        delay.resolve members
    delay.promise;
])

.factory('MemberLoader', ['Member', '$route', '$q', '$currentUser', (Member, $route, $q, $currentUser) ->
  (id) ->
    delay = $q.defer()
    if id || $route.current.params.memberId || $route.current.params.id
      Member.get
        tripId: $route.current.params.tripId,
        id: id || $route.current.params.memberId || $route.current.params.id,
        (member) ->
          delay.resolve member
    else
      delay.resolve new Member
        trip_id: $route.current.params.tripId
    delay.promise;
])

# Trips
.factory('TripsLoader', ['Trip', '$route', '$q', (Trip, $route, $q) ->
  () ->
    delay = $q.defer()
    Trip.query (trips) ->
      delay.resolve trips
    delay.promise;
])

.factory('TripLoader', ['Trip', '$route', '$q', '$currentTrip', (Trip, $route, $q, $currentTrip) ->
  () ->
    delay = $q.defer()
    unless $currentTrip.get()
      if $route.current.params.tripId || $route.current.params.id
        Trip.get
          id: $route.current.params.tripId || $route.current.params.id,
          (trip) ->
            $currentTrip.set(trip)
            delay.resolve trip
      else
        delay.resolve new Trip()
    else
      delay.resolve $currentTrip.get()
    delay.promise;
])

# Friends
.factory('FriendsLoader', ['Friend', '$q', (Friend, $q) ->
  () ->
    delay = $q.defer()
    Friend.query (friends) ->
      delay.resolve friends
    delay.promise;
])
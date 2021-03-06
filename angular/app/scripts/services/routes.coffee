angular.module('groupExpenserClientApp')
.config(['$routeProvider', ($routeProvider) ->
  $routeProvider


  # Users
  .when '/',
    templateUrl: 'views/users/log_in.html'
    controller: 'LogInCtrl'
  .when '/logout',
    templateUrl: 'views/users/log_out.html'
    controller: 'LogOutCtrl'
  .when '/users/:id',
    templateUrl: 'views/users/logging_in.html'
    controller: 'LoggingInCtrl'
  .when '/users/:id/edit',
    templateUrl: 'views/users/profile.html'
    controller: 'ProfileCtrl'
    resolve:
      user: ['UserLoader', (UserLoader) ->
        UserLoader()
      ]


  # Trips
  .when '/trips',
    templateUrl: 'views/trips/index.html'
    controller: 'TripsCtrl'
    resolve:
      trips: ['TripsLoader', (TripsLoader) ->
        TripsLoader()
      ]
  .when '/trips/new',
    templateUrl: 'views/trips/form.html'
    controller: 'TripFormCtrl'
    resolve:
      trip: ['TripLoader', (TripLoader) ->
        TripLoader()
      ]
  .when '/trips/:id',
    templateUrl: 'views/trips/loading.html'
    controller: 'TripCtrl'
  .when '/current_trip',
    templateUrl: 'views/trips/show.html'
    controller: 'CurrentTripCtrl'
  .when '/trips/:id/edit',
    templateUrl: 'views/trips/form.html'
    controller: 'TripFormCtrl'
  .when '/trips/:id/join',
    templateUrl: 'views/trips/join.html'
    controller: 'TripJoinCtrl'



  # Expenses
  .when '/expenses/new',
    templateUrl: 'views/expenses/form.html'
    controller: 'ExpenseFormCtrl'
    resolve:
      expense: ['ExpenseLoader', (ExpenseLoader) ->
        ExpenseLoader()
      ]
      members: ['MembersLoader', (MembersLoader) ->
        MembersLoader()
      ]
  .when '/expenses/:id/edit',
    templateUrl: 'views/expenses/form.html'
    controller: 'ExpenseFormCtrl'
    resolve:
      expense: ['ExpenseLoader', (ExpenseLoader) ->
        ExpenseLoader()
      ]
      members: ['MembersLoader', (MembersLoader) ->
        MembersLoader()
      ]
  .when '/expenses/:id',
    templateUrl: 'views/expenses/expense.html'
    controller: 'ExpenseCtrl'
    resolve:
      expense: ['ExpenseLoader', (ExpenseLoader) ->
        ExpenseLoader()
      ]
  .when '/expenses',
    templateUrl: 'views/expenses/expenses.html'
    controller: 'ExpensesCtrl'
    resolve:
      expenses: ['ExpensesLoader', (ExpensesLoader) ->
        ExpensesLoader()
      ]


  # Obligations
  .when '/expenses/:expenseId/obligations/:id/edit',
    templateUrl: 'views/obligations/form.html'
    controller: 'ObligationFormCtrl'
    resolve:
      expense: ['ExpenseLoader', (ExpenseLoader) ->
        ExpenseLoader()
      ]
      obligation: ['ObligationLoader', (ObligationLoader) ->
        ObligationLoader()
      ]


  # Contributions
  .when '/expenses/:expenseId/contributions/new',
    templateUrl: 'views/contributions/form.html'
    controller: 'ContributionFormCtrl'
    resolve:
      expense: ['ExpenseLoader', (ExpenseLoader) ->
        ExpenseLoader()
      ]
      contribution: ['ContributionLoader', (ContributionLoader) ->
        ContributionLoader()
      ]
      members: ['MembersLoader', (MembersLoader) ->
        MembersLoader()
      ]
  .when '/expenses/:expenseId/contributions/:id/edit',
    templateUrl: 'views/contributions/form.html'
    controller: 'ContributionFormCtrl'
    resolve:
      expense: ['ExpenseLoader', (ExpenseLoader) ->
        ExpenseLoader()
      ]
      contribution: ['ContributionLoader', (ContributionLoader) ->
        ContributionLoader()
      ]
      members: ['MembersLoader', (MembersLoader) ->
        MembersLoader()
      ]


  # Members
  .when '/members',
    templateUrl: 'views/members/members.html'
    controller: 'MembersCtrl'
    resolve:
      members: ['MembersLoader', (MembersLoader) ->
        MembersLoader()
      ]
  .when '/members/invite',
    templateUrl: 'views/members/invite.html'
    controller: 'InviteCtrl'
    resolve:
      friends: ['FriendsLoader', (FriendsLoader) ->
        FriendsLoader()
      ]
      members: ['MembersLoader', (MembersLoader) ->
        MembersLoader()
      ]
  .when '/members/:id',
    templateUrl: 'views/members/member.html'
    controller: 'MemberCtrl'
    resolve:
      member: ['MemberLoader', (MemberLoader) ->
        MemberLoader()
      ]
  .when '/individual',
    templateUrl: 'views/members/member.html'
    controller: 'MemberCtrl'
    resolve:
      member: ['MemberLoader', '$currentUser', (MemberLoader, $currentUser) ->
        console.log('current user', $currentUser.get().id)
        MemberLoader($currentUser.get().id)
      ]




  .otherwise
    redirectTo: '/'
])
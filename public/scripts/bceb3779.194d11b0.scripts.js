!function () {
  angular.module('groupExpenserClientApp', [
    'ngResource',
    'http-auth-interceptor',
    'ngCookies',
    'ui'
  ]).constant('domain', 'http://' + window.location.hostname).run([
    '$rootScope',
    '$location',
    '$routeParams',
    '$currentUser',
    '$currentTrip',
    '$navigationStack',
    'authService',
    'domain',
    '$navigation',
    function (a, b, c, d, e, f, g, h) {
      return a.currentUser = d.get(), a.navigationStack = f, a.domain = h, a.isMine = function (b, c) {
        return c || (c = 'user_id'), a.currentUser.id === b[c];
      }, a.isOrganizer = function () {
        return a.currentUser.id === a.currentTrip.organizer_id;
      }, a.setMainHeader = function (b) {
        return a.mainHeader = b;
      }, a.setSecondaryHeader = function (b, c) {
        return null == c && (c = !1), a.secondaryHeader = b, a.useCurrencyForSecondaryHeader = c;
      }, a.openSettings = function () {
        return console.log('open settings'), a.settingsOpen = !0;
      }, a.$on('event:auth-loginConfirmed', function (c, e) {
        return d.set(e), a.currentUser = e, b.path('/trips');
      });
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').config([
    '$routeProvider',
    function (a) {
      return a.when('/', {
        templateUrl: 'views/users/log_in.html',
        controller: 'LogInCtrl'
      }).when('/logout', {
        templateUrl: 'views/users/log_out.html',
        controller: 'LogOutCtrl'
      }).when('/users/:id', {
        templateUrl: 'views/users/logging_in.html',
        controller: 'LoggingInCtrl'
      }).when('/users/:id/edit', {
        templateUrl: 'views/users/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          user: [
            'UserLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips', {
        templateUrl: 'views/trips/index.html',
        controller: 'TripsCtrl',
        resolve: {
          trips: [
            'TripsLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/new', {
        templateUrl: 'views/trips/form.html',
        controller: 'TripFormCtrl',
        resolve: {
          trip: [
            'TripLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:id', {
        templateUrl: 'views/trips/show.html',
        controller: 'TripCtrl',
        resolve: {
          trip: [
            'TripLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:id/edit', {
        templateUrl: 'views/trips/form.html',
        controller: 'TripFormCtrl'
      }).when('/trips/:id/join', {
        templateUrl: 'views/trips/join.html',
        controller: 'TripJoinCtrl'
      }).when('/trips/:tripId/expenses/new', {
        templateUrl: 'views/expenses/form.html',
        controller: 'ExpenseFormCtrl',
        resolve: {
          expense: [
            'ExpenseLoader',
            function (a) {
              return a();
            }
          ],
          members: [
            'MembersLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:tripId/expenses/:id/edit', {
        templateUrl: 'views/expenses/form.html',
        controller: 'ExpenseFormCtrl',
        resolve: {
          expense: [
            'ExpenseLoader',
            function (a) {
              return a();
            }
          ],
          members: [
            'MembersLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:tripId/expenses/:id', {
        templateUrl: 'views/expenses/expense.html',
        controller: 'ExpenseCtrl',
        resolve: {
          expense: [
            'ExpenseLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:tripId/expenses', {
        templateUrl: 'views/expenses/expenses.html',
        controller: 'ExpensesCtrl',
        resolve: {
          expenses: [
            'ExpensesLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:tripId/expenses/:expenseId/obligations/:id/edit', {
        templateUrl: 'views/obligations/form.html',
        controller: 'ObligationFormCtrl',
        resolve: {
          expense: [
            'ExpenseLoader',
            function (a) {
              return a();
            }
          ],
          obligation: [
            'ObligationLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:tripId/expenses/:expenseId/contributions/new', {
        templateUrl: 'views/contributions/form.html',
        controller: 'ContributionFormCtrl',
        resolve: {
          expense: [
            'ExpenseLoader',
            function (a) {
              return a();
            }
          ],
          contribution: [
            'ContributionLoader',
            function (a) {
              return a();
            }
          ],
          members: [
            'MembersLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:tripId/expenses/:expenseId/contributions/:id/edit', {
        templateUrl: 'views/contributions/form.html',
        controller: 'ContributionFormCtrl',
        resolve: {
          expense: [
            'ExpenseLoader',
            function (a) {
              return a();
            }
          ],
          contribution: [
            'ContributionLoader',
            function (a) {
              return a();
            }
          ],
          members: [
            'MembersLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:tripId/members', {
        templateUrl: 'views/members/members.html',
        controller: 'MembersCtrl',
        resolve: {
          members: [
            'MembersLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:tripId/members/invite', {
        templateUrl: 'views/members/invite.html',
        controller: 'InviteCtrl',
        resolve: {
          friends: [
            'FriendsLoader',
            function (a) {
              return a();
            }
          ],
          members: [
            'MembersLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:tripId/members/:id', {
        templateUrl: 'views/members/member.html',
        controller: 'MemberCtrl',
        resolve: {
          member: [
            'MemberLoader',
            function (a) {
              return a();
            }
          ]
        }
      }).when('/trips/:tripId/individual', {
        templateUrl: 'views/members/member.html',
        controller: 'MemberCtrl',
        resolve: {
          member: [
            'MemberLoader',
            '$currentUser',
            function (a, b) {
              return console.log('current user', b.get().id), a(b.get().id);
            }
          ]
        }
      }).otherwise({ redirectTo: '/' });
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('Contribution', [
    '$resource',
    'domain',
    function (a, b) {
      var c;
      return c = a('' + b + '/expenses/:expense_id/contributions/:id', {
        expense_id: '@expense_id',
        id: '@id'
      }, {
        query: {
          method: 'GET',
          isArray: !0
        },
        show: { method: 'GET' },
        create: { method: 'POST' },
        destroy: { method: 'DELETE' },
        update: { method: 'PUT' }
      });
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('Expense', [
    '$resource',
    'domain',
    function (a, b) {
      var c;
      return c = a('' + b + '/trips/:tripId/expenses/:id', {
        tripId: '@trip_id',
        id: '@id'
      }, {
        query: {
          method: 'GET',
          isArray: !0
        },
        show: { method: 'GET' },
        create: { method: 'POST' },
        destroy: { method: 'DELETE' },
        update: { method: 'PUT' }
      }), c.prototype.hasTip = function () {
        return this.tip && 0 !== this.tip;
      }, c.prototype.isLoan = function () {
        return this.is_loan || 'Loan' === this.expense_type;
      }, c.prototype.icon = function () {
        switch (this.expense_type) {
        case 'Gas':
          return 'car';
        case 'Food':
          return 'food';
        case 'Room':
          return 'home';
        case 'Alcohol':
          return 'beer';
        case 'Adventure':
          return 'globe';
        default:
          return 'credit-card';
        }
      }, c.prototype.setUpNestedAttributes = function () {
        var a, b, c, d, e, f, g, h, i;
        for (this.contributions_attributes = this.contributions || [], g = this.contributions_attributes, c = 0, e = g.length; e > c; c++)
          a = g[c], a.amount = 1 * a.amount, delete a.created_at, delete a.expense, delete a.updated_at, delete a.expense_id, delete a.user;
        for (this.obligations_attributes = this.obligations || [], h = this.obligations_attributes, i = [], d = 0, f = h.length; f > d; d++)
          b = h[d], b.amount = 1 * b.amount, delete b.created_at, delete b.expense, delete b.updated_at, delete b.expense_id, delete b.is_tip, i.push(delete b.user);
        return i;
      }, c;
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('Member', [
    '$resource',
    'domain',
    function (a, b) {
      var c;
      return c = a('' + b + '/trips/:tripId/members/:id', {
        tripId: '@tripId',
        id: '@id'
      });
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('Obligation', [
    '$resource',
    'domain',
    function (a, b) {
      var c;
      return c = a('' + b + '/expenses/:expenseId/obligations/:id', {
        expenseId: '@expense_id',
        id: '@id'
      }, {
        query: {
          method: 'GET',
          isArray: !0
        },
        show: { method: 'GET' },
        create: { method: 'POST' },
        destroy: { method: 'DELETE' },
        update: { method: 'PUT' }
      });
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('Trip', [
    '$resource',
    '$http',
    'domain',
    function (a, b, c) {
      var d;
      return d = a('' + c + '/trips/:id', { id: '@id' }, {
        query: {
          method: 'GET',
          isArray: !0
        },
        show: { method: 'GET' },
        create: { method: 'POST' },
        destroy: { method: 'DELETE' },
        update: { method: 'PUT' }
      }), d.prototype.addMember = function (a) {
        return b.post('' + c + '/trips/' + this.id + '/memberships', { user_id: a.id });
      }, d.prototype.removeMember = function (a) {
        return b['delete']('' + c + '/trips/' + this.id + '/memberships/' + a.id);
      }, d;
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('User', [
    '$resource',
    '$http',
    'domain',
    function (a, b, c) {
      var d;
      return d = a('' + c + '/users/:id', { id: '@id' }, { update: { method: 'PUT' } }), d.prototype.$login = function () {
        return b.post('' + c + '/users/login', this);
      }, d;
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('Friend', [
    '$resource',
    'domain',
    function (a, b) {
      var c;
      return c = a('' + b + '/friendships', {}, {
        query: {
          method: 'GET',
          isArray: !0
        }
      });
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('$currentUser', [
    'NormStore',
    '$http',
    'User',
    function (a, b, c) {
      var d;
      return d = { user: null }, d.get = function () {
        return a.get('User') && d.set(new c(a.get('User'))), d.user;
      }, d.set = function (c) {
        return d.user = c, a.put('User', c), b.defaults.headers.common.user = c ? c.id : null;
      }, d;
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('$navigationStack', [
    '$rootScope',
    '$location',
    'NormStore',
    function (a, b, c) {
      var d, e;
      return d = function () {
        function a(a) {
          this.max = a, this.stack = c.get('navigationStack') || [];
        }
        return a.prototype.add = function (a) {
          return this.stack[this.stack.length - 1] !== a ? (this.stack.push(a), c.put('navigationStack', this.stack.slice(0, +(this.stack.length - 1) + 1 || 9000000000))) : void 0;
        }, a.prototype.pop = function () {
          return this.stack.splice(this.stack.length - 1, 1), c.put('navigationStack', this.stack.slice(0, +(this.stack.length - 1) + 1 || 9000000000));
        }, a.prototype.current = function () {
          return this.stack[this.stack.length - 2];
        }, a.prototype.empty = function () {
          return this.stack.length <= 1;
        }, a;
      }(), e = new d(), a.$on('$routeChangeStart', function () {
        return e.current() !== b.path() ? e.add(b.path()) : e.pop();
      }), e;
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('ExpensesLoader', [
    'Expense',
    '$route',
    '$q',
    function (a, b, c) {
      return function () {
        var d;
        return d = c.defer(), a.query({ tripId: b.current.params.tripId || b.current.params.id }, function (a) {
          return d.resolve(a);
        }), d.promise;
      };
    }
  ]).factory('ExpenseLoader', [
    'Expense',
    '$route',
    '$q',
    function (a, b, c) {
      return function () {
        var d;
        return d = c.defer(), b.current.params.expenseId || b.current.params.id ? a.get({
          tripId: b.current.params.tripId,
          id: b.current.params.expenseId || b.current.params.id
        }, function (a) {
          return d.resolve(a);
        }) : d.resolve(new a({ trip_id: b.current.params.tripId })), d.promise;
      };
    }
  ]).factory('ObligationLoader', [
    'Obligation',
    '$route',
    '$q',
    function (a, b, c) {
      return function () {
        var d;
        return d = c.defer(), a.get({
          expenseId: b.current.params.expenseId,
          id: b.current.params.id
        }, function (a) {
          return d.resolve(a);
        }), d.promise;
      };
    }
  ]).factory('ContributionLoader', [
    'Contribution',
    '$route',
    '$q',
    function (a, b, c) {
      return function () {
        var d;
        return d = c.defer(), b.current.params.id ? a.get({
          expense_id: b.current.params.expenseId,
          id: b.current.params.id
        }, function (a) {
          return d.resolve(a);
        }) : d.resolve(new a({
          expense_id: b.current.params.expenseId,
          amount: 0
        })), d.promise;
      };
    }
  ]).factory('UserLoader', [
    'User',
    '$route',
    '$q',
    function (a, b, c) {
      return function () {
        var d;
        return d = c.defer(), (b.current.params.memberId || b.current.params.id) && a.get({ id: b.current.params.id }, function (a) {
          return d.resolve(a);
        }), d.promise;
      };
    }
  ]).factory('MembersLoader', [
    'Member',
    '$route',
    '$q',
    function (a, b, c) {
      return function () {
        var d;
        return d = c.defer(), a.query({ tripId: b.current.params.tripId || b.current.params.id }, function (a) {
          return d.resolve(a);
        }), d.promise;
      };
    }
  ]).factory('MemberLoader', [
    'Member',
    '$route',
    '$q',
    '$currentUser',
    function (a, b, c) {
      return function (d) {
        var e;
        return e = c.defer(), d || b.current.params.memberId || b.current.params.id ? a.get({
          tripId: b.current.params.tripId,
          id: d || b.current.params.memberId || b.current.params.id
        }, function (a) {
          return e.resolve(a);
        }) : e.resolve(new a({ trip_id: b.current.params.tripId })), e.promise;
      };
    }
  ]).factory('TripsLoader', [
    'Trip',
    '$route',
    '$q',
    function (a, b, c) {
      return function () {
        var b;
        return b = c.defer(), a.query(function (a) {
          return b.resolve(a);
        }), b.promise;
      };
    }
  ]).factory('TripLoader', [
    'Trip',
    '$route',
    '$q',
    '$currentTrip',
    function (a, b, c, d) {
      return function () {
        var e;
        return e = c.defer(), d.get() ? e.resolve(d.get()) : b.current.params.tripId || b.current.params.id ? a.get({ id: b.current.params.tripId || b.current.params.id }, function (a) {
          return d.set(a), e.resolve(a);
        }) : e.resolve(new a()), e.promise;
      };
    }
  ]).factory('FriendsLoader', [
    'Friend',
    '$q',
    function (a, b) {
      return function () {
        var c;
        return c = b.defer(), a.query(function (a) {
          return c.resolve(a);
        }), c.promise;
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('$currentTrip', [
    'NormStore',
    '$rootScope',
    '$cookieStore',
    'Trip',
    function (a, b, c, d) {
      var e;
      return e = {}, e.get = function () {
        return a.get('Trip') && !b.currentTrip && e.set(new d(a.get('Trip'))), b.currentTrip;
      }, e.set = function (d) {
        return b.currentTrip = d, a.put('Trip', d), console.log('setting trip', d), d ? c.put('trip', { id: d.id }) : void 0;
      }, e.refresh = function () {
        return d.get({ id: b.currentTrip.id }, function (a) {
          return b.currentTrip = a;
        });
      }, e.get(), e;
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('$navigation', [
    '$rootScope',
    function (a) {
      return a.backButtonVisible = !0, a.tasksButtonVisible = !1, a.rightButton = null, a.showBackButton = function () {
        return a.backButtonVisible = !0, a.tasksButtonVisible = !1;
      }, a.showTasksButton = function () {
        return a.backButtonVisible = !1, a.tasksButtonVisible = !0;
      }, a.hideAllButtons = function () {
        return a.backButtonVisible = !1, a.tasksButtonVisible = !1, a.hideNavigation = !0;
      }, a.addRightButton = function (b, c) {
        return a.rightButton = {
          link: b,
          type: c
        };
      }, a.$on('$routeChangeStart', function () {
        return a.backButtonVisible = !1, a.tasksButtonVisible = !1, a.rightButton = null, a.hideNavigation = !1;
      });
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').factory('NormStore', [function () {
      var a;
      return a = function () {
        function a() {
        }
        return a.prototype.put = function (a, b) {
          return localStorage[a] = JSON.stringify(b);
        }, a.prototype.get = function (a) {
          return localStorage[a] ? JSON.parse(localStorage[a]) : void 0;
        }, a.prototype.remove = function (a) {
          return delete localStorage[a];
        }, a.prototype.exists = function (a) {
          return null != localStorage[a];
        }, a;
      }(), new a();
    }]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').filter('normCurrency', function () {
    return function (a) {
      return a.indexOf(!0) ? a.replace('$', '<span class="currency">$</span>') : a;
    };
  });
}.call(this), function () {
  angular.module('groupExpenserClientApp').filter('normExpenseIcon', function () {
    return function (a) {
      switch (a) {
      case 'Gas':
        return 'road';
      case 'Food':
        return 'food';
      case 'Room':
        return 'home';
      case 'Alcohol':
        return 'beer';
      case 'Adventure':
        return 'globe';
      case 'Loan':
        return 'money';
      default:
        return 'credit-card';
      }
    };
  });
}.call(this), function () {
  angular.module('groupExpenserClientApp').directive('normNavigation', [function () {
      return {
        restrict: 'E',
        templateUrl: '/views/layout/navigation.html'
      };
    }]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').directive('normBackButton', [
    '$parse',
    '$navigationStack',
    function (a, b) {
      return {
        restrict: 'E',
        templateUrl: '/views/shared/back-button.html',
        link: function (a) {
          return a.navigationStack = b;
        }
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').directive('normanLoader', [
    '$rootScope',
    '$timeout',
    function (a, b) {
      return {
        restrict: 'E',
        replace: !0,
        template: '<div class=\'loader\'><div class=\'loader-animation\'></div></div>',
        link: function (c, d) {
          var e;
          return e = null, a.$on('$routeChangeStart', function () {
            return e = b(function () {
              return d.show().addClass('show-loader');
            }, 200);
          }), a.$on('$routeChangeSuccess', function () {
            return b.cancel(e), d.removeClass('show-loader'), b(function () {
              return d.hide();
            }, 1000);
          });
        }
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').directive('normScrollShadow', [
    '$window',
    function (a) {
      return {
        restrict: 'A',
        link: function (b, c) {
          var d;
          return d = angular.element(a), d.scroll(function () {
            return 0 === d.scrollTop() ? c.removeClass('bottom-shadow') : c.addClass('bottom-shadow');
          });
        }
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').directive('normParallax', [
    '$window',
    function (a) {
      return {
        restrict: 'A',
        link: function (b, c) {
          var d;
          return d = angular.element(a), d.scroll(function () {
            return c.css({ transform: 'translate(0, ' + d.scrollTop() / -2 + 'px)' });
          }), document.addEventListener('touchmove', function () {
            return d.scroll(function () {
              return c.css({ transform: 'translate(0, ' + d.scrollTop() / -2 + 'px)' });
            });
          }, !0);
        }
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').directive('normTabs', [
    '$window',
    function () {
      return {
        restrict: 'A',
        link: function (a, b) {
          var c;
          return c = b.find('.tab'), c.click(function () {
            return c.removeClass('active'), angular.element(this).addClass('active');
          });
        }
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').directive('normSettings', [
    '$timeout',
    function () {
      return {
        restrict: 'A',
        link: function (a, b, c) {
          var d, e;
          return e = function () {
            var a;
            return b.css({ top: angular.element(window).scrollTop() }), a = angular.element(c.mainContainer), a.each(function () {
              var a, b;
              return b = angular.element(this), a = angular.element('<div class=\'click-overlay\'></div>'), b.addClass('settings-open').append(a), b.find('.click-overlay').click(d).css({
                height: b.height(),
                width: b.width()
              });
            }), document.ontouchmove = function (a) {
              return a.preventDefault();
            };
          }, d = function () {
            var a, b;
            return document.ontouchmove = null, b = angular.element(c.mainContainer), a = angular.element('.click-overlay'), b.removeClass('settings-open'), a.remove();
          }, c.$observe('trigger', function () {
            return angular.element(c.trigger).live('click', e);
          }), b.find('a').click(d);
        }
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').directive('normRow', [function () {
      return {
        restrict: 'E',
        transclude: !0,
        templateUrl: '/views/layout/row.html',
        scope: {
          title: '@title',
          href: '@href',
          icon: '@icon',
          src: '@src'
        }
      };
    }]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').directive('normDatepicker', [function () {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (a, b, c, d) {
          var e;
          return a.$watch(function () {
            return d.$viewValue;
          }, function (a) {
            var b;
            return null == a && 'undefined' == typeof a || (b = a.split('-'), b[1] = (1 * b[1] - 1).toString(), b = b.join('-'), a === e.get('select', 'yyyy-mm-dd')) ? void 0 : e.set('select', b, { format: 'yyyy-m-dd' });
          }), b.pickadate({
            format: 'yyyy-mm-dd',
            container: 'body',
            onSet: function () {
              return e.get('select', 'yyyy-mm-dd') !== d.$viewValue ? d.$setViewValue(e.get('select', 'yyyy-mm-dd')) : void 0;
            }
          }), e = b.pickadate('picker');
        }
      };
    }]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').directive('normInputSwitch', [function () {
      return {
        restrict: 'E',
        template: '<label class=\'norm-input-switch\'><span class=\'ios-switch-label\'>{{label}}</span><input type=\'checkbox\' class=\'ios-switch\' /><div class=\'switch\'></div></label>',
        replace: !0,
        scope: {
          label: '@',
          ngModel: '='
        },
        require: '^ngModel',
        link: function (a, b) {
          var c;
          return c = b.find('.ios-switch'), a.$watch('ngModel', function (a) {
            return c.attr('checked', a);
          }), c.change(function () {
            return a.$apply(function () {
              return a.ngModel = c.is(':checked');
            });
          });
        }
      };
    }]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('TripsCtrl', [
    '$scope',
    'trips',
    '$currentTrip',
    function (a, b, c) {
      return a.trips = b, a.showTasksButton(), a.addRightButton('/trips/new', 'plus'), a.setMainHeader(a.currentUser.name), a.setSecondaryHeader('Trips'), c.set(null);
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('TripCtrl', [
    '$scope',
    '$routeParams',
    'trip',
    '$location',
    function (a) {
      return a.showTasksButton(), a.isOrganizer() && a.addRightButton('/trips/' + a.currentTrip.id + '/edit', 'edit'), a.setMainHeader(a.currentTrip.name), a.setSecondaryHeader(a.currentTrip.total_cost, !0);
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('TripFormCtrl', [
    '$scope',
    '$location',
    '$currentTrip',
    'Trip',
    function (a, b, c, d) {
      return a.trip = new d(a.currentTrip), a.showBackButton(), a.action = a.trip.id ? 'Update' : 'Create', a.setMainHeader(a.action), a.setSecondaryHeader('Trip'), a.trip.needs_facebook_event = null != a.trip.facebook_event_id, a.create = function () {
        return 'Create' === a.action ? a.trip.$save(function (a) {
          return c.set(a), b.path('/trips/' + a.id);
        }) : a.trip.$update(function (d) {
          return c.set(d), b.path('/trips/' + a.trip.id);
        });
      }, a['delete'] = function () {
        return confirm('Are you sure you want to delete this trip?') ? (a.trip.$destroy(function () {
          return c.set(null);
        }), b.path('/trips')) : void 0;
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('TripJoinCtrl', [
    '$scope',
    '$location',
    '$routeParams',
    '$cookieStore',
    function (a, b, c, d) {
      return a.setMainHeader('Joining'), a.setSecondaryHeader('Trip'), d.put('trip', { id: 1 * c.id }), a.currentUser ? b.path('/trips/' + c.id) : b.path('/');
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('LogInCtrl', [
    '$scope',
    'User',
    'authService',
    '$location',
    function (a, b, c, d) {
      return a.currentUser && d.path('/trips'), a.user = new b(), a.setMainHeader(null), a.setSecondaryHeader(null), a.hideAllButtons(), a.submit = function () {
        return a.user.$login().success(function () {
        }), c.loginConfirmed(user);
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('LogOutCtrl', [
    '$rootScope',
    '$currentUser',
    '$currentTrip',
    '$location',
    function (a, b, c, d) {
      return a.setMainHeader('TripSplit'), a.setSecondaryHeader('Logging Out'), a.hideAllButtons(), b.set(null), c.set(null), a.currentUser = null, a.currentTrip = null, d.path('/');
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('LoggingInCtrl', [
    '$scope',
    '$routeParams',
    'authService',
    'User',
    function (a, b, c, d) {
      return a.setMainHeader('TripSplit'), a.setSecondaryHeader('Logging In...'), a.user = d.get({ id: b.id }, function (a) {
        return c.loginConfirmed(a);
      });
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('ProfileCtrl', [
    '$scope',
    '$location',
    'user',
    '$currentUser',
    function (a, b, c, d) {
      return a.user = c, d.set(c), a.currentUser = c, a.userUpdated = !1, a.setMainHeader('Edit'), a.setSecondaryHeader(a.user.name), a.showTasksButton(), a.update = function () {
        return a.userUpdated = !1, a.user.$update(function (b) {
          return d.set(b), a.currentUser = b, a.userUpdated = !0;
        });
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('ContributionFormCtrl', [
    '$scope',
    '$location',
    'expense',
    'contribution',
    'members',
    '$currentTrip',
    function (a, b, c, d, e, f) {
      return a.expense = c, a.contribution = d, a.contribution.amount = 1 * a.contribution.amount, a.members = e.filter(function (b) {
        return b.id !== a.currentUser.id && b.id !== a.expense.purchaser_id;
      }), a.fromOtherMember = a.isMine(a.expense, 'purchaser_id') || null != a.contribution.user_id && a.contribution.user_id !== a.currentUser.id, a.action = a.contribution.id ? 'Update' : 'Add', a.setMainHeader('' + c.name + ' Contribution'), a.setSecondaryHeader(d.amount, !0), a.showBackButton(), a.save = function () {
        return 'Add' === a.action ? a.contribution.$save(function () {
          return b.path('/trips/' + a.expense.trip_id + '/expenses/' + a.expense.id), f.refresh();
        }) : a.contribution.$update(function () {
          return b.path('/trips/' + a.expense.trip_id + '/expenses/' + a.expense.id), f.refresh();
        });
      }, a['delete'] = function () {
        return confirm('Are you sure you want to delete this contribution?') ? a.contribution.$delete(function () {
          return b.path('/trips/' + a.expense.trip_id + '/expenses/' + a.expense.id), f.refresh();
        }) : void 0;
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('ObligationFormCtrl', [
    '$scope',
    '$location',
    'expense',
    'obligation',
    '$currentTrip',
    function (a, b, c, d, e) {
      return a.expense = c, a.obligation = d, a.setMainHeader('' + c.name + ' Obligation'), a.setSecondaryHeader(d.amount, !0), a.showBackButton(), a.update = function () {
        return a.obligation.$update(function () {
          return b.path('/trips/' + a.expense.trip_id + '/expenses/' + a.expense.id), e.refresh();
        });
      }, a['delete'] = function () {
        return confirm('Are you sure you want to delete this obligation?') ? (a.obligation.amount = 0, a.obligation.$update(function () {
          return b.path('/trips/' + a.expense.trip_id + '/expenses/' + a.expense.id), e.refresh();
        })) : void 0;
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('ExpenseCtrl', [
    '$scope',
    'expense',
    function (a, b) {
      return a.expense = b, a.showBackButton(), a.isMine(a.expense, 'purchaser_id') && a.addRightButton('/trips/' + b.trip_id + '/expenses/' + a.expense.id + '/edit', 'edit'), a.setMainHeader(b.name), a.setSecondaryHeader(b.cost, !0), a.hasTip = function () {
        return a.expense && a.tip && 0 !== a.tip;
      }, a.hasObligations = function () {
        return a.expense && a.expense.obligations && 0 !== a.expense.obligations.length;
      }, a.hasContributions = function () {
        return a.expense && a.expense.contributions && 0 !== a.expense.contributions.length;
      }, a.canEditObligation = function (b) {
        return a.expense.purchaser_id === a.currentUser.id || b.user_id === a.currentUser.id;
      }, a.canAddContribution = function () {
        var b, c, d, e;
        if (!a.expense.obligations)
          return !1;
        if (a.expense.contributions.length === a.expense.obligations.length)
          return !1;
        if (a.expense.purchaser_id === a.currentUser.id)
          return !0;
        for (e = a.expense.contributions, c = 0, d = e.length; d > c; c++)
          if (b = e[c], b.user_id === a.currentUser.id)
            return !1;
        return !0;
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('ExpenseFormCtrl', [
    '$scope',
    '$location',
    'expense',
    'members',
    '$currentTrip',
    function (a, b, c, d, e) {
      return a.expense = c, a.members = d.filter(function (b) {
        return b.id !== a.currentUser.id;
      }), a.expense.setUpNestedAttributes(), a.editObligationsContributions = !1, a.addTipVisible = !1, a.showBackButton(), a.expense.id ? (a.expense.cost = 1 * a.expense.cost, a.expense.tip = 1 * a.expense.tip, a.addTipVisible = a.expense.hasTip(), a.action = 'Update', a.setMainHeader(c.name), a.setSecondaryHeader(c.cost, !0)) : (a.action = 'Add', a.setMainHeader('Add'), a.setSecondaryHeader('Expense')), a.hasTip = function () {
        return a.expense.tip && 0 !== a.expense.tip;
      }, a.create = function () {
        return 'Add' === a.action ? a.expense.$save(function (c) {
          return e.refresh(), b.path('/trips/' + a.expense.trip_id + '/expenses/' + c.id);
        }) : a.expense.$update(function () {
          return e.refresh(), b.path('/trips/' + a.expense.trip_id + '/expenses/' + a.expense.id);
        });
      }, a.addTip = function () {
        return a.addTipVisible = !0, a.expense.tip = 0.15 * a.expense.cost;
      }, a.removeTip = function () {
        return a.addTipVisible = !1, a.expense.tip = 0;
      }, a.toggleEditObligationsContributions = function () {
        return a.editObligationsContributions = !a.editObligationsContributions;
      }, a.averageCost = function () {
        return a.expense.cost / (a.members.length + 1);
      }, a.markMemberPaid = function (b) {
        var c;
        return c = function () {
          var d, e, f, g;
          for (f = a.expense.contributions_attributes, g = [], d = 0, e = f.length; e > d; d++)
            c = f[d], c.user_id === b.id && g.push(c);
          return g;
        }(), c.length > 0 ? c[0].is_paid = !0 : a.expense.contributions_attributes.push({
          is_paid: !0,
          user_id: b.id
        });
      }, a.markMemberNotPaid = function (b) {
        var c;
        return c = function () {
          var d, e, f, g;
          for (f = a.expense.contributions_attributes, g = [], d = 0, e = f.length; e > d; d++)
            c = f[d], c.user_id === b.id && g.push(c);
          return g;
        }(), c[0].is_paid = !1;
      }, a.markMemberRemoved = function (b) {
        var c;
        return c = function () {
          var d, e, f, g;
          for (f = a.expense.obligations_attributes, g = [], d = 0, e = f.length; e > d; d++)
            c = f[d], c.user_id === b.id && g.push(c);
          return g;
        }(), c.length > 0 ? (c[0].amount = 0, c[0].is_average = !1) : a.expense.obligations_attributes.push({
          amount: 0,
          is_average: !1,
          user_id: b.id
        }), a.markMemberNotPaid(b);
      }, a.markMemberUnremoved = function (b) {
        var c;
        return c = function () {
          var d, e, f, g;
          for (f = a.expense.obligations_attributes, g = [], d = 0, e = f.length; e > d; d++)
            c = f[d], c.user_id === b.id && g.push(c);
          return g;
        }(), c[0].is_average = !0;
      }, a.isPaid = function (b) {
        var c;
        return c = function () {
          var d, e, f, g;
          for (f = a.expense.contributions_attributes, g = [], d = 0, e = f.length; e > d; d++)
            c = f[d], c.user_id === b.id && g.push(c);
          return g;
        }(), 0 !== c.length && c[0].is_paid;
      }, a.isObligated = function (b) {
        var c;
        return c = function () {
          var d, e, f, g;
          for (f = a.expense.obligations_attributes, g = [], d = 0, e = f.length; e > d; d++)
            c = f[d], c.user_id === b.id && g.push(c);
          return g;
        }(), 0 === c.length || c[0].amount > 0 || c[0].is_average;
      }, a['delete'] = function () {
        return confirm('Are you sure you want to delete this expense?') ? a.expense.$destroy(function () {
          return e.refresh(), b.path('/trips/' + a.expense.trip_id + '/expenses');
        }) : void 0;
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('ExpensesCtrl', [
    '$scope',
    'expenses',
    function (a, b) {
      return a.expenses = b, a.showTasksButton(), a.addRightButton('/trips/' + a.currentTrip.id + '/expenses/new', 'plus'), a.setMainHeader(a.currentTrip.name), a.setSecondaryHeader('Expenses');
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('InviteCtrl', [
    '$scope',
    '$http',
    'domain',
    'friends',
    'members',
    '$currentTrip',
    '$routeParams',
    function (a, b, c, d, e, f, g) {
      var h, i, j, k, l;
      for (a.showBackButton(), a.setMainHeader('Invite'), a.setSecondaryHeader('Friends'), console.log(g), a.friends = d, a.members = e, a.social = g.social, a.social || (a.social = d.length > 0 ? 'TripSplit' : a.currentUser.twitter_id ? 'Twitter' : 'Facebook'), h = {}, l = a.members, j = 0, k = l.length; k > j; j++)
        i = l[j], h[i.id] = i.id;
      return a.switchSocial = function (b) {
        return a.social = b;
      }, a.isActiveSocial = function (b) {
        return a.social === b;
      }, a.isInvited = function (a) {
        return a.invited || h[a.id];
      }, a.invite = function (b) {
        return b.invited = !0, a.currentTrip.addMember(b).success(function () {
          return f.refresh();
        });
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('JoinCtrl', [
    '$scope',
    '$cookieStore',
    '$routeParams',
    '$location',
    function (a, b, c, d) {
      return b.put('UserId', c.userId), d.path('/');
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('MemberCtrl', [
    '$scope',
    'member',
    '$location',
    '$currentTrip',
    '$navigationStack',
    function (a, b, c, d, e) {
      var f, g;
      return a.member = b, e.current() === '/trips/' + a.currentTrip.id + '/members' ? a.showBackButton() : a.showTasksButton(), f = a.member.name.split(' ')[0], g = a.member.name.split(' ')[1], g === f && (f = ''), a.setMainHeader(f), a.setSecondaryHeader(g), a.isMe = function (b) {
        return b.id === a.currentUser.id;
      }, a.hasDueMembers = function () {
        return a.member && a.member.due_members && 0 !== a.member.due_members.length;
      }, a.hasOweMembers = function () {
        return a.member && a.member.owe_members && 0 !== a.member.owe_members.length;
      }, a.hasPurchases = function () {
        return a.member && a.member.purchases && 0 !== a.member.purchases.length;
      }, a.hasObligations = function () {
        return a.member && a.member.obligations && 0 !== a.member.obligations.length;
      }, a.hasContributions = function () {
        return a.member && a.member.contributions && 0 !== a.member.contributions.length;
      }, a['delete'] = function () {
        return confirm('Are you sure you want to delete ' + a.member.name + '?') ? a.currentTrip.removeMember(a.member).success(function () {
          return d.refresh(), a.isMe(a.member) ? c.path('/profile') : c.path('/trips/' + a.currentTrip.id + '/members');
        }) : void 0;
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('MembersCtrl', [
    '$scope',
    'members',
    function (a, b) {
      return a.members = b, a.showTasksButton(), a.isOrganizer() && a.addRightButton('/trips/' + a.currentTrip.id + '/members/invite', 'plus'), a.setMainHeader(a.currentTrip.name), a.setSecondaryHeader('Members');
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('FindTwitterFriendsCtrl', [
    '$scope',
    '$http',
    'domain',
    '$currentTrip',
    function (a, b, c, d) {
      return a.twitterHandle = '', a.fetchingFriends = !1, a.twitterers = [], a.search = function () {
        return a.fetchingFriends = !0, b.get('' + c + '/twitter_friends/find/' + a.twitterHandle).success(function (b) {
          return a.fetchingFriends = !1, a.twitterers = b;
        });
      }, a.twitterInvited = function (b) {
        var c, d;
        return d = function () {
          var d, e, f, g;
          for (f = a.members, g = [], d = 0, e = f.length; e > d; d++)
            c = f[d], c.twitter_id === b.id.toString() && g.push(c);
          return g;
        }(), 0 !== d.length;
      }, a.inviteTwitterer = function (e) {
        return e.invited = !0, b.post('' + c + '/twitter_friends/invite', {
          name: e.name,
          twitter_id: e.id,
          profile_image_url: e.profile_image_url,
          trip_id: a.currentTrip.id
        }).success(function () {
          return d.refresh();
        });
      };
    }
  ]);
}.call(this), function () {
  angular.module('groupExpenserClientApp').controller('FindFacebookFriendsCtrl', [
    '$scope',
    '$http',
    'domain',
    '$currentTrip',
    '$window',
    '$routeParams',
    function (a, b, c, d, e, f) {
      var g;
      return a.facebookName = '', a.fetchingFriends = !1, a.facebookers = [], '1' === f.success && (a.invitedFacebooker = function () {
        var b, c, d, e;
        for (d = a.members, e = [], b = 0, c = d.length; c > b; b++)
          g = d[b], g.facebook_id === f.uid && e.push(g);
        return e;
      }()[0], console.log(a.invitedFacebooker)), a.search = function () {
        return a.fetchingFriends = !0, b.get('' + c + '/facebook_friends/find/' + a.facebookName).success(function (b) {
          return a.fetchingFriends = !1, a.facebookers = b;
        });
      }, a.facebookInvited = function (b) {
        var c;
        return c = function () {
          var c, d, e, f;
          for (e = a.members, f = [], c = 0, d = e.length; d > c; c++)
            g = e[c], g.facebook_id === b.uid.toString() && f.push(g);
          return f;
        }(), 0 !== c.length;
      }, a.inviteFacebooker = function (e) {
        return b.post('' + c + '/facebook_friends/invite', {
          name: e.name,
          facebook_id: e.uid,
          profile_image_url: e.pic_square,
          trip_id: a.currentTrip.id
        }).success(function () {
          return d.refresh(), e.invited = !0;
        });
      };
    }
  ]);
}.call(this);
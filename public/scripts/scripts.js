(function() {

  angular.module('groupExpenserClientApp', ['ngResource', 'http-auth-interceptor', 'ngCookies', 'ui']).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: 'views/log_in.html',
        controller: 'LogInCtrl'
      }).when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      }).when('/trips/new', {
        templateUrl: 'views/trips/form.html',
        controller: 'TripFormCtrl'
      }).when('/trips/:id', {
        templateUrl: 'views/trips/show.html',
        controller: 'TripCtrl',
        resolve: {
          trip: [
            'TripLoader', function(TripLoader) {
              return TripLoader();
            }
          ],
          expenses: [
            'ExpensesLoader', function(ExpensesLoader) {
              return ExpensesLoader();
            }
          ]
        }
      }).when('/trips/:id/edit', {
        templateUrl: 'views/trips/form.html',
        controller: 'TripFormCtrl'
      }).when('/users/:id', {
        templateUrl: 'views/logging_in.html',
        controller: 'LoggingInCtrl'
      }).when('/trips/:tripId/expenses/new', {
        templateUrl: 'views/expenses/form.html',
        controller: 'ExpenseFormCtrl'
      }).when('/trips/:tripId/expenses/:id/edit', {
        templateUrl: 'views/expenses/form.html',
        controller: 'ExpenseFormCtrl'
      }).when('/trips/:tripId/expenses/:id', {
        templateUrl: 'views/expenses/expense.html',
        controller: 'ExpenseCtrl'
      }).when('/trips/:tripId/expenses/:expenseId/obligations/:id/edit', {
        templateUrl: 'views/obligations/form.html',
        controller: 'ObligationFormCtrl'
      }).when('/trips/:tripId/expenses/:expenseId/contributions/new', {
        templateUrl: 'views/contributions/form.html',
        controller: 'ContributionFormCtrl'
      }).when('/trips/:tripId/expenses/:expenseId/contributions/:id/edit', {
        templateUrl: 'views/contributions/form.html',
        controller: 'ContributionFormCtrl'
      }).when('/trips/:tripId/members', {
        templateUrl: 'views/members/members.html',
        controller: 'MembersCtrl'
      }).when('/trips/:tripId/members/invite', {
        templateUrl: 'views/members/invite.html',
        controller: 'InviteCtrl'
      }).when('/trips/:tripId/members/:id', {
        templateUrl: 'views/members/member.html',
        controller: 'MemberCtrl'
      }).when('/trips/:tripId/members/:id/edit', {
        templateUrl: 'views/members/form.html',
        controller: 'MemberFormCtrl'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]).run([
    '$rootScope', '$location', '$routeParams', '$currentUser', '$navigationStack', 'authService', function($rootScope, $location, $routeParams, $currentUser, $navigationStack, authService) {
      $rootScope.currentUser = $currentUser.get();
      $rootScope.navigationStack = $navigationStack;
      $rootScope.setTitle = function(title) {
        return $rootScope.title = title;
      };
      $rootScope.hasTitle = function() {
        return $rootScope.title && $rootScope.title !== '';
      };
      $rootScope.setImage = function(image) {
        return $rootScope.image = image;
      };
      $rootScope.hasImage = function() {
        return $rootScope.image && $rootScope.image !== '';
      };
      $rootScope.setLeftButtonText = function(text) {
        return $rootScope.leftButtonText = text;
      };
      $rootScope.hasLeftButton = function() {
        return $rootScope.leftButtonText && $rootScope.leftButtonText !== '';
      };
      $rootScope.setRightButton = function(text, link) {
        $rootScope.rightButtonText = text;
        return $rootScope.rightButtonLink = link;
      };
      $rootScope.hasRightButton = function() {
        return $rootScope.rightButtonText && $rootScope.rightButtonText !== '';
      };
      $rootScope.isMine = function(item, userIdFieldName) {
        userIdFieldName || (userIdFieldName = 'user_id');
        return $rootScope.currentUser.id === item[userIdFieldName];
      };
      $rootScope.isOrganizer = function(trip) {
        return $rootScope.currentUser.id === trip.organizer_id;
      };
      $rootScope.$on('event:auth-loginRequired', function() {
        return console.log("Login required");
      });
      $rootScope.$on('event:auth-loginConfirmed', function(event, user) {
        $currentUser.set(user);
        $rootScope.currentUser = user;
        return $location.path('/profile');
      });
      return $rootScope.$on('$routeChangeStart', function() {
        $rootScope.title = null;
        $rootScope.image = null;
        $rootScope.leftButtonText = null;
        $rootScope.leftButtonLink = null;
        $rootScope.rightButtonText = null;
        $rootScope.rightButtonLink = null;
        if ($location.path().indexOf('users') !== -1) {
          return $rootScope.currentUserId = $location.path().split('/users/')[1];
        }
      });
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("ContributionFormCtrl", [
    '$scope', '$location', '$routeParams', 'Expense', 'Contribution', function($scope, $location, $routeParams, Expense, Contribution) {
      $scope.expense = Expense.get({
        tripId: $routeParams.tripId,
        id: $routeParams.expenseId
      });
      if ($routeParams.id) {
        $scope.contribution = Contribution.get({
          expense_id: $routeParams.expenseId,
          id: $routeParams.id
        });
      } else {
        $scope.contribution = new Contribution({
          expense_id: $routeParams.expenseId,
          amount: 0
        });
      }
      $scope.save = function() {
        return $scope.contribution.$save(function() {
          return $location.path("/trips/" + $scope.expense.trip_id + "/expenses/" + $scope.expense.id);
        });
      };
      return $scope["delete"] = function() {
        if (confirm("Are you sure you want to delete this contribution?")) {
          return $scope.contribution.$delete(function() {
            return $location.path("/trips/" + $scope.expense.trip_id + "/expenses/" + $scope.expense.id);
          });
        }
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("DetailsCtrl", function($scope, $routeParams, Trip) {});

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("ExpenseCtrl", [
    '$scope', '$routeParams', 'Expense', function($scope, $routeParams, Expense) {
      $scope.expense = Expense.get({
        tripId: $routeParams.tripId,
        id: $routeParams.id
      }, function() {
        $scope.setTitle($scope.expense.name);
        if ($scope.isMine($scope.expense, 'purchaser_id')) {
          return $scope.setRightButton("Edit", "#/trips/" + $scope.expense.trip_id + "/expenses/" + $scope.expense.id + "/edit");
        }
      });
      $scope.hasTip = function() {
        return $scope.expense && $scope.tip && $scope.tip !== 0;
      };
      $scope.hasObligations = function() {
        return $scope.expense && $scope.expense.obligations && $scope.expense.obligations.length !== 0;
      };
      $scope.hasContributions = function() {
        return $scope.expense && $scope.expense.contributions && $scope.expense.contributions.length !== 0;
      };
      $scope.canEditObligation = function(obligation) {
        return $scope.expense.purchaser_id === $scope.currentUser.id || obligation.user_id === $scope.currentUser.id;
      };
      return $scope.canAddContribution = function() {
        var contribution, _i, _len, _ref;
        if (!$scope.expense.obligations) {
          return false;
        }
        if ($scope.expense.contributions.length === $scope.expense.obligations.length) {
          return false;
        }
        if ($scope.expense.purchaser_id === $scope.currentUser.id) {
          return true;
        }
        _ref = $scope.expense.contributions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          contribution = _ref[_i];
          if (contribution.user_id === $scope.currentUser.id) {
            return false;
          }
        }
        return true;
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("ExpenseFormCtrl", [
    '$scope', '$location', '$routeParams', 'Expense', function($scope, $location, $routeParams, Expense) {
      if ($routeParams.id) {
        $scope.expense = Expense.get({
          tripId: $routeParams.tripId,
          id: $routeParams.id
        }, function() {
          $scope.expense.cost * 1;
          return $scope.expense.tip * 1;
        });
        $scope.action = 'Update';
      } else {
        $scope.expense = new Expense({
          trip_id: $routeParams.tripId
        });
        $scope.action = 'Create';
      }
      $scope.setTitle("" + $scope.action + " Expense");
      $scope.hasTip = function() {
        return $scope.expense.tip && $scope.expense.tip !== 0;
      };
      $scope.create = function() {
        if ($scope.action === 'Create') {
          return $scope.expense.$save(function() {
            return $location.path("/trips/" + $scope.expense.trip_id);
          });
        } else {
          return $scope.expense.$update(function() {
            return $location.path("/trips/" + $scope.expense.trip_id + "/expenses/" + $scope.expense.id);
          });
        }
      };
      $scope.addTip = function() {
        $scope.hasTip = true;
        return $scope.expense.tip = $scope.expense.cost * 0.15;
      };
      $scope.removeTip = function() {
        $scope.hasTip = false;
        return $scope.expense.tip = 0;
      };
      return $scope["delete"] = function() {
        if (confirm("Are you sure you want to delete this expense?")) {
          $scope.expense.$destroy();
          return $location.path("/trips/" + $scope.expense.trip_id);
        }
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("ExpensesCtrl", [
    '$scope', '$routeParams', 'Expense', function($scope, $routeParams, Expense) {
      return $scope.expenses = Expense.query({
        tripId: $scope.trip.id
      });
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("LogInCtrl", [
    '$scope', 'User', 'authService', function($scope, User, authService) {
      $scope.user = new User({
        email: 'rsnorman15@gmail.com',
        password: 'test'
      });
      return $scope.submit = function() {
        return $scope.user.$login().success(function(user) {
          return authService.loginConfirmed(user);
        });
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("LoggingInCtrl", [
    '$scope', '$routeParams', 'authService', 'User', function($scope, $routeParams, authService, User) {
      return $scope.user = User.get({
        id: $routeParams.id
      }, function(user) {
        return authService.loginConfirmed(user);
      });
    }
  ]);

}).call(this);

(function() {



}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("MembersCtrl", function($scope, $routeParams, Member) {
    $scope.members = Member.query({
      tripId: $scope.trip.id
    });
    return console.log($scope);
  });

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("InviteCtrl", [
    '$scope', '$routeParams', 'Trip', '$http', function($scope, $routeParams, Trip, $http) {
      $scope.tripId = $routeParams.tripId;
      $scope.trip = Trip.get({
        id: $routeParams.tripId
      });
      $scope.twitterFriends = [
        {
          "profile_use_background_image": true,
          "status": {
            "coordinates": null,
            "created_at": "Fri Jul 19 12:49:22 +0000 2013",
            "truncated": false,
            "favorited": false,
            "id_str": "358206931950776320",
            "favorite_count": 1,
            "entities": {
              "urls": [],
              "hashtags": [],
              "symbols": [],
              "user_mentions": []
            },
            "in_reply_to_user_id_str": null,
            "contributors": null,
            "text": "Judging programmers based on a test in Ruby on Rails is impossible. So much heavy lifting is done that it's hard to show your chops.",
            "id": 358206931950776320,
            "retweet_count": 0,
            "in_reply_to_status_id_str": null,
            "geo": null,
            "retweeted": false,
            "lang": "en",
            "in_reply_to_user_id": null,
            "in_reply_to_screen_name": null,
            "source": "<a href=\"http://www.tweetdeck.com\" rel=\"nofollow\">TweetDeck</a>",
            "place": null,
            "in_reply_to_status_id": null
          },
          "lang": "en",
          "utc_offset": null,
          "follow_request_sent": false,
          "profile_background_tile": false,
          "statuses_count": 165,
          "listed_count": 0,
          "profile_link_color": "0084B4",
          "profile_image_url_https": "https://si0.twimg.com/profile_images/1681808159/IMG_0325_normal.JPG",
          "time_zone": null,
          "followers_count": 10,
          "url": null,
          "location": "",
          "notifications": false,
          "contributors_enabled": false,
          "verified": false,
          "profile_sidebar_border_color": "C0DEED",
          "friends_count": 33,
          "protected": false,
          "entities": {
            "description": {
              "urls": []
            }
          },
          "default_profile": true,
          "profile_background_color": "C0DEED",
          "screen_name": "rsnorman",
          "profile_sidebar_fill_color": "DDEEF6",
          "geo_enabled": false,
          "default_profile_image": false,
          "profile_background_image_url": "http://a0.twimg.com/images/themes/theme1/bg.png",
          "name": "Ryan",
          "profile_text_color": "333333",
          "is_translator": false,
          "id": 193407516,
          "following": true,
          "profile_image_url": "http://a0.twimg.com/profile_images/1681808159/IMG_0325_normal.JPG",
          "profile_background_image_url_https": "https://si0.twimg.com/images/themes/theme1/bg.png",
          "favourites_count": 0,
          "created_at": "Tue Sep 21 18:59:23 +0000 2010",
          "description": "",
          "id_str": "193407516"
        }
      ];
      console.log($scope.twitterFriends);
      return $scope.invite = function(index) {
        return $http.post('http://aqueous-tundra-9580.herokuapp.com/twitter_friends/invite', {
          name: $scope.twitterFriends[index].name,
          twitter_id: $scope.twitterFriends[index].id,
          trip_id: $scope.tripId
        });
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("JoinCtrl", [
    '$scope', '$cookieStore', '$routeParams', '$location', function($scope, $cookieStore, $routeParams, $location) {
      $cookieStore.put('UserId', $routeParams.userId);
      return $location.path("/");
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("MemberCtrl", [
    '$scope', '$routeParams', 'Member', 'Trip', '$location', function($scope, $routeParams, Member, Trip, $location) {
      $scope.trip = Trip.get({
        id: $routeParams.tripId
      });
      $scope.member = Member.get({
        tripId: $routeParams.tripId,
        id: $routeParams.id
      }, function() {
        return $scope.setTitle($scope.member.name);
      });
      $scope.isMe = function(user) {
        return user.id === $scope.currentUser.id;
      };
      $scope.hasPurchases = function() {
        return $scope.member && $scope.member.purchases && $scope.member.purchases.length !== 0;
      };
      $scope.hasObligations = function() {
        return $scope.member && $scope.member.obligations && $scope.member.obligations.length !== 0;
      };
      $scope.hasContributions = function() {
        return $scope.member && $scope.member.contributions && $scope.member.contributions.length !== 0;
      };
      return $scope["delete"] = function() {
        if (confirm("Are you sure you want to delete " + $scope.member.name + "?")) {
          return $scope.trip.removeMember($scope.member).success(function() {
            if (isMe($scope.member)) {
              return $location.path('/profile');
            } else {
              return $location.path("/trips/" + $scope.trip.id + "/members");
            }
          });
        }
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("MemberFormCtrl", [
    '$scope', '$location', '$routeParams', 'User', function($scope, $location, $routeParams, User) {
      $scope.tripId = $routeParams.tripId;
      $scope.member = User.get({
        id: $routeParams.id
      });
      return $scope.update = function() {
        return $scope.member.$update(function() {
          return $location.path("/trips/" + $scope.tripId + "/members/" + $scope.member.id);
        });
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("MembersCtrl", [
    '$scope', '$routeParams', 'Member', 'Trip', function($scope, $routeParams, Member, Trip) {
      $scope.tripId = $routeParams.tripId;
      $scope.trip = Trip.get({
        id: $routeParams.tripId
      });
      return $scope.members = Member.query({
        tripId: $routeParams.tripId
      });
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("ObligationFormCtrl", [
    '$scope', '$location', '$routeParams', 'Expense', 'Obligation', function($scope, $location, $routeParams, Expense, Obligation) {
      $scope.expense = Expense.get({
        tripId: $routeParams.tripId,
        id: $routeParams.expenseId
      });
      $scope.obligation = Obligation.get({
        expenseId: $routeParams.expenseId,
        id: $routeParams.id
      });
      $scope.update = function() {
        return $scope.obligation.$update(function() {
          return $location.path("/trips/" + $scope.expense.trip_id + "/expenses/" + $scope.expense.id);
        });
      };
      return $scope["delete"] = function() {
        if (confirm("Are you sure you want to delete this obligation?")) {
          $scope.obligation.amount = 0;
          return $scope.obligation.$update(function() {
            return $location.path("/trips/" + $scope.expense.trip_id + "/expenses/" + $scope.expense.id);
          });
        }
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("ProfileCtrl", [
    '$scope', 'Trip', function($scope, Trip) {
      return $scope.trips = Trip.query();
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").factory('TripLoader', function(Trip, $route, $q) {
    return function() {
      var delay;
      delay = $q.defer();
      Trip.get({
        id: $route.current.params.id
      }, function(trip) {
        trip.image_url = "/images/blue-mountain.jpg";
        return delay.resolve(trip);
      });
      return delay.promise;
    };
  }).controller("TripCtrl", function($scope, $routeParams, trip, $location) {
    console.log('here');
    $scope.trip = trip;
    $scope.currentPosition = $routeParams.pos || 'details';
    $scope.isActive = function(position) {
      return position === $scope.currentPosition;
    };
    $scope.goToPosition = function(position) {
      return $scope.currentPosition = position;
    };
    return $scope.$on('$routeUpdate', function() {
      return $scope.currentPosition = $location.search().pos;
    });
  });

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").factory('ExpensesLoader', [
    'Expense', '$route', '$q', function(Expense, $route, $q) {
      return function() {
        var delay;
        delay = $q.defer();
        Expense.query({
          tripId: $route.current.params.id
        }, function(expenses) {
          return delay.resolve(expenses);
        });
        return delay.promise;
      };
    }
  ]).factory('TripLoader', [
    'Trip', '$route', '$q', function(Trip, $route, $q) {
      return function() {
        var delay;
        delay = $q.defer();
        Trip.get({
          id: $route.current.params.id
        }, function(trip) {
          trip.image_url = "/images/blue-mountain.jpg";
          return delay.resolve(trip);
        });
        return delay.promise;
      };
    }
  ]).controller("TripCtrl", [
    '$scope', '$routeParams', 'trip', 'expenses', '$location', function($scope, $routeParams, trip, expenses, $location) {
      $scope.trip = trip;
      return $scope.expenses = expenses;
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").controller("TripFormCtrl", [
    '$scope', '$location', '$routeParams', 'Trip', function($scope, $location, $routeParams, Trip) {
      if ($routeParams.id) {
        $scope.trip = Trip.get({
          id: $routeParams.id
        });
        $scope.action = 'Update';
      } else {
        $scope.trip = new Trip({
          organizer_id: $scope.currentUser.id
        });
        $scope.action = 'Create';
      }
      $scope.setTitle("" + $scope.action + " Trip");
      $scope.create = function() {
        if ($scope.action === 'Create') {
          return $scope.trip.$save(function(trip) {
            return $location.path("/trips/" + trip.id);
          });
        } else {
          return $scope.trip.$update(function() {
            return $location.path("/trips/" + $scope.trip.id);
          });
        }
      };
      return $scope["delete"] = function() {
        if (confirm("Are you sure you want to delete this trip?")) {
          $scope.trip.$destroy();
          return $location.path("/profile");
        }
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").directive('normBackButton', [
    '$parse', '$navigationStack', function($parse, $navigationStack) {
      return {
        restrict: 'E',
        templateUrl: "/views/shared/back-button.html",
        link: function(scope, element, attrs) {
          return scope.navigationStack = $navigationStack;
        }
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").directive('normActiv', [
    '$parse', function($parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          return scope.$watch(function() {
            return element.hasClass('active');
          }, function() {
            if (element.hasClass('active')) {
              return scope.activeFn();
            }
          });
        }
      };
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").directive('normCircleAnimate', [
    '$timeout', '$location', function($timeout, $location) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var activePos, addRotation, animateRotation, childElement, currentRotation, positionChildElements, _i, _len, _ref;
          currentRotation = attrs.currentRotation || attrs.activePosition || 0;
          activePos = attrs.activePosition * Math.PI / 180;
          positionChildElements = function(el) {
            var childEl, i, innerRadius, radius, spacing, _i, _len, _ref, _results;
            el = angular.element(el);
            spacing = Math.PI * 2 / el.children().length;
            radius = (attrs.radius || el.width() / 2) * 1;
            innerRadius = el.width() / 2;
            _ref = el.children();
            _results = [];
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              childEl = _ref[i];
              _results.push((function(childEl) {
                var childElHeight, childElWidth, position;
                childEl = angular.element(childEl);
                childElWidth = childEl.outerWidth(true);
                childElHeight = childEl.outerHeight(true);
                position = activePos + (spacing * i);
                childEl.data('current-position', position * 180 / Math.PI);
                return childEl.css({
                  top: (Math.sin(position) * radius + innerRadius) - (childElHeight / 2),
                  left: (Math.cos(position) * radius + innerRadius) - (childElWidth / 2)
                });
              })(childEl));
            }
            return _results;
          };
          addRotation = function(el, rotation, reverse) {
            if (reverse == null) {
              reverse = false;
            }
            el = angular.element(el);
            el.css('transform', "rotate(" + (reverse ? '-' : '') + rotation + "deg");
            return el.data('current-rotation', rotation);
          };
          animateRotation = function(el, rotation, reverse, afterAnimate) {
            var transform, transition;
            if (reverse == null) {
              reverse = false;
            }
            if (afterAnimate == null) {
              afterAnimate = function() {};
            }
            el = angular.element(el);
            rotation = rotation + el.data('current-rotation') * 1;
            el.data('current-rotation', rotation);
            transform = new Transform(el[0]);
            transition = new Transition(el[0]);
            transition.set({
              property: 'transform',
              duration: '.75s'
            });
            transform.rotate(rotation * (reverse ? -1 : 1));
            return $timeout(afterAnimate, 750);
          };
          addRotation(element, currentRotation);
          _ref = element.children();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            childElement = _ref[_i];
            addRotation(childElement, currentRotation, true);
          }
          positionChildElements(element);
          return element.find('.icon').click(function() {
            var activeEl, rotateTo, _j, _len1, _ref1, _results;
            activeEl = angular.element(this);
            rotateTo = 360 - activeEl.data().currentPosition;
            animateRotation(element, rotateTo);
            element.children().removeClass('active');
            _ref1 = element.children();
            _results = [];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              childElement = _ref1[_j];
              _results.push((function(childElement) {
                var newPosition;
                childElement = angular.element(childElement);
                animateRotation(childElement, rotateTo, true, function() {
                  if (childElement.attr('name') === activeEl.attr('name')) {
                    return $location.path($location.path()).search({
                      pos: childElement.attr('name')
                    });
                  }
                });
                newPosition = Math.round(childElement.data().currentPosition + rotateTo);
                if (newPosition >= 360) {
                  newPosition = newPosition - 360;
                }
                return childElement.data('current-position', newPosition);
              })(childElement));
            }
            return _results;
          });
        }
      };
    }
  ]);

}).call(this);

(function() {



}).call(this);

(function() {

  angular.module("groupExpenserClientApp").directive('normTripDetail', [
    '$http', '$templateCache', '$compile', function($http, $templateCache, $compile) {
      return {
        restrict: 'E',
        scope: {
          templateUrl: '@normTemplateUrl'
        },
        link: function(scope, element, attrs) {
          return scope.$watch('templateUrl', function() {
            return $http.get(scope.templateUrl, {
              cache: $templateCache
            }).success(function(template) {
              template = $compile(template)(scope.$parent);
              return element.html(template);
            });
          });
        }
      };
    }
  ]);

}).call(this);

(function() {

  angular.module('groupExpenserClientApp').filter('normCurrency', function() {
    return function(formattedCurrency) {
      if (formattedCurrency.indexOf('$' !== -1)) {
        return formattedCurrency.replace('$', '<span class="currency">$</span>');
      } else {
        return formattedCurrency;
      }
    };
  });

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").factory("Contribution", [
    '$resource', function($resource) {
      var Expense;
      Expense = $resource('http://aqueous-tundra-9580.herokuapp.com/expenses/:expense_id/contributions/:id', {
        expense_id: '@expense_id',
        id: '@id'
      }, {
        query: {
          method: 'GET',
          isArray: true
        },
        show: {
          method: 'GET'
        },
        create: {
          method: 'POST'
        },
        destroy: {
          method: 'DELETE'
        },
        update: {
          method: 'PUT'
        }
      });
      return Expense;
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").factory("$currentUser", [
    '$cookieStore', '$http', function($cookieStore, $http) {
      var CurrentUser;
      CurrentUser = {
        user: null
      };
      CurrentUser.get = function() {
        if ($cookieStore.get('User')) {
          CurrentUser.set($cookieStore.get('User'));
        }
        return CurrentUser.user;
      };
      CurrentUser.set = function(user) {
        CurrentUser.user = user;
        $cookieStore.put('User', user);
        return $http.defaults.headers.common.user = user.id;
      };
      return CurrentUser;
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").factory("Expense", [
    '$resource', function($resource) {
      var Expense;
      Expense = $resource('http://aqueous-tundra-9580.herokuapp.com/trips/:tripId/expenses/:id', {
        tripId: '@trip_id',
        id: '@id'
      }, {
        query: {
          method: 'GET',
          isArray: true
        },
        show: {
          method: 'GET'
        },
        create: {
          method: 'POST'
        },
        destroy: {
          method: 'DELETE'
        },
        update: {
          method: 'PUT'
        }
      });
      return Expense;
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").factory("Member", [
    '$resource', function($resource) {
      var Member;
      Member = $resource('http://aqueous-tundra-9580.herokuapp.com/trips/:tripId/members/:id', {
        tripId: '@tripId',
        id: '@id'
      });
      return Member;
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").factory("$navigationStack", [
    '$rootScope', '$location', '$cookieStore', function($rootScope, $location, $cookieStore) {
      var NavigationStack, navigationStack;
      NavigationStack = (function() {

        function NavigationStack(max) {
          this.max = max;
          this.stack = $cookieStore.get('navigationStack') || [];
        }

        NavigationStack.prototype.add = function(location) {
          if (this.stack[this.stack.length - 1] !== location) {
            this.stack.push(location);
            return $cookieStore.put('navigationStack', this.stack.slice(0, +(this.stack.length - 1) + 1 || 9e9));
          }
        };

        NavigationStack.prototype.pop = function() {
          this.stack.splice(this.stack.length - 1, 1);
          return $cookieStore.put('navigationStack', this.stack.slice(0, +(this.stack.length - 1) + 1 || 9e9));
        };

        NavigationStack.prototype.current = function() {
          return this.stack[this.stack.length - 2];
        };

        NavigationStack.prototype.empty = function() {
          return this.stack.length <= 1;
        };

        return NavigationStack;

      })();
      navigationStack = new NavigationStack();
      $rootScope.$on('$routeChangeStart', function(scope, newRoute, oldRoute) {
        if (navigationStack.current() !== $location.path()) {
          return navigationStack.add($location.path());
        } else {
          return navigationStack.pop();
        }
      });
      return navigationStack;
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").factory("Obligation", [
    '$resource', function($resource) {
      var Expense;
      Expense = $resource('http://aqueous-tundra-9580.herokuapp.com/expenses/:expenseId/obligations/:id', {
        expenseId: '@expense_id',
        id: '@id'
      }, {
        query: {
          method: 'GET',
          isArray: true
        },
        show: {
          method: 'GET'
        },
        create: {
          method: 'POST'
        },
        destroy: {
          method: 'DELETE'
        },
        update: {
          method: 'PUT'
        }
      });
      return Expense;
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").factory("Trip", [
    '$resource', '$http', function($resource, $http) {
      var Trip;
      Trip = $resource('http://aqueous-tundra-9580.herokuapp.com/trips/:id', {
        id: '@id'
      }, {
        query: {
          method: 'GET',
          isArray: true
        },
        show: {
          method: 'GET'
        },
        create: {
          method: 'POST'
        },
        destroy: {
          method: 'DELETE'
        },
        update: {
          method: 'PUT'
        }
      });
      Trip.prototype.removeMember = function(member) {
        return $http["delete"]("http://aqueous-tundra-9580.herokuapp.com/trips/" + this.id + "/memberships/" + member.id);
      };
      return Trip;
    }
  ]);

}).call(this);

(function() {

  angular.module("groupExpenserClientApp").factory("User", [
    '$resource', '$http', function($resource, $http) {
      var User;
      User = $resource('http://aqueous-tundra-9580.herokuapp.com/users/:id', {
        id: '@id'
      }, {
        update: {
          method: 'PUT'
        }
      });
      User.prototype.$login = function() {
        return $http.post('http://aqueous-tundra-9580.herokuapp.com/users/login', this);
      };
      return User;
    }
  ]);

}).call(this);

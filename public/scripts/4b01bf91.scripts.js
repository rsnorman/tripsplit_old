!function(){angular.module("groupExpenserClientApp",["ngResource","http-auth-interceptor","ngCookies","ui"]).constant("domain","http://"+window.location.hostname).run(["$rootScope","$location","$routeParams","$currentUser","$currentTrip","$navigationStack","authService","domain","$navigation",function(a,b,c,d,e,f,g,h){return a.currentUser=d.get(),a.navigationStack=f,a.domain=h,a.isMine=function(b,c){return c||(c="user_id"),a.currentUser.id===b[c]},a.isOrganizer=function(){return a.currentUser.id===a.currentTrip.organizer_id},a.setMainHeader=function(b){return a.mainHeader=b},a.setSecondaryHeader=function(b,c){return null==c&&(c=!1),a.secondaryHeader=b,a.useCurrencyForSecondaryHeader=c},a.openSettings=function(){return console.log("open settings"),a.settingsOpen=!0},a.$on("event:auth-loginConfirmed",function(c,e){return d.set(e),a.currentUser=e,b.path("/trips")})}])}.call(this),function(){angular.module("groupExpenserClientApp").config(["$routeProvider",function(a){return a.when("/",{templateUrl:"views/users/log_in.html",controller:"LogInCtrl"}).when("/logout",{templateUrl:"views/users/log_out.html",controller:"LogOutCtrl"}).when("/users/:id",{templateUrl:"views/users/logging_in.html",controller:"LoggingInCtrl"}).when("/users/:id/edit",{templateUrl:"views/users/profile.html",controller:"ProfileCtrl",resolve:{user:["UserLoader",function(a){return a()}]}}).when("/trips",{templateUrl:"views/trips/index.html",controller:"TripsCtrl",resolve:{trips:["TripsLoader",function(a){return a()}]}}).when("/trips/new",{templateUrl:"views/trips/form.html",controller:"TripFormCtrl",resolve:{trip:["TripLoader",function(a){return a()}]}}).when("/trips/:id",{templateUrl:"views/trips/show.html",controller:"TripCtrl",resolve:{trip:["TripLoader",function(a){return a()}]}}).when("/trips/:id/edit",{templateUrl:"views/trips/form.html",controller:"TripFormCtrl"}).when("/trips/:tripId/expenses/new",{templateUrl:"views/expenses/form.html",controller:"ExpenseFormCtrl",resolve:{expense:["ExpenseLoader",function(a){return a()}]}}).when("/trips/:tripId/expenses/:id/edit",{templateUrl:"views/expenses/form.html",controller:"ExpenseFormCtrl",resolve:{expense:["ExpenseLoader",function(a){return a()}]}}).when("/trips/:tripId/expenses/:id",{templateUrl:"views/expenses/expense.html",controller:"ExpenseCtrl",resolve:{expense:["ExpenseLoader",function(a){return a()}]}}).when("/trips/:tripId/expenses",{templateUrl:"views/expenses/expenses.html",controller:"ExpensesCtrl",resolve:{expenses:["ExpensesLoader",function(a){return a()}]}}).when("/trips/:tripId/expenses/:expenseId/obligations/:id/edit",{templateUrl:"views/obligations/form.html",controller:"ObligationFormCtrl",resolve:{expense:["ExpenseLoader",function(a){return a()}],obligation:["ObligationLoader",function(a){return a()}]}}).when("/trips/:tripId/expenses/:expenseId/contributions/new",{templateUrl:"views/contributions/form.html",controller:"ContributionFormCtrl",resolve:{expense:["ExpenseLoader",function(a){return a()}],contribution:["ContributionLoader",function(a){return a()}]}}).when("/trips/:tripId/expenses/:expenseId/contributions/:id/edit",{templateUrl:"views/contributions/form.html",controller:"ContributionFormCtrl",resolve:{expense:["ExpenseLoader",function(a){return a()}],contribution:["ContributionLoader",function(a){return a()}]}}).when("/trips/:tripId/members",{templateUrl:"views/members/members.html",controller:"MembersCtrl",resolve:{members:["MembersLoader",function(a){return a()}]}}).when("/trips/:tripId/members/invite",{templateUrl:"views/members/invite.html",controller:"InviteCtrl"}).when("/trips/:tripId/members/:id",{templateUrl:"views/members/member.html",controller:"MemberCtrl",resolve:{member:["MemberLoader",function(a){return a()}]}}).otherwise({redirectTo:"/"})}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("Contribution",["$resource","domain",function(a,b){var c;return c=a(""+b+"/expenses/:expense_id/contributions/:id",{expense_id:"@expense_id",id:"@id"},{query:{method:"GET",isArray:!0},show:{method:"GET"},create:{method:"POST"},destroy:{method:"DELETE"},update:{method:"PUT"}})}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("Expense",["$resource","domain",function(a,b){var c;return c=a(""+b+"/trips/:tripId/expenses/:id",{tripId:"@trip_id",id:"@id"},{query:{method:"GET",isArray:!0},show:{method:"GET"},create:{method:"POST"},destroy:{method:"DELETE"},update:{method:"PUT"}}),c.prototype.hasTip=function(){return this.tip&&0!==this.tip},c.prototype.icon=function(){switch(this.expense_type){case"Gas":return"car";case"Food":return"food";case"Room":return"home";case"Alcohol":return"beer";case"Adventure":return"globe";default:return"credit-card"}},c}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("Member",["$resource","domain",function(a,b){var c;return c=a(""+b+"/trips/:tripId/members/:id",{tripId:"@tripId",id:"@id"})}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("Obligation",["$resource","domain",function(a,b){var c;return c=a(""+b+"/expenses/:expenseId/obligations/:id",{expenseId:"@expense_id",id:"@id"},{query:{method:"GET",isArray:!0},show:{method:"GET"},create:{method:"POST"},destroy:{method:"DELETE"},update:{method:"PUT"}})}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("Trip",["$resource","$http","domain",function(a,b,c){var d;return d=a(""+c+"/trips/:id",{id:"@id"},{query:{method:"GET",isArray:!0},show:{method:"GET"},create:{method:"POST"},destroy:{method:"DELETE"},update:{method:"PUT"}}),d.prototype.removeMember=function(a){return b["delete"](""+c+"/trips/"+this.id+"/memberships/"+a.id)},d}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("User",["$resource","$http","domain",function(a,b,c){var d;return d=a(""+c+"/users/:id",{id:"@id"},{update:{method:"PUT"}}),d.prototype.$login=function(){return b.post(""+c+"/users/login",this)},d}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("$currentUser",["$cookieStore","$http","User",function(a,b,c){var d;return d={user:null},d.get=function(){return a.get("User")&&d.set(new c(a.get("User"))),d.user},d.set=function(c){return console.log(c),d.user=c,a.put("User",c),b.defaults.headers.common.user=c?c.id:null},d}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("$navigationStack",["$rootScope","$location","$cookieStore",function(a,b,c){var d,e;return d=function(){function a(a){this.max=a,this.stack=c.get("navigationStack")||[]}return a.prototype.add=function(a){return this.stack[this.stack.length-1]!==a?(this.stack.push(a),c.put("navigationStack",this.stack.slice(0,+(this.stack.length-1)+1||9e9))):void 0},a.prototype.pop=function(){return this.stack.splice(this.stack.length-1,1),c.put("navigationStack",this.stack.slice(0,+(this.stack.length-1)+1||9e9))},a.prototype.current=function(){return this.stack[this.stack.length-2]},a.prototype.empty=function(){return this.stack.length<=1},a}(),e=new d,a.$on("$routeChangeStart",function(){return e.current()!==b.path()?e.add(b.path()):e.pop()}),e}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("ExpensesLoader",["Expense","$route","$q",function(a,b,c){return function(){var d;return d=c.defer(),a.query({tripId:b.current.params.tripId||b.current.params.id},function(a){return d.resolve(a)}),d.promise}}]).factory("ExpenseLoader",["Expense","$route","$q",function(a,b,c){return function(){var d;return d=c.defer(),b.current.params.expenseId||b.current.params.id?a.get({tripId:b.current.params.tripId,id:b.current.params.expenseId||b.current.params.id},function(a){return d.resolve(a)}):d.resolve(new a({trip_id:b.current.params.tripId})),d.promise}}]).factory("ObligationLoader",["Obligation","$route","$q",function(a,b,c){return function(){var d;return d=c.defer(),a.get({expenseId:b.current.params.expenseId,id:b.current.params.id},function(a){return d.resolve(a)}),d.promise}}]).factory("ContributionLoader",["Contribution","$route","$q",function(a,b,c){return function(){var d;return d=c.defer(),b.current.params.id?a.get({expense_id:b.current.params.expenseId,id:b.current.params.id},function(a){return d.resolve(a)}):d.resolve(new a({expense_id:b.current.params.expenseId,amount:0})),d.promise}}]).factory("UserLoader",["User","$route","$q",function(a,b,c){return function(){var d;return d=c.defer(),(b.current.params.memberId||b.current.params.id)&&a.get({id:b.current.params.id},function(a){return d.resolve(a)}),d.promise}}]).factory("MembersLoader",["Member","$route","$q",function(a,b,c){return function(){var d;return d=c.defer(),a.query({tripId:b.current.params.tripId||b.current.params.id},function(a){return d.resolve(a)}),d.promise}}]).factory("MemberLoader",["Member","$route","$q",function(a,b,c){return function(){var d;return d=c.defer(),b.current.params.memberId||b.current.params.id?a.get({tripId:b.current.params.tripId,id:b.current.params.memberId||b.current.params.id},function(a){return d.resolve(a)}):d.resolve(new a({trip_id:b.current.params.tripId})),d.promise}}]).factory("TripsLoader",["Trip","$route","$q",function(a,b,c){return function(){var b;return b=c.defer(),a.query(function(a){return b.resolve(a)}),b.promise}}]).factory("TripLoader",["Trip","$route","$q","$currentTrip",function(a,b,c,d){return function(){var e;return e=c.defer(),d.get()?e.resolve(d.get()):b.current.params.tripId||b.current.params.id?a.get({id:b.current.params.tripId||b.current.params.id},function(a){return d.set(a),e.resolve(a)}):e.resolve(new a),e.promise}}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("$currentTrip",["$cookieStore","$rootScope","Trip",function(a,b,c){var d;return d={},d.get=function(){return a.get("Trip")&&!b.currentTrip&&d.set(new c(a.get("Trip"))),b.currentTrip},d.set=function(c){return b.currentTrip=c,a.put("Trip",c)},d.refresh=function(a){return console.log(b.currentTrip,a),c.get({id:b.currentTrip.id},function(a){return b.currentTrip=a})},d.get(),d}])}.call(this),function(){angular.module("groupExpenserClientApp").factory("$navigation",["$rootScope",function(a){return a.backButtonVisible=!0,a.tasksButtonVisible=!1,a.rightButton=null,a.showBackButton=function(){return a.backButtonVisible=!0,a.tasksButtonVisible=!1},a.showTasksButton=function(){return a.backButtonVisible=!1,a.tasksButtonVisible=!0},a.hideAllButtons=function(){return a.backButtonVisible=!1,a.tasksButtonVisible=!1,a.hideNavigation=!0},a.addRightButton=function(b,c){return a.rightButton={link:b,type:c}},a.$on("$routeChangeStart",function(){return a.backButtonVisible=!1,a.tasksButtonVisible=!1,a.rightButton=null,a.hideNavigation=!1})}])}.call(this),function(){angular.module("groupExpenserClientApp").filter("normCurrency",function(){return function(a){return a.indexOf(!0)?a.replace("$",'<span class="currency">$</span>'):a}})}.call(this),function(){angular.module("groupExpenserClientApp").filter("normExpenseIcon",function(){return function(a){switch(a){case"Gas":return"car";case"Food":return"food";case"Room":return"home";case"Alcohol":return"beer";case"Adventure":return"globe";default:return"credit-card"}}})}.call(this),function(){angular.module("groupExpenserClientApp").directive("normNavigation",[function(){return{restrict:"E",templateUrl:"/views/layout/navigation.html"}}])}.call(this),function(){angular.module("groupExpenserClientApp").directive("normBackButton",["$parse","$navigationStack",function(a,b){return{restrict:"E",templateUrl:"/views/shared/back-button.html",link:function(a){return a.navigationStack=b}}}])}.call(this),function(){angular.module("groupExpenserClientApp").directive("normanLoader",["$rootScope","$timeout",function(a,b){return{restrict:"E",replace:!0,template:"<div id='loader'><div id='loader_animation'></div></div>",link:function(c,d){var e;return e=null,a.$on("$routeChangeStart",function(){return e=b(function(){return d.fadeIn()},500),a.$on("$routeChangeSuccess",function(){return b.cancel(e),d.fadeOut()})})}}}])}.call(this),function(){angular.module("groupExpenserClientApp").directive("normScrollShadow",["$window",function(a){return{restrict:"A",link:function(b,c){var d;return d=angular.element(a),d.scroll(function(){return 0===d.scrollTop()?c.removeClass("bottom-shadow"):c.addClass("bottom-shadow")})}}}])}.call(this),function(){angular.module("groupExpenserClientApp").directive("normParallax",["$window",function(a){return{restrict:"A",link:function(b,c){var d;return d=angular.element(a),d.scroll(function(){return c.css({transform:"translate(0, "+d.scrollTop()/-2+"px)"})}),document.addEventListener("touchmove",function(){return d.scroll(function(){return c.css({transform:"translate(0, "+d.scrollTop()/-2+"px)"})})},!0)}}}])}.call(this),function(){angular.module("groupExpenserClientApp").directive("normTabs",["$window",function(){return{restrict:"A",link:function(a,b){var c;return c=b.find(".tab"),c.click(function(){return c.removeClass("active"),angular.element(this).addClass("active")})}}}])}.call(this),function(){angular.module("groupExpenserClientApp").directive("normSettings",[function(){return{restrict:"A",link:function(a,b,c){var d,e;return e=function(){return console.log("open settings"),angular.element(c.mainContainer).addClass("settings-open").click(d)},d=function(){return console.log("close settings"),angular.element(c.mainContainer).removeClass("settings-open").unbind("click",d)},c.$observe("trigger",function(){return console.log(c.trigger,angular.element(c.trigger)),angular.element(c.trigger).live("click",e)}),b.find("a").click(d)}}}])}.call(this),function(){angular.module("groupExpenserClientApp").directive("normRow",[function(){return{restrict:"E",transclude:!0,templateUrl:"/views/layout/row.html",scope:{title:"@title",href:"@href",icon:"@icon",src:"@src"}}}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("TripsCtrl",["$scope","trips","$currentTrip",function(a,b,c){return a.trips=b,a.showTasksButton(),a.addRightButton("/trips/new","plus"),a.setMainHeader(a.currentUser.name),a.setSecondaryHeader("Trips"),c.set(null)}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("TripCtrl",["$scope","$routeParams","trip","$location",function(a){return a.showTasksButton(),a.isOrganizer()&&a.addRightButton("/trips/"+a.currentTrip.id+"/edit","edit"),a.setMainHeader(a.currentTrip.name),a.setSecondaryHeader(a.currentTrip.total_cost,!0)}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("TripFormCtrl",["$scope","$location","$currentTrip","Trip",function(a,b,c,d){return a.trip=new d(a.currentTrip),a.showBackButton(),a.action=a.trip.id?"Update":"Create",a.setMainHeader(a.action),a.setSecondaryHeader("Trip"),a.create=function(){return"Create"===a.action?a.trip.$save(function(a){return c.set(a),b.path("/trips/"+a.id)}):a.trip.$update(function(d){return c.set(d),b.path("/trips/"+a.trip.id)})},a["delete"]=function(){return confirm("Are you sure you want to delete this trip?")?(a.trip.$destroy(function(){return c.set(null)}),b.path("/trips")):void 0}}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("LogInCtrl",["$scope","User","authService","$location",function(a,b,c,d){return a.currentUser&&d.path("/trips"),a.user=new b,a.setMainHeader(null),a.setSecondaryHeader(null),a.hideAllButtons(),a.submit=function(){return a.user.$login().success(function(){}),c.loginConfirmed(user)}}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("LogOutCtrl",["$rootScope","$currentUser","$currentTrip","$location",function(a,b,c,d){return a.setMainHeader("TripSplit"),a.setSecondaryHeader("Logging Out"),a.hideAllButtons(),b.set(null),c.set(null),a.currentUser=null,a.currentTrip=null,d.path("/")}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("LoggingInCtrl",["$scope","$routeParams","authService","User",function(a,b,c,d){return a.setMainHeader("TripSplit"),a.setSecondaryHeader("Logging In..."),a.user=d.get({id:b.id},function(a){return c.loginConfirmed(a)})}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("ProfileCtrl",["$scope","$location","user",function(a,b,c){return a.user=c,a.userUpdated=!1,a.setMainHeader("Edit"),a.setSecondaryHeader(a.user.name),a.showTasksButton(),a.update=function(){return a.userUpdated=!1,a.user.$update(function(){return a.userUpdated=!0})}}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("ContributionFormCtrl",["$scope","$location","expense","contribution","$currentTrip",function(a,b,c,d,e){return a.expense=c,a.contribution=d,a.setMainHeader(""+c.name+" Contribution"),a.setSecondaryHeader(d.amount,!0),a.showBackButton(),a.save=function(){return a.contribution.$save(function(){return b.path("/trips/"+a.expense.trip_id+"/expenses/"+a.expense.id),e.refresh()})},a["delete"]=function(){return confirm("Are you sure you want to delete this contribution?")?a.contribution.$delete(function(){return b.path("/trips/"+a.expense.trip_id+"/expenses/"+a.expense.id),e.refresh()}):void 0}}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("ObligationFormCtrl",["$scope","$location","expense","obligation","$currentTrip",function(a,b,c,d,e){return a.expense=c,a.obligation=d,a.setMainHeader(""+c.name+" Obligation"),a.setSecondaryHeader(d.amount,!0),a.showBackButton(),a.update=function(){return a.obligation.$update(function(){return b.path("/trips/"+a.expense.trip_id+"/expenses/"+a.expense.id),e.refresh()})},a["delete"]=function(){return confirm("Are you sure you want to delete this obligation?")?(a.obligation.amount=0,a.obligation.$update(function(){return b.path("/trips/"+a.expense.trip_id+"/expenses/"+a.expense.id),e.refresh()})):void 0}}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("ExpenseCtrl",["$scope","expense",function(a,b){return a.expense=b,a.showBackButton(),a.isMine(a.expense,"purchaser_id")&&a.addRightButton("/trips/"+b.trip_id+"/expenses/"+a.expense.id+"/edit","edit"),a.setMainHeader(b.name),a.setSecondaryHeader(b.cost,!0),a.hasTip=function(){return a.expense&&a.tip&&0!==a.tip},a.hasObligations=function(){return a.expense&&a.expense.obligations&&0!==a.expense.obligations.length},a.hasContributions=function(){return a.expense&&a.expense.contributions&&0!==a.expense.contributions.length},a.canEditObligation=function(b){return a.expense.purchaser_id===a.currentUser.id||b.user_id===a.currentUser.id},a.canAddContribution=function(){var b,c,d,e;if(!a.expense.obligations)return!1;if(a.expense.contributions.length===a.expense.obligations.length)return!1;if(a.expense.purchaser_id===a.currentUser.id)return!0;for(e=a.expense.contributions,c=0,d=e.length;d>c;c++)if(b=e[c],b.user_id===a.currentUser.id)return!1;return!0}}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("ExpenseFormCtrl",["$scope","$location","expense","$currentTrip",function(a,b,c,d){return a.expense=c,a.showBackButton(),a.expense.id?(1*a.expense.cost,1*a.expense.tip,a.addTipVisible=a.expense.hasTip(),a.action="Update",a.setMainHeader(c.name),a.setSecondaryHeader(c.cost,!0)):(a.action="Add",a.setMainHeader("Add"),a.setSecondaryHeader("Expense")),a.addTipVisible=!1,a.hasTip=function(){return a.expense.tip&&0!==a.expense.tip},a.create=function(){return"Add"===a.action?a.expense.$save(function(){return console.log("resfresh",a.currentTrip),d.refresh(),b.path("/trips/"+a.expense.trip_id)}):a.expense.$update(function(){return d.refresh(),b.path("/trips/"+a.expense.trip_id+"/expenses/"+a.expense.id)})},a.addTip=function(){return a.addTipVisible=!0,a.expense.tip=.15*a.expense.cost},a.removeTip=function(){return a.addTipVisible=!1,a.expense.tip=0},a["delete"]=function(){return confirm("Are you sure you want to delete this expense?")?(a.expense.$destroy(function(){return d.refresh()}),b.path("/trips/"+a.expense.trip_id)):void 0}}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("ExpensesCtrl",["$scope","expenses",function(a,b){return a.expenses=b,a.showTasksButton(),a.addRightButton("/trips/"+a.currentTrip.id+"/expenses/new","plus"),a.setMainHeader(a.currentTrip.name),a.setSecondaryHeader("Expenses")}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("InviteCtrl",["$scope","$http","domain","$currentTrip",function(a,b,c,d){return a.showBackButton(),a.setMainHeader("Invite"),a.setSecondaryHeader("Friends"),a.fetchingFriends=!0,a.twitterFriends=[{profile_use_background_image:!0,status:{coordinates:null,created_at:"Fri Jul 19 12:49:22 +0000 2013",truncated:!1,favorited:!1,id_str:"358206931950776320",favorite_count:1,entities:{urls:[],hashtags:[],symbols:[],user_mentions:[]},in_reply_to_user_id_str:null,contributors:null,text:"Judging programmers based on a test in Ruby on Rails is impossible. So much heavy lifting is done that it's hard to show your chops.",id:0x4f89b4e87023000,retweet_count:0,in_reply_to_status_id_str:null,geo:null,retweeted:!1,lang:"en",in_reply_to_user_id:null,in_reply_to_screen_name:null,source:'<a href="http://www.tweetdeck.com" rel="nofollow">TweetDeck</a>',place:null,in_reply_to_status_id:null},lang:"en",utc_offset:null,follow_request_sent:!1,profile_background_tile:!1,statuses_count:165,listed_count:0,profile_link_color:"0084B4",profile_image_url_https:"https://si0.twimg.com/profile_images/1681808159/IMG_0325_normal.JPG",time_zone:null,followers_count:10,url:null,location:"",notifications:!1,contributors_enabled:!1,verified:!1,profile_sidebar_border_color:"C0DEED",friends_count:33,"protected":!1,entities:{description:{urls:[]}},default_profile:!0,profile_background_color:"C0DEED",screen_name:"rsnorman",profile_sidebar_fill_color:"DDEEF6",geo_enabled:!1,default_profile_image:!1,profile_background_image_url:"http://a0.twimg.com/images/themes/theme1/bg.png",name:"Ryan",profile_text_color:"333333",is_translator:!1,id:193407516,following:!0,profile_image_url:"http://a0.twimg.com/profile_images/1681808159/IMG_0325_normal.JPG",profile_background_image_url_https:"https://si0.twimg.com/images/themes/theme1/bg.png",favourites_count:0,created_at:"Tue Sep 21 18:59:23 +0000 2010",description:"",id_str:"193407516"}],a.fetchingFriends=!1,a.invite=function(e){return a.twitterFriends[e].invited=!0,b.post(""+c+"/twitter_friends/invite",{name:a.twitterFriends[e].name,twitter_id:a.twitterFriends[e].id,trip_id:a.currentTrip.id}).success(function(){return d.refresh()})}}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("JoinCtrl",["$scope","$cookieStore","$routeParams","$location",function(a,b,c,d){return b.put("UserId",c.userId),d.path("/")}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("MemberCtrl",["$scope","member","$location","$currentTrip","$navigationStack",function(a,b,c,d,e){var f,g;return a.member=b,e.current()==="/trips/"+a.currentTrip.id+"/members"?a.showBackButton():a.showTasksButton(),f=a.member.name.split(" ")[0],g=a.member.name.split(" ")[1],g===f&&(f=""),a.setMainHeader(f),a.setSecondaryHeader(g),a.isMe=function(b){return b.id===a.currentUser.id},a.hasPurchases=function(){return a.member&&a.member.purchases&&0!==a.member.purchases.length},a.hasObligations=function(){return a.member&&a.member.obligations&&0!==a.member.obligations.length},a.hasContributions=function(){return a.member&&a.member.contributions&&0!==a.member.contributions.length},a["delete"]=function(){return confirm("Are you sure you want to delete "+a.member.name+"?")?a.currentTrip.removeMember(a.member).success(function(){return d.refresh(),a.isMe(a.member)?c.path("/profile"):c.path("/trips/"+a.currentTrip.id+"/members")}):void 0}}])}.call(this),function(){angular.module("groupExpenserClientApp").controller("MembersCtrl",["$scope","members",function(a,b){return a.members=b,a.showTasksButton(),a.isOrganizer()&&a.addRightButton("/trips/"+a.currentTrip.id+"/members/invite","plus"),a.setMainHeader(a.currentTrip.name),a.setSecondaryHeader("Members")}])}.call(this);
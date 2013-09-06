angular

.module('groupExpenserClientApp',  ['ngResource', 'http-auth-interceptor', 'ngCookies', 'ui'])

.constant('domain', "http://#{window.location.hostname}")

.run ['$rootScope', '$location', '$routeParams', '$currentUser', '$currentTrip', '$navigationStack', 'authService', 'domain', '$navigation', ($rootScope, $location, $routeParams, $currentUser, $currentTrip, $navigationStack, authService, domain, $navigation) ->

    $rootScope.currentUser = $currentUser.get()

    $rootScope.navigationStack = $navigationStack
    $rootScope.domain = domain

    $rootScope.isMine = (item, userIdFieldName) ->
      userIdFieldName ||= 'user_id'
      $rootScope.currentUser.id == item[userIdFieldName]

    $rootScope.isOrganizer = () ->
      $rootScope.currentUser.id == $rootScope.currentTrip.organizer_id

    $rootScope.setMainHeader = (text) ->
      $rootScope.mainHeader = text

    $rootScope.setSecondaryHeader = (text, useCurrency = false) ->
      $rootScope.secondaryHeader = text
      $rootScope.useCurrencyForSecondaryHeader = useCurrency

    $rootScope.openSettings = ->
      console.log 'open settings'
      $rootScope.settingsOpen = true;

    $rootScope.$on 'event:auth-loginConfirmed', (event, user) ->
      $currentUser.set user
      $rootScope.currentUser = user
      $location.path '/trips'
]

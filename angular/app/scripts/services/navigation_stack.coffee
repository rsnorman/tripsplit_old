angular.module("groupExpenserClientApp").factory "$navigationStack", ['$rootScope', '$location', 'NormStore', ($rootScope, $location, NormStore) ->
  class NavigationStack
  	constructor: (@max) ->
  		@stack = NormStore.get('navigationStack') || []
  	add: (location) ->
  		unless @stack[@stack.length - 1] == location
  			@stack.push(location)
  			NormStore.put('navigationStack', @stack[0..@stack.length - 1])
  	pop: () ->
  		@stack.splice(@stack.length - 1, 1)
  		NormStore.put('navigationStack', @stack[0..@stack.length - 1])
  	current: () ->
  		@stack[@stack.length - 2]
  	empty: () ->
  		@stack.length <= 1


  navigationStack = new NavigationStack()

  $rootScope.$on '$routeChangeStart', (scope, newRoute, oldRoute) ->
  	unless navigationStack.current() == $location.path()
  		navigationStack.add $location.path()
  	else
  		navigationStack.pop()

  navigationStack
]



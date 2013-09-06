angular.module("groupExpenserClientApp")
.factory "NormStore", [->
  class NormStore
  	put: (key, value) ->
  		localStorage[key] = JSON.stringify value
  	get: (key) ->
  		JSON.parse localStorage[key] if localStorage[key]
  	remove: (key) ->
  		delete localStorage[key]
  	exists: (key) ->
  		localStorage[key]?

  new NormStore
]
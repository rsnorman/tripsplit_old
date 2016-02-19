angular.module("groupExpenserClientApp")
.factory "NormStore", [->
  class NormStore
    put: (key, value) ->
      try
        localStorage[key] = JSON.stringify value
      catch
        console.log 'Cannot use localStorage in private mode'
    get: (key) ->
      try
        JSON.parse localStorage[key] if localStorage[key]
      catch
        null
  	remove: (key) ->
      try
        delete localStorage[key]
      catch
        console.log 'Cannot use localStorage in private mode'
    exists: (key) ->
      try
        localStorage[key]?
      catch
        false

  new NormStore
]

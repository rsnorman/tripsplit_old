angular.module("groupExpenserClientApp").factory "$currentUser", ['NormStore', '$http', 'User', (NormStore, $http, User) ->
  CurrentUser =
    user: null

  CurrentUser.get = () ->
    CurrentUser.set new User(NormStore.get('User')) if NormStore.get('User')
    CurrentUser.user

  CurrentUser.set = (user) ->
    CurrentUser.user = user
    NormStore.put('User', user)
    $http.defaults.headers.common.user = if user then user.id else null


  CurrentUser
]
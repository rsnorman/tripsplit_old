angular.module("groupExpenserClientApp").factory "User", ['$resource', '$http', 'domain', ($resource, $http, domain) ->
  User = $resource "#{domain}/users/:id",
    {id: '@id'}
    update:
    	method: 'PUT'

  User.prototype.$login = () ->
    $http.post "#{domain}/users/login", this

  User
]
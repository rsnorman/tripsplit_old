angular.module("groupExpenserClientApp")
.factory "Friend", ['$resource', 'domain', ($resource, domain) ->
  Friend = $resource "#{domain}/friendships", {},
    query:
      method: 'GET'
      isArray: true

  Friend
]
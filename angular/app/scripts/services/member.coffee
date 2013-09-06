angular.module("groupExpenserClientApp").factory "Member", ['$resource', 'domain', ($resource, domain) ->
  Member = $resource "#{domain}/trips/:tripId/members/:id",
    tripId: '@tripId'
    id: '@id'

  Member
]
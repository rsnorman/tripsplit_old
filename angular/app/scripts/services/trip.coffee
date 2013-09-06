angular.module("groupExpenserClientApp").factory "Trip", ['$resource', '$http', 'domain', ($resource, $http, domain) ->
  Trip = $resource "#{domain}/trips/:id", {
    id: '@id'
    },
    query:
      method: 'GET'
      isArray: true
    show:
      method: 'GET'
    create:
      method: 'POST'
    destroy:
     method: 'DELETE'
    update:
      method: 'PUT'


  Trip.prototype.addMember = (member) ->
    $http.post "#{domain}/trips/#{@id}/memberships",
      user_id: member.id

  Trip.prototype.removeMember = (member) ->
  	$http.delete("#{domain}/trips/#{@id}/memberships/#{member.id}")

  Trip
]
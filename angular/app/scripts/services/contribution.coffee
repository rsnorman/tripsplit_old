angular.module("groupExpenserClientApp").factory "Contribution", ['$resource', 'domain', ($resource, domain) ->
  Expense = $resource "#{domain}/expenses/:expense_id/contributions/:id", {
    expense_id: '@expense_id'
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

  Expense
]
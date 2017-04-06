angular.module("groupExpenserClientApp").factory "Obligation", ['$resource', 'domain', ($resource, domain) ->
  Expense = $resource "#{domain}/expenses/:expenseId/obligations/:id", {
    expenseId: '@expense_id'
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
angular.module("groupExpenserClientApp").factory "Expense", ['$resource', 'domain', ($resource, domain) ->
  Expense = $resource "#{domain}/trips/:tripId/expenses/:id", {
    tripId: '@trip_id'
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


  Expense.prototype.hasTip = () ->
    @tip && @tip != 0

  Expense.prototype.isLoan = () ->
    @is_loan or @expense_type == 'Loan'

  Expense.prototype.icon = () ->
    switch @expense_type
      when "Gas" then "car"
      when "Food" then "food"
      when "Room" then "home"
      when "Alcohol" then "beer"
      when "Adventure" then "globe"
      else "credit-card"

  Expense.prototype.setUpNestedAttributes = ->
    @contributions_attributes = @contributions or []

    for contribution in @contributions_attributes
      contribution.amount = contribution.amount * 1
      delete contribution.created_at
      delete contribution.expense
      delete contribution.updated_at
      delete contribution.expense_id
      delete contribution.user

    @obligations_attributes = @obligations or []

    for obligation in @obligations_attributes
      obligation.amount = obligation.amount * 1
      delete obligation.created_at
      delete obligation.expense
      delete obligation.updated_at
      delete obligation.expense_id
      delete obligation.is_tip
      delete obligation.user

  Expense
]
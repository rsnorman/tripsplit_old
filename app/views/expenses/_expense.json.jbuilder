json.cache! ['v1', expense], expires_in: 10.minutes do
  json.(expense, :id, :name, :description, :cost, :average_cost, :picture, :expense_type)

  json.purchaser do
    json.partial! 'users/user', user: expense.purchaser
  end

  json.trip do
    json.partial! 'trips/trip', trip: expense.trip
  end

  json.actions do
    json.show(url: api_link(trip_expense_path(expense.trip, expense)), method: 'GET') if can?(:read, expense)
    json.update(url: api_link(trip_expense_path(expense.trip, expense)), method: 'PATCH') if can?(:update, expense)
    json.delete(url: api_link(trip_expense_path(expense.trip, expense)), method: 'DELETE') if can?(:destroy, expense)
    json.view_obligations(url: api_link(expense_expense_obligations_path(expense)), method: 'GET') if can?(:view_obligations, expense)
  end
end

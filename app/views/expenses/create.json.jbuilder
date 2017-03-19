json.(@expense, :id, :name, :description, :cost, :average_cost, :picture, :expense_type)

json.purchaser do
  json.name @expense.purchaser.name || @expense.purchaser.email
end

json.trip do
  json.(@expense.trip, :id, :name, :description, :total_cost, :average_cost_per_member, :total_members, :picture)
  json.organizer do
    json.name @expense.trip.organizer.name || @expense.trip.organizer.email
  end
end

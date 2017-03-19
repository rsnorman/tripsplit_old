json.(@expense, :id, :name, :description, :cost, :average_cost, :picture, :expense_type)

json.purchaser do
  json.name @expense.purchaser.name || @expense.purchaser.email
end

json

json.trip do
  json.(@expense.trip, :id, :name, :location, :description, :total_cost, :average_cost_per_member, :total_members, :picture)
  json.organizer do
    json.name @expense.trip.organizer.name || @expense.trip.organizer.email
  end
end

json.obligations do
  json.array! @expense.obligations do |obligation|
    json.(obligation, :id, :amount, :expense_id)

    if (contribution = @expense.contributions.detect { |c| c.user_id == obligation.user_id })
      json.is_paid contribution.is_paid
    else
      json.is_paid false
    end

    json.user do
      json.name obligation.user.name || obligation.user.email
      json.picture obligation.user.picture
    end
  end
end

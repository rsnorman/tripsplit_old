json.array! @members do |member|
  json.(member, :id, :name, :email)

  json.total_expense_amount member.purchases.where(trip: @trip).sum(:cost)
  json.total_owe_amount @trip.total_owed_from(member)
end

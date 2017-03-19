json.array! @members do |member|
  json.(member, :id, :name, :email, :picture)

  json.total_purchased_amount member.purchases.where(trip: @trip).sum(:cost)
  json.total_obligated_amount @trip.total_owed_from(member)
  json.total_contributed_amount @trip.total_contributed_from(member)
  json.owes_current_user member.owes_user(current_user, @trip)
end

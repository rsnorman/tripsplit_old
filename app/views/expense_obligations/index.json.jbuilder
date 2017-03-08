json.array! @obligations do |obligation|
  json.(obligation, :id, :amount, :expense_id)

  if (contribution = @user_contributions[obligation.user_id])
    json.is_paid contribution.is_paid
  else
    json.is_paid false
  end

  json.user do
    json.name obligation.user.name || obligation.user.email
  end

  json.expense do
    json.(@expense, :name, :cost, :average_cost)

    json.purchaser do
      json.name @expense.purchaser.name || @expense.purchaser.email
    end
  end
end

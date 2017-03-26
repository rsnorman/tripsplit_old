json.array! @obligations do |obligation|
  json.(obligation, :id, :amount, :expense_id)

  if (contribution = @user_contributions[obligation.user_id])
    json.is_paid contribution.is_paid
  else
    json.is_paid false
  end

  json.user do
    json.partial! 'users/user', user: obligation.user
  end

  json.expense do
    json.partial! 'expenses/expense', expense: @expense
  end
end

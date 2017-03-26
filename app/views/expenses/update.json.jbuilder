json.partial! 'expense', expense: @expense

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

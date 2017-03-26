json.(@obligation, :id, :amount, :expense_id)

json.is_paid @contribution.is_paid

json.user do
  json.partial! 'users/user', user: @obligation.user
end

json.expense do
  json.partial! 'expenses/expense', user: @expense
end

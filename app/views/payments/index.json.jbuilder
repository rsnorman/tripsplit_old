running_total = 0

json.array! @payments do |payment|
  json.(payment, :name, :amount, :picture, :expense_type, :payment_type, :total)

  amount = payment.recipient == current_user ? payment.amount : payment.amount * -1
  running_total += amount

  json.running_total running_total
  json.amount amount

  json.recipient do
    json.name payment.recipient.name || payment.recipient.email
    json.picture payment.recipient.picture
  end

  json.payer do
    json.name payment.payer.name || payment.payer.email
    json.picture payment.payer.picture
  end
end

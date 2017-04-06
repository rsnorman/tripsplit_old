class PaymentFactory
  def self.create(payment_object, recipient:, payer:, amount:)
    new(payment_object, recipient, payer, amount).create
  end

  def initialize(payment_object, recipient, payer, amount)
    @payment_object = payment_object
    @recipient = recipient
    @payer = payer
    @amount = amount
  end

  def create
    case payment_object.class.to_s
    when 'ExpenseContribution'
      create_expense_contribution_payment
    when 'Expense'
      create_expense_payment
    else
      raise "Cannot create payment from #{payment_object.class}"
    end
  end

  private

  attr_reader :payment_object

  def create_expense_payment
    create_payment(
      name: payment_object.name,
      picture: payment_object.picture,
      expense_type: payment_object.expense_type,
      total: payment_object.cost
    )
  end

  def create_expense_contribution_payment
    create_payment(
      name: "#{payment_object.expense.purchaser.name}: #{payment_object.expense.name}",
      picture: payment_object.user.picture,
      expense_type: 'money',
      total: payment_object.amount
    )
  end

  def create_payment(attributes)
    Payment.new({
      payment_type: payment_object.class.to_s,
      recipient: @recipient,
      payer: @payer,
      amount: @amount,
      created_at: payment_object.created_at
    }.merge(attributes))
  end
end

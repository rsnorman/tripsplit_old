class Ability
  include CanCan::Ability

  def initialize(user)

    # Trip authorizations
    can :create, Trip
    can :read, Trip do |trip|
      trip.memberships.pluck(:user_id).include?(user.id)
    end
    can :manage, Trip do |trip|
      trip.organizer_id == user.id
    end
    can [:add_expense, :view_expenses, :view_members, :view_payments], Trip do |trip|
      trip.memberships.pluck(:user_id).include?(user.id)
    end

    # Expense authorizations
    can :read, Expense do |expense|
      expense.trip.memberships.pluck(:user_id).include?(user.id)
    end
    can :manage, Expense do |expense|
      expense.purchaser_id == user.id
    end
    can :manage, Expense do |expense|
      expense.trip.organizer_id == user.id
    end
    can :view_obligations, Expense do |expense|
      expense.trip.memberships.pluck(:user_id).include?(user.id)
    end
    can :create_member_expense, Expense do |expense|
      expense.purchaser_id == user.id || expense.trip.organizer_id == user.id
    end

    # Expense obligation authorizations
    can :read, ExpenseObligation do |obligation|
      obligation.user_id == user.id ||
        obligation.expense.trip.memberships.pluck(:user_id).include?(user.id)
    end
    can :manage, ExpenseObligation do |obligation|
      obligation.user_id == user.id
    end
    can :manage, ExpenseObligation do |obligation|
      obligation.expense.purchaser_id == user.id
    end
    can :manage, ExpenseObligation do |obligation|
      obligation.expense.trip.organizer_id == user.id
    end
    can :pay, ExpenseObligation do |obligation|
      obligation.user_id == user.id ||
        obligation.expense.purchaser_id == user.id
    end
    cannot :pay, ExpenseObligation do |obligation|
      obligation.user_id == obligation.expense.purchaser_id
    end
  end
end

class Ability
  include CanCan::Ability

  def initialize(user)

    # Trip authorizations
    can :create, Trip
    can :read, Trip do |trip|
      trip.trip_memberships.pluck(:user_id).include?(user.id)
    end
    can :manage, Trip do |trip|
      trip.organizer_id == user.id
    end


    # Expense authorizations
    can [:create, :read], Expense do |expense|
      expense.trip.trip_memberships.pluck(:user_id).include?(user.id)
    end
    can :manage, Expense do |expense|
      expense.purchaser_id == user.id
    end

    can :manage, Expense do |expense|
      expense.trip.organizer_id == user.id
    end
  end
end

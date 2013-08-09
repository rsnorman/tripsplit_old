class Trip < ActiveRecord::Base
  include ActionView::Helpers::NumberHelper

  attr_accessible :name, :location, :starts_on, :ends_on

  belongs_to :organizer, :class_name => User
  has_many :memberships, :class_name => TripMembership, :dependent => :destroy
  has_many :members, :through => :memberships, :source => :user
  has_many :expenses, :dependent => :destroy
  has_many :obligations, :through => :expenses
  has_many :contributions, :through => :expenses

  after_create :add_organizer_as_member

  # Adds the organizer as a member of the trip
  def add_organizer_as_member
    add_member(organizer)
  end

  # Adds a new member to a trip
  # @param [User] member to be added to trip
  def add_member(member)
    tm = TripMembership.new
    tm.trip = self
    tm.user = member
    tm.save

    tm
  end

  # Adds up all the expenses of the trip and returns the total cost
  # @return [BigDecimal] total cost of trip
  def total_cost
    @total_cost = 0
    expenses.each do |expense|
      @total_cost += expense.cost
    end
    @total_cost
  end

  # Adds up all the expenses and averages them per member
  # @return [BigDecimal] average cost per member of trip
  def average_cost_per_member
    total_cost / memberships.size
  end

  # Calculates how much is owed to a member of the trip
  # @param [User] member of the trip
  # @return [BigDecimal] amount owed to the member
  # @note Will return negative if member owes money
  def total_due_to(member)
    [total_contributed_from(member) - total_obligated_from(member), 0].max
  end

  # Calculates how much a member of the trip owes
  # @param [User] member of the trip
  # @return [BigDecimal] amount member owes
  # @note Will return negative if member is owed money
  def total_owed_from(member)
    [total_obligated_from(member) - total_contributed_from(member), 0].max
  end

  # Sums up the total amount the member has paid for on the trip
  # @param [User] member that has contributed
  # @return [BigDecimal] total amount of contributions
  def total_contributed_from(member)
    contributed_total = member.purchases.where(:trip_id => self.id).sum(&:cost)
    contributed_total += member.contributions.where(["expense_id IN (:expense_ids)", {:expense_ids => expenses.collect(&:id)}]).sum(&:amount)
    contributed_total -= contributions.where(["expense_id IN (:expense_ids)", {:expense_ids => member.purchases.collect(&:id)}]).sum(&:amount)
    contributed_total
  end

  # Sums up the total amount the member is obligated for on the trip
  # @param [User] member that has obligations
  # @return [BigDecimal] total amount of obligations
  def total_obligated_from(member)
    member.obligations.where(["expense_id IN (:expense_ids)", {:expense_ids => expenses.collect(&:id)}]).sum(&:amount)
  end

  # Gets a list of members that are due money and how much credit they have
  # @return [Array<Hash>] list of members due money
  def outstanding_creditors
    creditors = []
    members.each do |member|
      credit = amount_owed_to(member)
      creditors << {:member => member, :credit => credit} if credit > 0
    end
    creditors
  end

  # Gets a list of members that owe money and how much debt they have
  # @return [Array<Hash>] list of members owing money
  def outstanding_debtors
    debtors = []
    members.each do |member|
      debt = amount_owed_from(member)
      debtors << {:member => member, :debt => debt} if debt > 0
    end
    debtors
  end

  def member_details
    self.members.collect{|x| x.serializable_hash.merge({
      :total_paid => number_to_currency(total_contributed_from(x)),
      :total_obligated => number_to_currency(self.total_obligated_from(x)),
      :total_owed => number_to_currency(self.total_owed_from(x)),
      :total_due => number_to_currency(self.total_due_to(x))})
    }
  end

  # Prints out the trip details in a pretty format
  def to_s

    trip_details = <<-EOF
    #{self.name}
    ---------------------------------------------
    Total Trip Cost: #{number_to_currency(self.total_cost)}
    Average Cost Per Member #{number_to_currency(self.average_cost_per_member)}
    Total Expenses: #{self.expenses.count}
    Average Expense Cost: #{number_to_currency(self.total_cost / self.expenses.count)}

      EOF

    trip_details += "    Expenses\n    ---------------------------------------------\n"
    self.expenses.each do |e|
      trip_details += <<-EOF
      #{e.name}
      ---------------
      Cost: #{number_to_currency(e.cost)}
      Average Cost: #{number_to_currency(e.average_cost)}
      Purchaser: #{e.purchaser.name}

      EOF
    end

    trip_details += "    Members\n    ---------------------------------------------\n"
    self.members.each do |m|
      trip_details += <<-EOF
      #{m.name}
      ---------------
      Total Paid: #{number_to_currency(self.total_contributed_from(m))}
      Total Obligated: #{number_to_currency(self.total_obligated_from(m))}
      #{self.total_owed_from(m).zero? ? "Amount Due: #{number_to_currency(self.total_due_to(m))}" : "Amount Owe: #{number_to_currency(self.total_owed_from(m))}"}

      EOF
    end

    trip_details
  end

  # Gets the total number of members for the trip
  def total_members
    members.count
  end

  # Formats start date in nicer format
  def pretty_start
    starts_on && starts_on.strftime("%b #{starts_on.day.ordinalize}")
  end

  def pretty_end
    ends_on && ends_on.strftime("%b #{ends_on.day.ordinalize}")
  end

  # Adds attributes to hash that are accessed through methods on not database columns
  def serializable_hash(options = {})
    options[:methods] = [:total_cost, :average_cost_per_member, :total_members, :pretty_start, :pretty_end]
    options[:include] = [:organizer]
    super
  end
end

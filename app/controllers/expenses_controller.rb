# Controller for registering, updating, and deleting expenses
class ExpensesController < ApplicationController
	respond_to :json

	before_action :get_trip, :only => [:index, :create]

	# Sets the trip if trip id has been passed
	def get_trip
		@trip = current_user.trips.find(params[:trip_id]) if params[:trip_id]
	end

	# Gets a list of all the expenses for the application or a user.
  #
  # @example
  #  #GET /expenses
  #  #GET /user/1/expenses
  #
  # [URL] /expenses [GET]
  #  [200 OK] Successfully retrieved Array of expenses
  #   # Example response
  #   [{
  #    "name" => "Gas Fill up",
  #    "expense_type" => "Gas",
  #    "cost" => "45.0",
  #    "user" => {
  #      "name" => "Ryan Norman"
  #    },
  #    "trip" => {
  #      "name" => "MT BROhemia"
  #    }
  #   }]
	def index
		@expenses = @trip.nil? ? current_user.purchases : params[:purchased] ? current_user.purchases.where(:trip_id => @trip.id) : @trip.expenses.order(created_at: :desc)
    @expenses.each{|x| x.full_detail = true}
		respond_with @expenses
	end

	# Gets a expense matching the id
  #
  # @example
  #  #GET /expenses/1
  #
  # [URL] /expenses/:id [GET]
  #  [200 OK] Successfully retrieved a expense
  #   # Example response
  #   {
  #    "name" => "Gas Fill up",
  #    "expense_type" => "Gas",
  #    "cost" => "45.0",
  #    "user" => {
  #      "name" => "Ryan Norman"
  #    },
  #    "trip" => {
  #      "name" => "MT BROhemia"
  #    }
  #   }
	def show
		@expense = Expense.where(trip: @user.trips).find(params[:id])
    @expense.full_detail = true
		respond_with @expense
	end

	# Creates a expense with the passed parameters
  #
  # @example
  #  #POST /expenses, {
  #    expense: {
  #      name: 'Dorito Chips',
  #      cost:  2.87,
  #      expense_type: 'Food'
  #    }
  #  }
  #
  # [URL] /expenses [POST]
  #  [201 CREATED] Successfully created a expense
  #   # Example response
  #   {
  #    "name" => "Gas Fill up",
  #    "expense_type" => "Gas",
  #    "cost" => "45.0",
  #    "user" => {
  #      "name" => "Ryan Norman"
  #    },
  #    "trip" => {
  #      "name" => "MT BROhemia"
  #    }
  #   }
	def create
    expense_params.delete(:contributions_attributes) if expense_params[:contributions_attributes].nil?
    expense_params.delete(:obligations_attributes) if expense_params[:obligations_attributes].nil?
		@expense = @trip.expenses.build(expense_params)
		@expense.purchaser = current_user
		@expense.save
		@expense.full_detail = true

		respond_with @expense
	end

	# Updates a expense with the passed parameters
	#
	# @example
	#  #PUT /expenses, {
  #    expense: {
  #      name: 'Dorito Chips',
  #      cost:  2.87,
  #      expense_type: 'Food'
  #    }
  #  }
  #
  # [URL] /expenses [PUT]
  #  [204 NO CONTENT] Successfully updated a expense
	def update
		@expense = current_user.purchases.find(params[:id])
    expense_params.delete(:contributions_attributes) if expense_params[:contributions_attributes].nil?
    expense_params.delete(:obligations_attributes) if expense_params[:obligations_attributes].nil?
		@expense.update_attributes(expense_params)
		@expense.full_detail = true
		render json: @expense, status: 202
	end

	# Deletes a expense matching the id
	#
	# @example
	#  #DELETE /expenses/1
  #
  # [URL] /expenses [DELETE]
  #  [204 NO CONTENT] Successfully deleted a expense
	def destroy
		@expense = current_user.purchases.find(params[:id])
		@expense.destroy
		respond_with @expense
	end

	private

	def expense_params
		params.require(:expense).permit(:cost, :expense_type, :name, :tip, :tip_included, :is_loan, :loanee_id, :description, :picture, obligations_attributes: [:amount, :user_id, :is_average], contributions_attributes: [:amount, :user_id, :is_paid]).tap do |p|
			p.delete(:picture) if p[:picture].blank?
		end
	end
end

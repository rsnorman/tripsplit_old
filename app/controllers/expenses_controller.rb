# Controller for registering, updating, and deleting expenses
class ExpensesController < ApplicationController
	respond_to :json

	before_filter :get_trip, :only => [:index, :create]

	# Sets the trip if trip id has been passed
	def get_trip
		@trip = @user.trips.find(params[:trip_id]) if params[:trip_id]
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
		@expenses = @trip.nil? ? @user.purchases : params[:purchased] ? @user.purchases.where(:trip_id => @trip.id) : @trip.expenses
    @expenses.each{|x| x.with_purchaser = true}
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
		@expense = Expense.find(params[:id], :conditions => {:trip_id => @user.trips.collect{|x| x.id}})
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
		render :json => { :errors => ["Must pass id of existing trip to add expense"] }, :status => :unprocessable_entity if @trip.nil?
		@expense = @trip.expenses.build(params[:expense])
		@expense.purchaser = @user
		@expense.save

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
		@expense = @user.purchases.find(params[:id])
		@expense.update_attributes(params[:expense])
		respond_with @expense
	end

	# Deletes a expense matching the id
	#
	# @example
	#  #DELETE /expenses/1
  #
  # [URL] /expenses [DELETE]
  #  [204 NO CONTENT] Successfully deleted a expense
	def destroy
		@expense = @user.purchases.find(params[:id])
		@expense.destroy
		respond_with @expense
	end
end

# Controller for registering, updating, and deleting expenses
class ExpensesController < ApplicationController
	respond_to :json

  load_and_authorize_resource :trip, through: :current_user, only: [:index, :create]
  load_and_authorize_resource through: :trip, only: :create
  load_and_authorize_resource except: [:index, :create]

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
		@expenses = @trip.expenses.order(created_at: :desc)
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
		@expense = @trip.expenses.build(expense_params)
		@expense.save
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
		@expense.update_attributes(expense_params)
	end

	# Deletes a expense matching the id
	#
	# @example
	#  #DELETE /expenses/1
  #
  # [URL] /expenses [DELETE]
  #  [204 NO CONTENT] Successfully deleted a expense
	def destroy
		@expense.destroy
	end

	private

	def expense_params
		params.require(:expense).permit(:purchaser_id, :cost, :expense_type, :name, :description, :picture).tap do |p|
			p.delete(:picture) if p[:picture].blank?
      if cannot?(:create_member_expense, @expense) || p[:purchaser_id].nil?
        p[:purchaser_id] = current_user.id
      end
		end
	end
end

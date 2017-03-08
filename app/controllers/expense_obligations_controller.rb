# Controller for registering, updating, and deleting obligations
class ExpenseObligationsController < ApplicationController
	respond_to :json

	# Gets a list of all the obligations for an expense for a user.
  #
  # @example
  #  #GET /expenses/1/obligations
  #
  # [URL] /expenses/1/obligations [GET]
  #  [200 OK] Successfully retrieved Array of obligations
  #   # Example response
  #   [{
  #    "name" => "Gas Fill up Obligation",
  #    "amount" => "15.0",
  #    "is_tip" => false,
  #    "is_customized" => false
  #   }]
	def index
		@expense = current_user.expenses.find(params[:expense_id])
		@obligations = @expense.obligations.includes(:user)
		@user_contributions = @expense.contributions.includes(:user).inject({}) do |user_contributions, contribution|
			user_contributions[contribution.user_id] = contribution
			user_contributions
		end
	end

  # Gets a list of all the obligations for an expense for a user.
  #
  # @example
  #  #GET /expenses/1/obligations
  #
  # [URL] /expenses/1/obligations [GET]
  #  [200 OK] Successfully retrieved Array of obligations
  #   # Example response
  #   [{
  #    "name" => "Gas Fill up Obligation",
  #    "amount" => "15.0",
  #    "is_tip" => false,
  #    "is_customized" => false
  #   }]
  def show
    @obligation = get_obligation
    respond_with @obligation
  end

	# Creates an obligation with the passed parameters
	#
	# @example
	#  #POST /expenses/1/obligations, {
  #    expense: {
  #      name: '2 Killians',
  #      cost:  10
  #    }
  #  }
  #
  # [URL] /expenses/1/obligations [POST]
  #  [200 OK] Successfully retrieved Array of obligations
  #   # Example response
  #   {
  #    "name" => "Gas Fill up Obligation",
  #    "amount" => "15.0",
  #    "is_tip" => false,
  #    "is_customized" => true
  #   }
	def create
		@obligation = current_user.obligations.build(expense_obligation_params)
		@expense = current_user.expenses.find(params[:expense_id])
		@obligation.expense = @expense
		@obligation.save
		respond_with @obligation
	end

	# Updates an obligation with the passed parameters
	#
	# @example
	#  #PUT /obligations, {
  #    expense: {
  #      name: '2 Killians',
  #      cost:  10
  #    }
  #  }
  #
  # [URL] /obligations [PUT]
  #  [204 NO CONTENT] Successfully updated an obligation
	def update
		@obligation = get_obligation
		@obligation.update_attributes(expense_obligation_params)
		respond_with @obligation
	end

  private

  def get_obligation
    current_user.obligations.find(params[:id]) rescue current_user.purchases.find(params[:expense_id]).obligations.find(params[:id])
  end

	def expense_obligation_params
		params.require(:expense_obligation).permit(:amount, :name, :user_id, :is_average)
	end
end

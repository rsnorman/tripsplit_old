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
		@obligations = @user.expenses.find(params[:expense_id]).obligations
		respond_with @obligations
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
		@obligation = @user.obligations.build(params[:expense_obligation])
		@expense = @user.expenses.find(params[:expense_id])
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
		@obligation.update_attributes(params[:expense_obligation])
		respond_with @obligation
	end

  private

  def get_obligation
    @user.obligations.find(params[:id]) rescue @user.purchases.find(params[:expense_id]).obligations.find(params[:id])
  end
end

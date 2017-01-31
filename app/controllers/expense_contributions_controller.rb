# Controller for registering, updating, and deleting contributions
class ExpenseContributionsController < ApplicationController
	respond_to :json

	# Gets a list of all the contributions for an expense for a user.
  #
  # @example
  #  #GET /expenses/1/contributions
  #  #GET /users/1/contributions
  #  #GET /trips/1/contributions
  #
  # [URL] /expenses/1/contributions [GET]
  # [URL] /users/1/contributions [GET]
  # [URL] /trips/1/contributions [GET]
  #  [200 OK] Successfully retrieved Array of contributions
  #   # Example response
  #   [{
  #    "amount" => "15.0"
  #   }]
	def index
    if params[:expense_id]
      @contributions = Expense.find(params[:expense_id]).contributions
    else
		  @contributions = @user.contributions
    end
		respond_with @contributions
	end

  # Gets a list of all the contributions for an expense for a user.
  #
  # @example
  #  #GET /expenses/1/contributions
  #
  # [URL] /expenses/1/contributions [GET]
  #  [200 OK] Successfully retrieved Array of contributions
  #   # Example response
  #   {,
  #    "amount" => "15.0",
  #   }
  def show
    @contribution = get_contribution
    respond_with @contribution
  end

	# Creates an contribution with the passed parameters
	#
	# @example
	#  #POST /expenses/1/contributions, {
  #    contribution: {
  #      amount:  10
  #    }
  #  }
  #
  # [URL] /expenses/1/contributions [POST]
  #  [201 CREATED] Successfully created a contribution
  #   # Example response
  #   {
  #    "amount" => "15.0"
  #   }
	def create
    @contribution = ExpenseContribution.new
		@expense = @user.expenses.find(params[:expense_id])
		@contribution.expense = @expense

    if expense_contribution_params[:user_id]
      if @expense.trip.organizer_id == @user.id || @expense.purchaser_id == @user.id
        user_id = expense_contribution_params.delete(:user_id)
        Rails.logger.info [user_id, @expense.purchaser_id].inspect
        if user_id.to_i != @expense.purchaser_id
          @contribution.attributes = expense_contribution_params
          @contribution.user_id = user_id
		      @contribution.save
        else
          @contribution.errors[:user_id] = ["Purchaser cannot have a contribution for expense"]
        end
      else
        @contribution.errors[:user_id] = ["Only purchaser or organizer can add contributions for other members"]
      end
    else
      @contribution.attributes = expense_contribution_params
      @contribution.user = @user
      @contribution.save
    end

		respond_with @contribution
	end

	# Updates an contribution with the passed parameters
	#
	# @example
	#  #PUT /contributions, {
  #    contribution: {
  #      amount:  10
  #    }
  #  }
  #
  # [URL] /contributions [PUT]
  #  [204 NO CONTENT] Successfully updated an contribution
	def update
		@contribution = get_contribution
		@contribution.update_attributes(expense_contribution_params)
		respond_with @contribution
	end

  # Deletes a contribution with the passed parameters
  #
  # @example
  #  #DELETE /contributions/1
  #
  # [URL] /contributions/:id [DELETE]
  #  [200 OK] Successfully deletes an contribution
  def destroy
    @contribution = get_contribution
    @contribution.destroy
    respond_with @contribution
  end

  private

  def get_contribution
    @contribution = ExpenseContribution.find(params[:id])

    unless @contribution.user_id == @user.id || @contribution.expense.purchaser_id == @user.id || @contribution.expense.trip.organizer_id == @user.id
      raise ActiveRecord::RecordNotFound
    end

    @contribution
  end

	def expense_contribution_params
		params.require(:expense_contribution).permit(:amount, :user_id, :is_paid)
	end
end

# Controller for registering, updating, and deleting expenses
class PaymentsController < ApplicationController
	respond_to :json

	before_action :get_payment_user, only: :index
  before_action :get_trip, only: :index

	# Sets use that payments were made to or from
	def get_payment_user
		@payment_user = User.find(params[:user_id])
	end

  # Sets the trip if trip id has been passed
  def get_trip
    fail ArgumentError, "Trip ID must be passed in params" unless params[:trip_id]
    @trip = current_user.trips.find(params[:trip_id])
  end

	# Gets a list of all the payments made to a specific user.
  #
  # @example
  #  #GET /users/1/payments
  #  #GET /users/1/payments?trip_id=1
  #
  # [URL] /users/1/payments [GET]
  #  [200 OK] Successfully retrieved Array of payments
  #   # Example response
  #   [{
  #    "name" => "Gas Fill up",
  #    "expense_type" => "Gas",
  #    "payment_type" => "Purchase",
  #    "amount" => "45.0",
  #    "from_user" => {
  #      "name" => "Ryan Norman"
  #    },
  #    "to_user" => {
  #      "name" => "Brett Hyman"
  #    },
  #    "trip" => {
  #      "name" => "MT BROhemia"
  #    }
  #   }]
	def index
    @payments = get_payments
	end

  private

  def get_payments
    PeerToPeerPayments.new(user: current_user, peer: @payment_user, trip: @trip).all
  end
end

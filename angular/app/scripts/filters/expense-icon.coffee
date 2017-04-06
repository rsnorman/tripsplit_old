angular.module('groupExpenserClientApp')
.filter 'normExpenseIcon', () ->
	(expenseType) ->
		switch expenseType
      when "Gas" then "road"
      when "Food" then "food"
      when "Room" then "home"
      when "Alcohol" then "beer"
      when "Adventure" then "globe"
      when "Loan" then "money"
      else "credit-card"
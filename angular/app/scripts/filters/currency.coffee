angular.module('groupExpenserClientApp').filter 'normCurrency', () ->
	(formattedCurrency) ->
		if formattedCurrency.indexOf '$' != -1
			formattedCurrency.replace '$', '<span class="currency">$</span>'
		else
			formattedCurrency
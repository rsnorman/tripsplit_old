angular.module("groupExpenserClientApp")

.directive 'normSettings', ['$timeout', ($timeout) ->
	restrict: 'A'
	link: (scope, element, attrs) ->
		openSettings = ->
			element.css
				top: angular.element(window).scrollTop()

			mainContainers = angular.element(attrs.mainContainer)
			mainContainers.each ->
				mainContainer = angular.element(@)
				clickOverlay = angular.element("<div class='click-overlay'></div>")
				mainContainer.addClass('settings-open').append(clickOverlay)
				mainContainer.find('.click-overlay').click(closeSettings).css
					height: mainContainer.height()
					width: mainContainer.width()
				
			document.ontouchmove = (e) ->
				e.preventDefault();

		closeSettings = ->
			document.ontouchmove = null

			mainContainer = angular.element(attrs.mainContainer)
			clickOverlay = angular.element('.click-overlay')
			mainContainer.removeClass('settings-open')
			clickOverlay.remove()
			

		attrs.$observe 'trigger', ->
			angular.element(attrs.trigger).live 'click', openSettings  			

		element.find('a').click closeSettings
]
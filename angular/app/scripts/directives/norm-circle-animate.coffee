angular.module("groupExpenserClientApp")

.directive 'normCircleAnimate', ['$timeout', '$location', ($timeout, $location) ->
  restrict: 'A'
  link: (scope, element, attrs) ->
    currentRotation = attrs.currentRotation or attrs.activePosition or 0
    activePos = attrs.activePosition * Math.PI / 180

    positionChildElements = (el) ->
      el = angular.element(el)
      spacing = Math.PI * 2 / el.children().length
      radius = (attrs.radius or el.width() / 2) * 1
      innerRadius = el.width() / 2

      for childEl, i in el.children()
        do (childEl) ->
          childEl = angular.element childEl
          childElWidth = childEl.outerWidth(true)
          childElHeight = childEl.outerHeight(true)
          position = activePos + (spacing * i)

          childEl.data 'current-position', position * 180 / Math.PI
          childEl.css
            top: (Math.sin(position) * radius + innerRadius) - (childElHeight / 2)
            left: (Math.cos(position) * radius + innerRadius) - (childElWidth / 2)

    addRotation = (el, rotation, reverse = false) ->
      el = angular.element(el)
      el.css 'transform', "rotate(#{if reverse then '-' else ''}#{rotation}deg"
      el.data 'current-rotation', rotation

    animateRotation = (el, rotation, reverse = false, afterAnimate = () ->) ->
      el = angular.element(el)
      rotation = rotation + el.data('current-rotation') * 1
      el.data 'current-rotation', rotation

      transform = new Transform el[0]
      transition = new Transition el[0]

      transition.set
        property: 'transform'
        duration: '.75s'

      transform.rotate(rotation * (if reverse then -1 else 1))

      $timeout afterAnimate, 750

    addRotation element, currentRotation
    addRotation(childElement, currentRotation, true) for childElement in element.children()

    positionChildElements(element)

    element.find('.icon').click () ->
      activeEl = angular.element this
      rotateTo =  360 - activeEl.data().currentPosition

      animateRotation element, rotateTo
      element.children().removeClass 'active'
      for childElement in element.children()
        do (childElement) ->
          childElement = angular.element childElement
          animateRotation childElement, rotateTo, true, () ->
            $location.path($location.path()).search({pos: childElement.attr('name')}) if childElement.attr('name') == activeEl.attr('name')
          newPosition = Math.round(childElement.data().currentPosition + rotateTo)
          newPosition = newPosition - 360 if newPosition >= 360
          childElement.data 'current-position', newPosition
]




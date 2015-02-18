// Game settings
var settings = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#D6D6D6'
};

var addPx = function(number) {
  return number + 'px';
};

// Setup the game screen as a SVG element on the DOM
d3.select('#gameScreen').append('svg:svg')
  .style({
    width: addPx(settings.width),
    height: addPx(settings.height),
    'background-color': settings.backgroundColor
  });

  
// Game settings
var settings = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#D6D6D6'
};

// Player
var player = {
    x: settings.width/2,
    y: settings.height-20,
    width: 10,
    height: 10
};

// Helper function for creating screen coordinates
var addPx = function(number) {
  return number + 'px';
};

// Setup the game screen as a SVG element on the DOM
d3.select('#game').style({
    width: addPx(settings.width),
    height: addPx(settings.height),
    'background-color': settings.backgroundColor
});

d3.select('#gameScreen').style({
    width: addPx(settings.width),
    height: addPx(settings.height)
});

// initialize the player and add keyboard controls
d3.select('#gameScreen').append('svg:rect').style({
  fill: 'black'
})
.attr('width', addPx(player.width))
.attr('height', addPx(player.height))
.attr('x', player.x)
.attr('y', player.y);

// Loop enemy motion
// Loop updating score

// update game based on events
function update() {
};

// Loop checking for game events
d3.timer(update);


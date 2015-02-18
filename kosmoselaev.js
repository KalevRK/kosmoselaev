// Game settings
var settings = {
  width: 800,
  height: 600,
  backgroundColor: '#D6D6D6'
};

// Player
var playerSettings = {
    x: settings.width/2,
    y: settings.height-20,
    width: 10,
    height: 10,
    moveIncrement: 10
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

// initialize the player
var player = d3.select('#gameScreen').append('svg:rect').style({
  fill: 'black'
})
.attr('width', addPx(playerSettings.width))
.attr('height', addPx(playerSettings.height))
.attr('x', playerSettings.x)
.attr('y', playerSettings.y);

// handle keyboard events for the player
d3.select('body').on('keydown', function(d) {
    d3.event.stopPropagation();
    var key = d3.event.keyCode;
    if (key === 39) {
      // move right
      playerSettings.x += playerSettings.moveIncrement;
      player.attr('x', playerSettings.x);
    } else if (key === 37) {
        // move left
        playerSettings.x -= playerSettings.moveIncrement;
        player.attr('x', playerSettings.x);
    }

})

// Loop enemy motion
// Loop updating score

// update game based on events
function update() {
};

// Loop checking for game events
d3.timer(update);


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
    width: 20,
    height: 20,
    moveIncrement: 20,
    laserWidth: 5,
    laserHeight: 10
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

// move player relative to mouse
d3.select('#game').on('mousemove', function() {
  var location = d3.mouse(this);
  playerSettings.x = location[0];
  playerSettings.y = location[1];
  player.attr('x', playerSettings.x)
  .attr('y', playerSettings.y);
})

// handle keyboard events for the player
d3.select('body').on('keydown', function(d) {
    d3.event.stopPropagation();
    var key = d3.event.keyCode;
    if (key === 32) {
        // fire weapon
        fireWeapon();
    } 

})

var fireWeapon = function() {
  d3.select('#gameScreen').append('svg:rect')
    .style({ fill: 'green' })
    .attr('width', addPx(playerSettings.laserWidth))
    .attr('height', addPx(playerSettings.laserHeight))
    .attr('x', playerSettings.x + playerSettings.width/2)
    .attr('y', playerSettings.y - playerSettings.height/2);
};

// Loop enemy motion
// Loop updating score

// update game based on events
function update() {
    d3.select('.laser')
};

// Loop checking for game events
d3.timer(update);


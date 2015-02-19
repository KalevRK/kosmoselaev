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

// Lasers
var lasers = {
  playerLasers: []
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
var player = d3.select('#gameScreen').append('svg:rect')
.attr('width', addPx(playerSettings.width))
.attr('height', addPx(playerSettings.height))
.attr('x', playerSettings.x)
.attr('y', playerSettings.y)
.style({
  fill: 'black'
});

// move player relative to mouse
d3.select('#game').on('mousemove', function() {
  var location = d3.mouse(this);
  playerSettings.x = Math.min(Math.max(0,location[0]),settings.width-playerSettings.width);
  playerSettings.y = Math.min(Math.max(0,location[1]),settings.height-playerSettings.height);
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
  // push new laser shot to array
  lasers.playerLasers.push(1);

  // bind laser shot array data to .laser class elements
  // animate across screen
  d3.select('#gameScreen').selectAll('.laser')
    .data(lasers.playerLasers).enter().append('svg:rect')
    .classed('laser', true)
    .style({ fill: 'green' })
    .attr('width', addPx(playerSettings.laserWidth))
    .attr('height', addPx(playerSettings.laserHeight))
    .attr('x', playerSettings.x + playerSettings.width/2)
    .attr('y', playerSettings.y - playerSettings.height/2)
    .transition().ease('linear').duration(1000)
    .attr('y', 0);
};

// Loop enemy motion
// Loop updating score

// update game based on events
function update() {

  // check laser positions and clean up lasers that reach end of screen
  d3.selectAll('.laser').each( function() {
    var laser = d3.select(this);
    if (laser.attr('y') < 1) {
      lasers.playerLasers.shift();
      d3.selectAll('.laser').data(lasers.playerLasers).exit().remove();
    }
  });
};

// Loop checking for game events
d3.timer(update);


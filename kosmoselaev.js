// Game settings
var settings = {
  width: 800,
  height: 600,
  backgroundColor: '#D6D6D6'
};

// Player
var playerSettings = {
    left: settings.width/2,
    top: settings.height-20,
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

$('#gameScreen').css(
  { position: 'absolute',
    display: 'block',
    'min-height': settings.height,
    'min-width': settings.width,
    'background-color': settings.backgroundColor
  }
);

// initialize the player
$('#gameScreen').append('<div id="player"></div>');
var player = $('#player');
player.css(
  { position: 'relative',
    top: playerSettings.top,
    left: playerSettings.left,
    height: playerSettings.height,
    width: playerSettings.width,
    'background-color': 'black'
  }
);

// hide the standard mouse cursor
$('body').css('cursor', 'none');


// move player relative to mouse
$('#gameScreen').on('mousemove', function(event) {
  playerSettings.left = Math.min(Math.max(0,event.pageX),settings.width-playerSettings.width);
  playerSettings.top = Math.min(Math.max(0,event.pageY),settings.height-playerSettings.height);
  $('#player').css(
    { top: playerSettings.top,
      left: playerSettings.left
    }
  );
});


// handle keyboard events for the player
$('body').on('keydown', function(event) {
    event.stopPropagation();
    var key = event.which;
    if (key === 32) {
        // fire weapon
        fireWeapon();
    } 

});

var fireWeapon = function() {
  // push new laser shot to array
  lasers.playerLasers.push(1);

  // bind laser shot array data to .laser class elements
  // animate across screen
  $('#gameScreen').append('<div class="laser"></div>');
  var laser = $(".laser:last");
  laser.css(
    {
      position: 'absolute',
      top: playerSettings.top - playerSettings.laserHeight,
      left: playerSettings.left + Math.floor(playerSettings.width/2) - Math.floor(playerSettings.laserWidth/2),
      height: playerSettings.laserHeight,
      width: playerSettings.laserWidth,
      'background-color': 'green'
    });
};

// Loop enemy motion
// Loop updating score

/*
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
*/

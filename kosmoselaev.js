// Game settings
var settings = {
  width: 800,
  height: 600,
  backgroundColor: '#D6D6D6',
  speed: 25
};

// Player
var playerSettings = {
    left: settings.width/2,
    top: settings.height-20,
    width: 20,
    height: 20,
    moveIncrement: 20,
    laserWidth: 5,
    laserHeight: 10,
    laserMoveIncrement: 40
};

// Lasers
var Laser = function(top, left) {
  this._id = ++lasers.playerLaserID;
  this.top = top;
  this.left = left;
}

var lasers = {
  playerLaserID: 0,
  playerLasers: []
};

// utility function to check if laser exists in lasers.playerLasers
var getLaserIndex = function(laser) {
  for (var i = 0; i < lasers.playerLasers.length; i++) {
    if (lasers.playerLasers[i]._id === laser._id) {
      return i;
    }
  }

  return -1;
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
  lasers.playerLasers.push(new Laser(playerSettings.top - playerSettings.laserHeight, playerSettings.left + Math.floor(playerSettings.width/2) - Math.floor(playerSettings.laserWidth/2)));

  // bind laser shot array data to .laser class elements
  $('#gameScreen').append('<div id="'+lasers.playerLasers[lasers.playerLasers.length-1]._id+'"" class="laser"></div>');
  var laser = $(".laser:last");
  laser.css(
    {
      position: 'absolute',
      top: lasers.playerLasers[lasers.playerLasers.length-1].top,
      left: lasers.playerLasers[lasers.playerLasers.length-1].left,
      height: playerSettings.laserHeight,
      width: playerSettings.laserWidth,
      'background-color': 'green'
    });
};

// Loop enemy motion
// Loop updating score


// update game based on events
function update() {

  // update laser positions and render
  _.each(lasers.playerLasers, function(laser) {
    if (laser && laser.top < playerSettings.laserMoveIncrement) {
      lasers.playerLasers.splice(getLaserIndex(laser), 1);
      $('.laser#'+laser._id).remove();
      
    }
    else if (laser) {
      laser.top -= playerSettings.laserMoveIncrement;
      $('.laser#'+laser._id).animate({
        top: laser.top
        }, settings.speed);
    }
  });

};

// Loop checking for game events
setTimeout(function () {
  update();
  setTimeout(arguments.callee, settings.speed);
}, settings.speed);


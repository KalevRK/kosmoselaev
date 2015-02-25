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

// Enemies
var enemySettings = {
  top: 20,
  width: 20,
  height: 20,
  moveIncrement: 10
};

var Enemy = function(top, left) {
  this._id = ++enemies.enemyID;
  this.top = top;
  this.left = left;
};

var enemies = {
  enemyID: 0,
  enemyCounter: 0,
  activeEnemies: []
};

// utility function to check if enemy exists in enemies
var getEnemyIndex = function(enemy) {
  for (var i = 0; i < enemies.activeEnemies.length; i++) {
    if (enemies.activeEnemies[i]._id === enemy._id) {
      return i;
    }
  }

  return -1;
};

// 


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


// update laser positions and render
var updateLasers = function() {
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

// add new enemy to game
var addNewEnemy = function() {
  var enemyLeft = Math.random() * (settings.width - enemySettings.width);
  enemies.activeEnemies.push(new Enemy(enemySettings.top, enemyLeft));

  $('#gameScreen').append('<div id="'+enemies.activeEnemies[enemies.activeEnemies.length-1]._id+'"" class="enemy"></div>');
  var enemy = $(".enemy:last");
  enemy.css(
    {
      position: 'absolute',
      top: enemies.activeEnemies[enemies.activeEnemies.length-1].top,
      left: enemies.activeEnemies[enemies.activeEnemies.length-1].left,
      height: enemySettings.height,
      width: enemySettings.width,
      'background-color': 'brown'
    }
  );
};

// update enemy positions and render
var updateEnemies = function() {
  // check whether an enemy has reached the bottom of the game screen
  // if so then remove from the array of active enemies
  _.each(enemies.activeEnemies, function(enemy) {
    if (enemy && enemy.top > (settings.height - enemySettings.height)) {
      enemies.activeEnemies.splice(getEnemyIndex(enemy), 1);
      $('.enemy#'+enemy._id).remove();
    } else if (enemy) {
      // if enemy has not reached the bottom of the screen then
      // update their position and re-render them
      
      // move the enemy down the game screen
      enemy.top += enemySettings.moveIncrement;
      
      // compare the enemy's left position to the player's left position
      // and move the enemy closer to the player
      if ((enemy.left+'px') > $('#player').css("left")) {
        enemy.left -= enemySettings.moveIncrement;
      } else {
        enemy.left += enemySettings.moveIncrement;
      }

      $('.enemy#'+enemy._id).animate({
        top: enemy.top,
        left: enemy.left
      }, settings.speed);
    }
  });
};

// Loop updating score


// update game based on events
function update() {

  // check for player and enemy collisions
  // check for player laser and enemy collisions

  // update laser positions and render
  updateLasers();

  // update enemy positions and render
  updateEnemies();

  // add new enemy to game if counter === 40
  if (enemies.enemyCounter === 40) {
    // add new enemy at top of screen at random left value
    addNewEnemy();

    // reset enemy counter
    enemies.enemyCounter = 0;
  } else {
    enemies.enemyCounter++;
  }

};

// Loop checking for game events
setTimeout(function () {
  update();
  setTimeout(arguments.callee, settings.speed);
}, settings.speed);


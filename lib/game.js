(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.palette = new Asteroids.Palette();
    this.setColors();
    this.stars = [];
    this.addStars();
    this.ship = new Asteroids.Ship([450,300], [0,0], Game.SHIP_COLOR, this);
    this.shipDestroyed = false;
    this.bullets = [];
    this.asteroids = [];
    this.addAsteroids();
    this.points = 0;
    this.restartable = false;
  };

  Game.ASTEROID_COLOR = '';
  Game.SHIP_COLOR = '';
  Game.STAR_COLOR = '';
  Game.BULLET_COLOR = '';

  Game.DIFFICULTY = 1;
  Game.DIM_X = 900;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 5;
  Game.NUM_STARS = 30;


  Game.prototype.setColors = function() {
    document.getElementById('game-canvas').style.background = this.palette.colors[0];
    Game.ASTEROID_COLOR = this.palette.colors[1];
    Game.SHIP_COLOR = this.palette.colors[2];
    Game.STAR_COLOR = this.palette.colors[3];
    Game.BULLET_COLOR = this.palette.colors[4];
    if (this.ship) {
      var pos = this.ship.pos;
      var vel = this.ship.vel;
      this.ship = new Asteroids.Ship(pos, vel, Game.SHIP_COLOR, this);
    }
  };

  Game.prototype.addAsteroids = function () {
    var num = Game.NUM_ASTEROIDS + (5*Game.DIFFICULTY);
    while (num > 0) {
      var pos = this.randomPosition();
      var range = 275 - (25*Game.DIFFICULTY);
      if (range < 150) {
        range = 150;
      }
      if (Asteroids.Util.distance(pos, this.ship.pos) < range) {
        continue;
      }
      this.asteroids.push(new Asteroids.Asteroid(pos, Game.ASTEROID_COLOR, this, Game.DIFFICULTY));
      num--;
    };
  };

  Game.prototype.addStars = function () {
    var num = Game.NUM_STARS;
    while (num > 0) {
      var pos = this.randomPosition();
      this.stars.push(new Asteroids.Star(pos, Game.STAR_COLOR, this));
      num--;
    };
  };

  Game.prototype.addBullet = function (pos, vel) {
    this.bullets.push(new Asteroids.Bullet(pos, Game.BULLET_COLOR, vel, this));
  };

  Game.prototype.randomPosition = function () {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    };
    var randX = getRandomArbitrary(0, Game.DIM_X);
    var randY = getRandomArbitrary(0, Game.DIM_Y);

    var pos = [randX, randY];
    return pos;
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    this.stars.forEach( function (star) {
      star.draw(ctx);
    });
    this.asteroids.forEach(function (asteroid){
      asteroid.draw(ctx);
    });
    if (!this.shipDestroyed) {
      if (Asteroids.upPressed()) {
        this.ship.thrust();
      }
      if (Asteroids.leftPressed()) {
        this.ship.rotate(0.1);
      }
      if (Asteroids.rightPressed()) {
        this.ship.rotate(-0.1);
      }
      this.ship.draw(ctx);
    } else {
      this.gameOver();
    }
    this.bullets.forEach( function (bullet) {
      bullet.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function(){
    this.stars.forEach( function (star) {
      star.move();
    });
    this.asteroids.forEach(function (asteroid){
      asteroid.move();
    });
    if (!this.shipDestroyed) {
      this.ship.move();
    }
    this.bullets.forEach( function (bullet) {
      bullet.move();
    });
  };

  Game.prototype.wrap = function(pos, rad) {
    var xPos = pos[0];
    var yPos = pos[1];

    function _wrap(coord, bounds) {
      if (coord + rad <= 0) {
        return bounds + rad;
      } else if (coord - rad >= bounds) {
        return 0 - rad;
      } else {
        return coord;
      };
    };

    xPos = _wrap(xPos, Game.DIM_X);
    yPos = _wrap(yPos, Game.DIM_Y);

    return [xPos, yPos];

    };

  Game.prototype.isOutOfBounds = function(pos, rad) {
    if (pos[0] < 0 || pos[1] < 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y) {
      return true;
    }
    return false;
  };

  Game.prototype.checkCollisions = function() {
    var game = this;

    for (var i = 0; i < game.asteroids.length; i++) {
      if (game.ship.isCollidedWith(game.asteroids[i])) {
        game.shipDestroyed = true;
      }

      for (var j = 0; j < game.bullets.length; j++) {
        if (game.asteroids[i].isCollidedWith(game.bullets[j])) {
          game.remove(game.asteroids[i]);
          game.remove(game.bullets[j]);
          game.points += 10;
        }
      }


    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      for (var i = 0; i < this.asteroids.length; i++) {
        if (object === this.asteroids[i]) {
          this.asteroids.splice(i,1);
          this.checkAsteroids();
        };
      };
    }

    if (object instanceof Asteroids.Bullet) {
      for (var i = 0; i < this.bullets.length; i++) {
        if (object === this.bullets[i]) {
          this.bullets.splice(i,1);
        };
      };
    }

  };

  Game.prototype.checkAsteroids = function () {
    if (this.asteroids.length === 0 && !this.shipDestroyed) {
      Game.DIFFICULTY += 1;
      this.palette.refresh();
      this.setColors();
      this.stars.forEach( function (star) {
        star.color = Game.STAR_COLOR;
      });
      this.ship = new Asteroids.Ship([450,300], [0,0], Game.SHIP_COLOR, this);
      setTimeout(function() { this.addAsteroids(); }.bind(this), 2000);
    }

  };

  Game.prototype.gameOver = function () {
    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = this.ship.color;
    ctx.font="30px Impact";
    ctx.fillText('GAME OVER', 375, 275);
    ctx.fillText('press "r" to restart', 330, 325);
    this.restartable = true;
  };

  Game.prototype.restart = function () {
    this.restartable = false;
    Game.DIFFICULTY = 1;
    this.palette.refresh();
    this.setColors();
    this.stars = [];
    this.addStars();
    this.ship = new Asteroids.Ship([450,300], [0,0], Game.SHIP_COLOR, this);
    this.shipDestroyed = false;
    this.bullets = [];
    this.asteroids = [];
    this.addAsteroids();
    this.points = 0;
  };


})();

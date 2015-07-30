(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
    this.stars = [];
    this.addStars();
    this.ship = new Asteroids.Ship(this);
    this.shipDestroyed = false;
    this.bullets = [];
    this.points = 0;
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 10;
  Game.NUM_STARS = 30;

  Game.prototype.addAsteroids = function () {
    var num = Game.NUM_ASTEROIDS;
    while (num > 0) {
      var pos = this.randomPosition();
      if (Asteroids.Util.distance(pos, [300,300]) < 250) {
        continue;
      }
      this.asteroids.push(new Asteroids.Asteroid(pos, this));
      num--;
    };
  };

  Game.prototype.addStars = function () {
    var num = Game.NUM_STARS;
    while (num > 0) {
      var pos = this.randomPosition();
      this.stars.push(new Asteroids.Star(pos, this));
      num--;
    };
  };

  Game.prototype.addBullet = function (pos, vel) {
    this.bullets.push(new Asteroids.Bullet(pos, vel, this));
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
      this.ship.draw(ctx);
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

    function _wrap(coord) {
      if (coord + rad <= 0) {
        return Game.DIM_X + rad;
      } else if (coord - rad >= Game.DIM_X) {
        return 0 - rad;
      } else {
        return coord;
      };
    };

    xPos = _wrap(xPos);
    yPos = _wrap(yPos);

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

    if (object instanceof Asteroids.Ship) {
      this.ship
    }


  };

  Game.prototype.allObjects = function(){
    var all = [];
    all = all.concat(this.asteroids);
    all.push(this.ship);
    return all;
  };

})();

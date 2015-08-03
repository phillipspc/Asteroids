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
    this.subAsteroids = [];
    this.points = 0;
    this.restartable = false;
    this.lives = 3;
    this.nextLife = 5000;
  };

  Game.ASTEROID_COLOR = '';
  Game.SHIP_COLOR = '';
  Game.STAR_COLOR = '';
  Game.BULLET_COLOR = '';

  Game.DIFFICULTY = 1;
  Game.DIM_X = 900;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 7;
  Game.NUM_STARS = 30;


  Game.prototype.setColors = function() {
    document.getElementById('game-canvas').style.background = this.palette.colors[0];
    Game.ASTEROID_COLOR = this.palette.colors[1];
    Game.SHIP_COLOR = this.palette.colors[2];
    Game.STAR_COLOR = this.palette.colors[3];
    Game.BULLET_COLOR = this.palette.colors[4];
  };

  Game.prototype.updatePoints = function () {
    $('#points').html(this.points);
    if (this.points >= this.nextLife) {
      this.lives += 1;
      this.nextLife *= 2;
      this.updateLives();
      this.updateNextLife();
    }
  };

  Game.prototype.updateLives = function () {
    $('#lives').html(this.lives);
  };

  Game.prototype.updateLevel = function () {
    $('#level').html(Game.DIFFICULTY);
  };

  Game.prototype.updateNextLife = function () {
    $('#next-life').html(this.nextLife);
  };

  Game.prototype.addAsteroids = function () {
    var num = Game.NUM_ASTEROIDS + (3*Game.DIFFICULTY);
    while (num > 0) {
      var pos = this.randomPosition();
      var range = 275 - (25*Game.DIFFICULTY);
      if (range < 175) {
        range = 175;
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
    }
    if (this.shipDestroyed) {
      if (this.lives === 0) {
        this.gameOver();
      }
    }

    this.allObjects().forEach( function (item) {
      item.draw(ctx);
    })
  };

  Game.prototype.moveObjects = function(){
    this.allObjects().forEach( function (item) {
      item.move(ctx);
    })
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
    var allAsteroids = this.allAsteroids();

    if (!this.shipDestroyed) {
      for (var i = 0; i < this.allAsteroids().length; i++) {
        if (this.ship.isCollidedWith(allAsteroids[i])) {
          this.shipDestroyed = true;
          if (this.lives > 1) {
            this.lives -= 1;
            this.updateLives();
            this.death();
          } else {
            this.lives -= 1;
            this.updateLives();
            this.gameOver();
          }

        }
      }
    }

    for (var j = 0; j < this.bullets.length; j++) {
      for (var i = 0; i < this.asteroids.length; i++) {
        if (this.asteroids[i].isCollidedWith(this.bullets[j])) {
          this.points += 45 + (5*Game.DIFFICULTY);
          this.updatePoints();
          this.remove(this.bullets[j]);
          this.remove(this.asteroids[i]);
          break;
        }
      }

      if (!(this.subAsteroids.length === 0) &&
          !(this.bullets.length === 0)) {
        for (var i = 0; i < this.subAsteroids.length; i++) {
          if (this.subAsteroids[i].isCollidedWith(this.bullets[j])) {
            this.points += 45 + (5*Game.DIFFICULTY);
            this.updatePoints();
            this.remove(this.subAsteroids[i]);
            this.remove(this.bullets[j]);
            break;
          }
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
          this.asteroids[i].split();
          this.asteroids.splice(i,1);
        };
      };
    }

    if (object instanceof Asteroids.SubAsteroid) {
      for (var i = 0; i < this.subAsteroids.length; i++) {
        if (object === this.subAsteroids[i]) {
          this.subAsteroids.splice(i,1);
          this.checkLevelComplete();
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

  Game.prototype.checkLevelComplete = function () {
    if (this.allAsteroids().length === 0 && !this.shipDestroyed) {
      Game.DIFFICULTY += 1;
      this.palette.refresh();
      this.setColors();
      this.stars.forEach( function (star) {
        star.color = Game.STAR_COLOR;
      });
      this.ship = new Asteroids.Ship([450,300], [0,0], Game.SHIP_COLOR, this);
      setTimeout(function() { this.addAsteroids(); }.bind(this), 2000);
      this.updateLevel();
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
    this.subAsteroids = [];
    this.points = 0;
    this.lives = 3;
    this.updateLives();
    this.updateLevel();
    this.updatePoints();
  };

  Game.prototype.death = function () {
    this.ship = new Asteroids.Ship([450,300], [0,0], Game.SHIP_COLOR, this);
    this.shipDestroyed = false;
    this.bullets = [];
    this.asteroids = [];
    this.addAsteroids();
    this.subAsteroids = [];
  }

  Game.prototype.allObjects = function () {
    var all = [];
    [this.stars, this.asteroids, this.subAsteroids, this.bullets].forEach( function (collection) {
      collection.forEach( function (item) {
        all.push(item);
      });
    });
    if (!this.shipDestroyed) {
      all.push(this.ship);
    }
    return all;
  };

  Game.prototype.allAsteroids = function () {
    var allAsteroids = [];
    [this.asteroids, this.subAsteroids].forEach( function (collection) {
      collection.forEach( function (item) {
        allAsteroids.push(item);
      });
    });
    return allAsteroids;
  }

})();

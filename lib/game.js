(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
    this.stars = [];
    this.addStars();
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
  };

  Game.prototype.moveObjects = function(){
    this.stars.forEach( function (star) {
      star.move();
    });
    this.asteroids.forEach(function (asteroid){
      asteroid.move();
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

  Game.prototype.checkCollisions = function() {
    var game = this;
    for (var i = 0; i < game.asteroids.length; i++) {
      for (var j = 0; j < game.asteroids.length; j++) {
        if (i !== j && (game.asteroids[i].isCollidedWith(game.asteroids[j]))) {
          game.asteroids[i].collideWith(game.asteroids[j]);
        };
      };
    };
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (asteroid === this.asteroids[i]) {
        this.asteroids.splice(i,1);
      };
    };
  };

  Game.prototype.allObjects = function(){
    var all = [];
    all = all.concat(this.asteroids);
    all.push(this.ship);
    return all;
  };

})();

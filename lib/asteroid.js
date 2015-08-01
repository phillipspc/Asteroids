(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function(pos, color, game, difficulty) {
    this.pos = pos;
    this.color = color;
    this.game = game;
    this.difficulty = difficulty
    var vel = Asteroids.Util.randomVec(1.5 + (.5 * difficulty));
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel, color: color, radius: Asteroid.RADIUS, game: game });
  };

  Asteroid.COLOR = "#4281A4";
  Asteroid.RADIUS = 15;


  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.split = function () {
    var that = this;
    var _newSubAsteroid = function () {
    that.game.subAsteroids.push(
      new Asteroids.SubAsteroid(that.pos, that.color, that.game, that.difficulty));
    }
    _newSubAsteroid();
    _newSubAsteroid();
  };


})();

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function(pos, color, game, difficulty) {
    var vel = Asteroids.Util.randomVec(1.5 + (.5 * difficulty));
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel, color: color, radius: Asteroid.RADIUS, game: game });
  };

  Asteroid.COLOR = "#4281A4";
  Asteroid.RADIUS = 15;


  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();

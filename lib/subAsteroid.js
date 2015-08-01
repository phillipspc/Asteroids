(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var SubAsteroid = Asteroids.SubAsteroid = function(pos, color, game, difficulty) {
    var vel = Asteroids.Util.randomVec(1 + (.5 * difficulty));
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel, color: color, radius: SubAsteroid.RADIUS, game: game });
  };

  SubAsteroid.RADIUS = 7;


  Asteroids.Util.inherits(SubAsteroid, Asteroids.MovingObject);

})();

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (pos, color, vel, game) {
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel, color: color, radius: Bullet.RADIUS, game: game });
  };

  Bullet.RADIUS = 2;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

})();

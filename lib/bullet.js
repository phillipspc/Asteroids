(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (pos, vel, game) {
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel, color: Bullet.COLOR, radius: Bullet.RADIUS, game: game });
  };

  Bullet.COLOR = '#FFE066'
  Bullet.RADIUS = 2;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

})();

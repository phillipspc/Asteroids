(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(pos, vel, color, game) {
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel, color: color, radius: Ship.RADIUS, game: game });
  };

  Ship.RADIUS = 10;
  Ship.ACCEL = .5;


  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.facing = 0.0;

  Ship.prototype.facingVector = function () {
    return [-(Math.sin(this.facing)), -(Math.cos(this.facing))]
  };

  Ship.prototype.rotate = function (radians) {
    this.facing = (this.facing + radians) % (2 * Math.PI);
  };

  Ship.prototype.thrust = function () {
    var dir = this.facingVector();
    var newVel = [
      this.vel[0] + Ship.ACCEL * dir[0],
      this.vel[1] + Ship.ACCEL * dir[1]
    ]
    if (Asteroids.Util.distance([0,0], newVel) <= 7){
      this.vel = newVel;
    }
  };

  Ship.prototype.applyFriction = function() {
    this.vel[0] *= .99;
    this.vel[1] *= .99;
  };

  Ship.prototype.fireBullet = function () {
    if (this.game.shipDestroyed) {
      return;
    }
    var r = this.radius;
    var pos = [this.pos[0] + r * this.facingVector()[0],
               this.pos[1] + r * this.facingVector()[1]];
    var dir = this.facingVector();
    var vel = [dir[0]*10, dir[1]*10];

    this.game.addBullet(pos, vel)
  };
})();

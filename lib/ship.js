(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(pos, vel, color, game) {
    this.vel = vel;
    this.last_vel = [0,-1];
    this.pos = pos;
    this.game = game;
    Asteroids.MovingObject.call(this, {pos: this.pos, vel: this.vel, color: color, radius: Ship.RADIUS, game: game });
  };

  Ship.COLOR = "#E71D36";
  Ship.RADIUS = 5;


  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    var initial_vel = this.vel;
    var new_vel = [(this.vel[0] + impulse[0]), (this.vel[1] + impulse[1])];

    if (Asteroids.Util.distance([0,0], new_vel) < 7 ) {
      this.vel = new_vel;
    }
    if (new_vel[0] === 0 && new_vel[1] === 0) {
      this.last_vel = initial_vel;
    }
  };

  Ship.prototype.command = function (direction) {
    var impulse = [];
    if (direction === 'up') {
      impulse = [0,-2];
    } else if (direction === 'down') {
      impulse = [0, 2];
    } else if (direction === 'left') {
      impulse = [-2, 0];
    } else if (direction === 'right') {
      impulse = [2, 0];
    }
    this.power(impulse);
  };

  Ship.prototype.fireBullet = function () {
    if (this.game.shipDestroyed) {
      return;
    }
    var pos = this.pos;
    if (!(this.vel[0] === 0 && this.vel[1] === 0)) {
      var dir = Asteroids.Util.direction(this.vel);
    } else {
      var dir = Asteroids.Util.direction(this.last_vel);
    }
    var vel = [dir[0]*10, dir[1]*10];

    this.game.addBullet(pos, vel)
  };
})();

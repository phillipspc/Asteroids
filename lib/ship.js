(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(game) {
    this.vel = [0,0];
    this.pos = [300,300];
    this.game = game;
    Asteroids.MovingObject.call(this, {pos: this.pos, vel: this.vel, color: Ship.COLOR, radius: Ship.RADIUS, game: game });
  };

  Ship.COLOR = "#E71D36";
  Ship.RADIUS = 5;


  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    var new_vel = [(this.vel[0] + impulse[0]), (this.vel[1] + impulse[1])];

    if (Asteroids.Util.distance([0,0], new_vel) < 7 ) {
      this.vel = new_vel;
    }
  };

  Ship.prototype.command = function (direction) {
    var impulse = [];
    if (direction === 'up') {
      impulse = [0,-3];
    } else if (direction === 'down') {
      impulse = [0, 3];
    } else if (direction === 'left') {
      impulse = [-3, 0];
    } else if (direction === 'right') {
      impulse = [3, 0];
    }
    this.power(impulse);
  };

  Ship.prototype.fireBullet = function () {
    var pos = this.pos;
    var dir = Asteroids.Util.direction(this.vel);
    var vel = [dir[0]*10, dir[1]*10];

    this.game.addBullet(pos, vel)
  };
})();

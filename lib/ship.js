(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(game) {
    this.vel = [0,0]
    this.pos = [300,300]
    Asteroids.MovingObject.call(this, {pos: this.pos, vel: this.vel, color: Ship.COLOR, radius: Ship.RADIUS, game: game });
  };

  Ship.COLOR = "#E71D36";
  Ship.RADIUS = 5;


  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.vel = [(this.vel[0] + impulse[0]), (this.vel[1] + impulse[1])];
  };

  Ship.prototype.command = function (direction) {
    var impulse = [];
    if (direction === 'up') {
      impulse = [0,-1];
    } else if (direction === 'down') {
      impulse = [0, 1];
    } else if (direction === 'left') {
      impulse = [-1, 0];
    } else if (direction === 'right') {
      impulse = [1, 0];
    }
    this.power(impulse);
  };
})();

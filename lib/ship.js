(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function() {
    var vel = [0,0]
    var pos = this.randomPosition();
    Asteroids.MovingObject.call(this, {pos: pos, vel: vel, color: Ship.COLOR, radius: Ship.RADIUS });
  };

  Ship.COLOR = "#0000ff";
  Ship.RADIUS = 5;


  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = Asteroids.game.randomPosition();
  };

  Ship.prototype.randomPosition = function () {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    };
    var randX = getRandomArbitrary(0, 600);
    var randY = getRandomArbitrary(0, 600);

    var pos = [randX, randY];
    return pos;
  };

})();

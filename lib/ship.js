(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function() {
    Asteroids.MovingObject.call(this, {pos: [300,300], vel: [0,0], color: Ship.COLOR, radius: Ship.RADIUS });
  };

  Ship.COLOR = "#E71D36";
  Ship.RADIUS = 5;


  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  // Ship.prototype.relocate = function () {
  //   this.pos = Asteroids.game.randomPosition();
  // };
  //
  // Ship.prototype.randomPosition = function () {
  //   function getRandomArbitrary(min, max) {
  //     return Math.random() * (max - min) + min;
  //   };
  //   var randX = getRandomArbitrary(0, 600);
  //   var randY = getRandomArbitrary(0, 600);
  //
  //   var pos = [randX, randY];
  //   return pos;
  // };

})();

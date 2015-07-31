(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var dir = Asteroids.Util.randomVec(1);
  var sizes = ['small', 'med', 'large'];

  var Star = Asteroids.Star = function(pos, color, game) {
    var rand = sizes[Math.floor(Math.random() * sizes.length)];

    if (rand === 'small') {
      vel = [dir[0]*.25, dir[1]*.25];
      rad = 1;
    } else if (rand === 'med') {
      vel = [dir[0]*.5, dir[1]*.5];
      rad = 2;
    } else {
      vel = [dir[0]*.75, dir[1]*.75];
      rad = 3;
    }

    Asteroids.MovingObject.call(this, {pos: pos, vel: vel, color: color, radius: rad, game: game });
  };

  Star.COLOR = "#FDFFFC";


  Asteroids.Util.inherits(Star, Asteroids.MovingObject);

})();

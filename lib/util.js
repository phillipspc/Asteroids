(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {
  };

  Util.inherits = function (ChildClass, ParentClass) {
    var obj = ChildClass;
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;

    obj.prototype = new Surrogate();
  };

  Util.randomVec = function(length) {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    var x = getRandomArbitrary(-length, length);

    var y = Math.sqrt(Math.pow(length, 2) - Math.pow(x,2))

    if (Math.random() > .5) {
      y = -y;
    } else {
      y = y;
    };

    return [x,y]
  };

  Util.distance = function(pos1, pos2) {
    var a = pos1[0] - pos2[0];
    var b = pos1[1] - pos2[1];

    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  };

  Util.direction = function(vel) {
    var pos = [vel[0], vel[1]];
    var length = this.distance([0,0], pos);
    return [vel[0]/length, vel[1]/length];
  };

})();

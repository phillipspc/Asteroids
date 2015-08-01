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

  // generates random Vector with the given length
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

  // calculates distance between to points
  Util.distance = function(pos1, pos2) {
    var a = pos1[0] - pos2[0];
    var b = pos1[1] - pos2[1];

    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  };

  // returns direction (normalized vector) of given vector
  Util.direction = function(vector) {
    var pos = [vector[0], vector[1]];
    var length = this.distance([0,0], pos);
    return [vector[0]/length, vector[1]/length];
  };

})();

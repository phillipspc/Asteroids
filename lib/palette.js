(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Palette = Asteroids.Palette = function () {
    this.colors = ['#011627','#4281A4','#E71D36','#FDFFFC','#FFE066'];
  };

  Palette.prototype.refresh = function () {
    var palettes = [['#433a3f','#3d5a6c','#EEEBD0','#c6d4ff','#E5A5CB']]

    this.colors = palettes[Math.floor(Math.random()*palettes.length)];
  };

})();

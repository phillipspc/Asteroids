(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Palette = Asteroids.Palette = function () {
    this.colors = ['#011627','#4281A4','#E71D36','#FDFFFC','#FFE066'];
  };

  Palette.prototype.refresh = function () {
    var palettes = [
      ['#433a3f','#3d5a6c','#EEEBD0','#c6d4ff','#E5A5CB'],
      ['#272635','#bf4e30','#ffffff','#00a8e8','#007ea7'],
      ['#247ba0','#FFD275','#f25f5c','#65524D','#70c1b3'],
      ['#ffffff','#00171f','#ee6c4d','#3d5a80','#13293d'],
      ['#011627','#4281A4','#E71D36','#FDFFFC','#FFE066']
    ]

    this.colors = palettes[Math.floor(Math.random()*palettes.length)];
  };

})();

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Palette = Asteroids.Palette = function () {
    this.colors = ['#50514f','#f25f5c','#ffe066','#247ba0','#70c1b3'];
  };

  Palette.prototype.refresh = function () {
    var palettes = [
      ['#011627','#fdfffc','#2ec4b6','#e71d36','#ff9f1c'],
      ['#1be7ff','#6eeb83','#e4ff1a','#e8aa14','#ff5714'],
      ['#06aed5','#086788','#f0c808','#fff1d0','#dd1c1a']
    ]

    this.colors = palettes[Math.floor(Math.random()*palettes.length)];
  };

})();

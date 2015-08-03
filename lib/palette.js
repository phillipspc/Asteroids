(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Palette = Asteroids.Palette = function () {
    this.colors = [];
    this.current = 0;
    this.palettes = [
      ['#011627','#4281A4','#E71D36','#FDFFFC','#FFE066'],
      ['#ffffff','#00171f','#ee6c4d','#3d5a80','#13293d'],
      ['#433a3f','#3d5a6c','#EEEBD0','#c6d4ff','#E5A5CB'],
      ['#272635','#bf4e30','#ffffff','#00a8e8','#007ea7'],
      ['#247ba0','#FFD275','#f25f5c','#65524D','#70c1b3']
    ]
    this.grab(this.current);
  };

  Palette.prototype.refresh = function () {
    // picks new palette at random, as long as not the same as current
    var next = Math.floor(Math.random()*this.palettes.length);
    if (next === this.current) {
      this.refresh();
    } else {
      this.grab(next);
      this.current = next;
    }
  };

  Palette.prototype.grab = function (num) {
    this.colors = this.palettes[num];
  }

})();

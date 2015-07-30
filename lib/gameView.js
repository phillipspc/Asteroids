(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

    var GameView = Asteroids.GameView = function (game, ctx) {
      this.game = game;
      this.ctx = ctx;
    };

    GameView.prototype.start = function () {
      var game = this.game
      var ctx = this.ctx
      setInterval(this.run.bind(this), 20);
      key('up', function() {
        game.ship.command('up');
        console.log('up');
      });
      key('down', function() {
        game.ship.command('down');
        console.log('down');
      });key('left', function() {
        game.ship.command('left');
        console.log('left');
      });key('right', function() {
        game.ship.command('right');
        console.log('right');
      });
    };

    GameView.prototype.run = function () {
        var ctx = this.ctx
        this.game.step();
        this.game.draw(ctx);
    };

  })();

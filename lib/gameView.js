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
      var that = this;
      setInterval(this.run.bind(this), 20);
      key('up', function() { game.ship.command('up'); });
      key('down', function() { game.ship.command('down'); });
      key('left', function() { game.ship.command('left'); });
      key('right', function() { game.ship.command('right'); });
      key('space', function() { game.ship.fireBullet(); });
      key('r', function() {
        if (game.restartable){
          game.restart();
        }
      });

    };


    GameView.prototype.run = function () {
        var ctx = this.ctx
        this.game.step();
        this.game.draw(ctx);
    };

  })();

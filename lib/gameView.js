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
      key('up', function () { game.ship.thrust(); });
      key('left', function () { game.ship.rotate(0.3); })
      key('right', function () { game.ship.rotate(-0.3); })
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

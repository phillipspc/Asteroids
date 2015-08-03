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
    };

    GameView.prototype.checkInputs = function () {
      var game = this.game;
      if (!game.shipDestroyed){
        if (key.isPressed(37)) {
          game.ship.rotate(0.1);
        }
        if (key.isPressed(39)) {
          game.ship.rotate(-0.1);
        }
        if (key.isPressed(38)) {
          game.ship.thrust();
        }
        if (key.isPressed('space') && !game.ship.firing) {
          game.ship.firing = true;
          game.ship.fireBullet();
          setTimeout(function() { game.ship.firing = false; }, 120);
        }
      }

      if (key.isPressed('r') && game.restartable) {
        game.restart();
      }
    }


    GameView.prototype.run = function () {
        var ctx = this.ctx
        this.game.draw(ctx);
        this.checkInputs();
        this.game.step();
    };

  })();

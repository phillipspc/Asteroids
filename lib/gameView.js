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
      key('space', function() { game.ship.fireBullet(); });
      key('r', function() {
        if (game.restartable){
          game.restart();
        }
      });

      window.Asteroids.leftPressed = function(){
      return key.isPressed(37)
      };
      window.Asteroids.rightPressed = function(){
        return key.isPressed(39)
      };
      window.Asteroids.upPressed = function(){
        return key.isPressed(38)
      };
    };


    GameView.prototype.run = function () {
        var ctx = this.ctx
        this.game.draw(ctx);
        this.game.step();
    };

  })();

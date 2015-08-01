(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var MovingObject = Asteroids.MovingObject = function(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

MovingObject.prototype.isWrappable = true;

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  var r = this.radius;


  if (this instanceof Asteroids.Ship){
    ctx.moveTo(
      this.pos[0] + r * this.facingVector()[0],
      this.pos[1] + r * this.facingVector()[1]);
    ctx.lineTo(
      this.pos[0] + r * Math.cos(this.facing - (0.7 * Math.PI)),
      this.pos[1] - r * Math.sin(this.facing - (0.7 * Math.PI)));
    ctx.lineTo(
      this.pos[0] - r * Math.cos(this.facing + (0.7 * Math.PI)),
      this.pos[1] + r * Math.sin(this.facing + (0.7 * Math.PI)));
    ctx.closePath();
  } else {
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
  }
    ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

  if (!this.isWrappable && this.game.isOutOfBounds(this.pos, this.radius)) {
    this.game.remove(this);
  } else {
    this.pos = this.game.wrap(this.pos, this.radius);
  }

  if (this instanceof Asteroids.Ship) {
    this.applyFriction();
  }
};

MovingObject.prototype.isCollidedWith = function(otherObject){
  var distance = Asteroids.Util.distance(this.pos, otherObject.pos);
  if (distance < (this.radius + otherObject.radius)){
    return true;
  } else {
    return false;
  };
};

})();

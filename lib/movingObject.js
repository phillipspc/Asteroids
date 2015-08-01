(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var MovingObject = Asteroids.MovingObject = function(args) {
  this.pos = args.pos;
  this.vel = args.vel;
  this.radius = args.radius;
  this.color = args.color;
  this.game = args.game;
};

MovingObject.prototype.isWrappable = true;

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  var r = this.radius;


  if (this instanceof Asteroids.Ship){
    //front of ship
    ctx.moveTo(
      this.pos[0] - r * this.facingVector()[0],
      this.pos[1] - r * this.facingVector()[1]);
    // bottom left corner
    ctx.lineTo(
      this.pos[0] + r * Math.cos(this.facing - (0.7 * Math.PI)),
      this.pos[1] - r * Math.sin(this.facing - (0.7 * Math.PI)));
    // bottom right corner
    ctx.lineTo(
      this.pos[0] - r * Math.cos(this.facing + (0.7 * Math.PI)),
      this.pos[1] + r * Math.sin(this.facing + (0.7 * Math.PI)));
    ctx.closePath();
    // ctx.lineTo(
    //   this.pos[0] - r * this.facingVector()[0],
    //   this.pos[1] - r * this.facingVector()[1]);
    // ctx.moveTo(this.pos[0] + r, this.pos[1]);
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
};

MovingObject.prototype.isCollidedWith = function(otherObject){
  var xDiff = this.pos[0] - otherObject.pos[0];
  var yDiff = this.pos[1] - otherObject.pos[1];
  var obj = this
  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (distance < (this.radius + otherObject.radius)){
    return true;
  } else {
    return false;
  };
};

MovingObject.prototype.collideWith = function(otherObject){

};

})();

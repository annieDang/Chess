'use strict'

var Knight = function(game, x, y, img , color){
   Piece.call(this, game, x, y, img, color);
}

Knight.prototype = Object.create(Phaser.Sprite.prototype);
Knight.prototype.constructor = Knight;

Knight.prototype.update = function() {

};
King.prototype.movable = function(){
  var x = sprite.customParams.x;
  var y = sprite.customParams.y;

  for (var i = 0; i<8; i++) {
    for (var j = 0; j<8; j++) {
      if (Math.abs(x-i)+Math.abs(y-j) === 3 && Math.abs(x-i) <= 2 && Math.abs(y-j) <= 2 && this.locationArray[i][j].substring(0, 5) !== sprite.customParams.color) {
        this.createNextStep(i, j)
      }
    }
  }
}

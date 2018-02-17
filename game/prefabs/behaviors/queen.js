'use strict'

var Queen = function(game, x, y, img , color){
   Piece.call(this, game, x, y, img, color);
}
                                 
Queen.prototype = Object.create(Phaser.Sprite.prototype);
Queen.prototype.constructor = Pawn;

Queen.prototype.update = function() {
  
};

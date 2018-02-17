'use strict'

var King = function(game, x, y, img , color){
   Piece.call(this, game, x, y, img, color);
}
                                 
King.prototype = Object.create(Phaser.Sprite.prototype);
King.prototype.constructor = King;

King.prototype.update = function() {
  
};

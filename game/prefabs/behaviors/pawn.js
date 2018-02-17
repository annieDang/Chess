'use strict'

var Pawn = function(game, x, y, img , color){
   Piece.call(this, game, x, y, img, color);
}
                                 
Pawn.prototype = Object.create(Phaser.Sprite.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.update = function() {
  
};

Pawn.prototype.move = function() {
  
};

Pawn.prototype.onKilled = function() {
 
};

Pawn.prototype.isFirstMove = function() {

};
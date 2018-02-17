'use strict'

var Bishop = function(game, x, y, img , color){
   Piece.call(this, game, x, y, img, color);
}
                                 
Bishop.prototype = Object.create(Phaser.Sprite.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.update = function() {
    
};
Bishop.prototype.move = function() {
  
};

Bishop.prototype.onKilled = function() {
 
};
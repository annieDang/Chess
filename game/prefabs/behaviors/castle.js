'use strict'

var Castle = function(game, x, y, img , color){
   Piece.call(this, game, x, y, img, color);
}

Castle.prototype = Object.create(Phaser.Sprite.prototype);
Castle.prototype.constructor = Castle;

Castle.prototype.guide = function() {
  for (var i = x+1; i<this.locationArray.length; i++) {
    if (this.locationArray[i][y] !== '0'){
      // Handle attack enemy
      break;
    }
    this.createNextStep(i, y);
  }
  for (var i = x-1; i>=0; i--) {
    if (this.locationArray[i][y] !== '0'){
      // Handle attack enemy
      break;
    }
    this.createNextStep(i, y);
  }

  for (var i = y+1; i<this.locationArray.length; i++) {
    if (this.locationArray[x][i] !== '0'){
      // Handle attack enemy
      break;
    }
    this.createNextStep(x, i);
  }
  for (var i = y-1; i>=0; i--) {
    if (this.locationArray[x][i] !== '0'){
      // Handle attack enemy
      break;
    }
    this.createNextStep(x, i);
  }
};

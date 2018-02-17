'use strict'

var SQUARE_LENGTH = 80;
var Piece = function(game, x, y, pieceName , color, board){
    // this.piece.customParams = {x: x, y: y, name: pieceName, color: color};
    this.posX = x;
    this.posY = y;
    this.pieceName = pieceName;
    this.color = color;
    this.board = board;
    this.create();
}

Piece.prototype = Object.create(Phaser.Sprite.prototype);
Piece.prototype.constructor = Piece;
Piece.prototype.create = function(){
  var pieceImg = this.color + ' ' + this.pieceName;
  this.piece = game.add.sprite(this.posX * SQUARE_LENGTH, this.posY * SQUARE_LENGTH, pieceImg);
  this.piece.inputEnabled = true;
  this.piece.events.onInputDown.add(this.selectPiece, this);
};

Piece.prototype.selectPiece = function(sprite, event) {
  // write your prefab's specific update code here
  this.board.selectedItem = sprite;
};
Piece.prototype.guide = function(x, y) {
  nextStep = this.game.add.sprite(x * SQUARE_LENGTH, y *SQUARE_LENGTH, 'nextStep');
  nextStep.customParams = {x: x, y: y};
  this.nextSteps.push(nextStep)
  this.locationArray[x][y] = 'nextStep'

};

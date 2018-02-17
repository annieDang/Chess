'use strict'

function Board (game){
    this.piecesList = {}
    this.game = game;
    this.selectedItem =  null;
    this.create();
}
Board.prototype.create = function(){
  // write your prefab's specific update code here
  for(var i = 0; i < 8; i++){
    this.piecesList[i] = this.piecesList[i]||[];
    for(var j = 0; j< 8; j++)
      this.piecesList[i][j] = {};
  }
};

Board.prototype.putPiece = function(sprite, event) {
  // write your prefab's specific update code here
  var x = Math.floor(event.position.x/80);
  var y = Math.floor(event.position.y/80);

  // check click in next step of selected piece
  if (this.selectedItem && this.piecesList[x][y] === 'nextStep') {
    var movement = this.game.add.tween(this.isSelected);
    movement.to({x: x * SQUARE_LENGTH, y: y * SQUARE_LENGTH}, 300);
    movement.start();

    // Change location of selected piece parametes and location array
    this.piecesList[this.isSelected.customParams.x][this.selectedItem.customParams.y] = '0';
    this.piecesList[x][y] = this.selectedItem.customParams.color + ' ' +this.selectedItem.customParams.name
    this.selectedItem.customParams.x = x;
    this.selectedItem.customParams.y = y;
  }

  this.clearNextStep();
};
Board.prototype.clearNextStep = function (sprite, event) {
  this.isSelected = null;

  // delete cycle images
  this.nextSteps.forEach(function(element, index) {
    element.destroy();
  });
  this.nextSteps = [];

  for (var i = 0; i<this.locationArray.length; i++) {
    for (var j = 0; j<this.locationArray.length; j++) {
      if (this.locationArray[i][j] === 'nextStep'){
        this.locationArray[i][j] = '0';
      }
    }
  }
}

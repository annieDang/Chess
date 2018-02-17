'use strict';

function Play() {}
Play.prototype = {

  //executed after everything is loaded
  create: function() {
    //Add board
    this.background = this.game.add.sprite(0, 0, 'board');
    this.background.inputEnabled = true;
    // selected chess piece
    this.board = new Board(game);
    this.background.events.onInputDown.add(this.board.putPiece, this);
    //there are chess piece setting;
    this.positions = JSON.parse(this.game.cache.getText('positions'));

    //draw pieces into board
    this.positions.pieces.forEach(function(element){
      for (var color in element) {
        var player = element[color];
        for (var index in player) {
          var pieces = player[index];
          for(var piece in pieces){
            var piecePos = pieces[piece];
            for(var k in piecePos){
              var pos = piecePos[k];
              this.board.piecesList[pos.x][pos.y] = new Piece(this.game, pos.x, pos.y, piece, color, this.board);
            }
          }
        }
      }
    }, this);


    this.board.isSelected = null;
    // store next steps
    this.nextSteps = [];
  },


  selectPiece: function(sprite, event) {
    // clear next step
    this.clearNextStep();

    this.isSelected = sprite;

    // create next steps of pawn
    if (sprite.customParams.name === 'pawn') {
      var x = sprite.customParams.x;
      var y = sprite.customParams.y;

      if (this.locationArray[x][y-1] === '0'){
        this.createNextStep(x, y-1);
        if (y === 6 && this.locationArray[x][y-2] === '0' ){
          this.createNextStep(x, y-2);
        }
      }

      // check attack enemy
      if (this.locationArray[x-1][y-1] !== '0' && this.locationArray[x-1][y-1].substring(0, 5) !== sprite.customParams.color){
        this.createNextStep(x-1, y-1);
      }
      if (this.locationArray[x+1][y-1] !== '0' && this.locationArray[x+1][y-1].substring(0, 5) !== sprite.customParams.color){
        this.createNextStep(x+1, y-1);
      }
    }

    // create next steps of knight
    if (sprite.customParams.name === 'knight') {
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

    // bishop
    if (sprite.customParams.name === 'bishop') {
      var x = sprite.customParams.x;
      var y = sprite.customParams.y;

      this.createNextStepOfBishop(x, y);
    }

    // Castle
    if (sprite.customParams.name === 'castle') {
      var x = sprite.customParams.x;
      var y = sprite.customParams.y;

      this.createNextStepOfCastle(x, y);
    }

    // Queen
    if (sprite.customParams.name === 'queen') {
      var x = sprite.customParams.x;
      var y = sprite.customParams.y;

      this.createNextStepOfBishop(x, y);
      this.createNextStepOfCastle(x, y);
    }

    // King
    if (sprite.customParams.name === 'king') {
      var x = sprite.customParams.x;
      var y = sprite.customParams.y;

      if (x-1 >= 0 && this.locationArray[x-1][y].substring(0, 5) !== sprite.customParams.color){
        this.createNextStep(x-1, y);
      }
      if (x+1 <= 7 && this.locationArray[x+1][y].substring(0, 5) !== sprite.customParams.color){
        this.createNextStep(x+1, y);
      }
      if (y-1 >= 0 && this.locationArray[x][y-1].substring(0, 5) !== sprite.customParams.color){
        this.createNextStep(x, y-1);
      }
      if (y-1 >= 0 && x-1 >= 0 && this.locationArray[x-1][y-1].substring(0, 5) !== sprite.customParams.color){
        this.createNextStep(x-1, y-1);
      }
      if (x+1 <=7 && y-1 >= 0 && this.locationArray[x+1][y-1].substring(0, 5) !== sprite.customParams.color){
        this.createNextStep(x+1, y-1);
      }
      if (x-1 >= 0 && y+1 <= 7 && this.locationArray[x-1][y+1].substring(0, 5) !== sprite.customParams.color){
        this.createNextStep(x-1, y+1);
      }
      if (y+1 <= 7 && this.locationArray[x][y+1].substring(0, 5) !== sprite.customParams.color){
        this.createNextStep(x, y+1);
      }
      if (x+1 <= 7 && y+1 <= 7 && this.locationArray[x+1][y+1].substring(0, 5) !== sprite.customParams.color){
        this.createNextStep(x+1, y+1);
      }

    }

  },

  createNextStepOfBishop: function(x, y) {
    for (var i = x+1; i<this.locationArray.length; i++) {
      if (this.locationArray[i][y-(i-x)] !== '0'){
        // Handle attack enemy
        break;
      }
      this.createNextStep(i, y-(i-x));
    }
    for (var i = x+1; i<this.locationArray.length; i++) {
      if (this.locationArray[i][y+(i-x)] !== '0'){
        // Handle attack enemy
        break;
      }
      this.createNextStep(i, y+(i-x));
    }

    for (var i = x-1; i>=0; i--) {
      if (this.locationArray[i][y-(x-i)] !== '0'){
        // Handle attack enemy
        break;
      }
      this.createNextStep(i, y-(x-i));
    }
    for (var i = x-1; i>=0; i--) {
      if (this.locationArray[i][y+(x-i)] !== '0'){
        // Handle attack enemy
        break;
      }
      this.createNextStep(i, y+(x-i));
    }
  },





  //executed multiple times per second
  update: function() {

  },

  gameOver: function() {
    this.state.start('home', true, false, 'GAME OVER!');
  }


};

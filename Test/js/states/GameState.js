//this game will have only 1 state
var GameState = {

  //executed after everything is loaded
  create: function() {
    this.background = this.game.add.sprite(0, 0, 'board');
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.placeItem,this);


    //there are chess piece setting;
    this.locationArray = [
      ['black castle','black pawn','0','0','0','0','white pawn','white castle'],
      ['black knight','black pawn','0','0','0','0','white pawn','white knight'],
      ['black bishop','black pawn','0','0','0','0','white pawn','white bishop'],
      ['black queen','black pawn','0','0','0','0','white pawn','white queen'],
      ['black king','black pawn','0','0','0','0','white pawn','white king'],
      ['black bishop','black pawn','0','0','0','0','white pawn','white bishop'],
      ['black knight','black pawn','0','0','0','0','white pawn','white knight'],
      ['black castle','black pawn','0','0','0','0','white pawn','white castle']
    ];

    for (var i = 0; i<this.locationArray.length; i++) {
      for (var j = 0; j<this.locationArray.length; j++) {
        // white
        if (this.locationArray[i][j] === 'white pawn'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'white pawn');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "pawn", color: "white"};
          this.pawn.events.onInputDown.add(this.selectPiece, this);
        }
        if (this.locationArray[i][j] === 'white knight'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'white knight');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "knight", color: "white"};
          this.pawn.events.onInputDown.add(this.selectPiece, this);
        }
        if (this.locationArray[i][j] === 'white bishop'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'white bishop');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "bishop", color: "white"};
          this.pawn.events.onInputDown.add(this.selectPiece, this);
        }
        if (this.locationArray[i][j] === 'white castle'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'white castle');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "castle", color: "white"};
          this.pawn.events.onInputDown.add(this.selectPiece, this);
        }
        if (this.locationArray[i][j] === 'white queen'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'white queen');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "queen", color: "white"};
          this.pawn.events.onInputDown.add(this.selectPiece, this);
        }
        if (this.locationArray[i][j] === 'white king'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'white king');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "king", color: "white"};
          this.pawn.events.onInputDown.add(this.selectPiece, this);
        }

        // black
        if (this.locationArray[i][j] === 'black pawn'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'black pawn');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "pawn", color: "black"};
        }
        if (this.locationArray[i][j] === 'black knight'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'black knight');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "knight", color: "black"};
        }
        if (this.locationArray[i][j] === 'black bishop'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'black bishop');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "bishop", color: "black"};
        }
        if (this.locationArray[i][j] === 'black castle'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'black castle');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "castle", color: "black"};
        }
        if (this.locationArray[i][j] === 'black queen'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'black queen');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "queen", color: "black"};
        }
        if (this.locationArray[i][j] === 'black king'){
          this.pawn = this.game.add.sprite(i*80, j*80, 'black king');
          this.pawn.inputEnabled = true;
          this.pawn.customParams = {x: i, y: j, name: "king", color: "black"};
        }
      }
    }

    // selected chess piece
    this.isSelected = null;

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

      for (var i = 0; i<this.locationArray.length; i++) {
        for (var j = 0; j<this.locationArray.length; j++) {
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

  // Castle
  createNextStepOfCastle: function(x, y) {
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
  },

  // create next step
  createNextStep: function(x, y) {
    nextStep = this.game.add.sprite(x*80, y*80, 'nextStep');
    nextStep.customParams = {x: x, y: y};
    this.nextSteps.push(nextStep)
    this.locationArray[x][y] = 'nextStep'
  },

  // delete next step cycles
  clearNextStep: function() {
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

  },

  // click in board
  placeItem: function(sprite, event) {
    var x = Math.floor(event.position.x/80);
    var y = Math.floor(event.position.y/80);

    // check click in next step of selected piece
    if (this.locationArray[x][y] === 'nextStep') {
      var movement = this.game.add.tween(this.isSelected);
      movement.to({x: x*80, y: y*80}, 300);
      movement.start();

      // Change location of selected piece parametes and location array
      this.locationArray[this.isSelected.customParams.x][this.isSelected.customParams.y] = '0';
      this.locationArray[x][y] = this.isSelected.customParams.color + ' ' +this.isSelected.customParams.name
      this.isSelected.customParams.x = x;
      this.isSelected.customParams.y = y;
    }

    this.clearNextStep();
  },



  //executed multiple times per second
  update: function() {

  },

  gameOver: function() {
    this.state.start('HomeState', true, false, 'GAME OVER!');
  }


};

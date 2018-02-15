var PreloadState = {
	//load the game assets before the game starts
  preload: function() {

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    // white chess pieces
    this.load.image('board', 'assets/images/board.jpg');
    this.load.image('white pawn', 'assets/images/white_pawn.png')
    this.load.image('white knight', 'assets/images/white_knight.png')
    this.load.image('white bishop', 'assets/images/white_bishop.png')
    this.load.image('white castle', 'assets/images/white_castle.png')
    this.load.image('white queen', 'assets/images/white_queen.png')
    this.load.image('white king', 'assets/images/white_king.png')

    // black chess pieces
    this.load.image('board', 'assets/images/board.jpg');
    this.load.image('black pawn', 'assets/images/black_pawn.png')
    this.load.image('black knight', 'assets/images/black_knight.png')
    this.load.image('black bishop', 'assets/images/black_bishop.png')
    this.load.image('black castle', 'assets/images/black_castle.png')
    this.load.image('black queen', 'assets/images/black_queen.png')
    this.load.image('black king', 'assets/images/black_king.png')

    this.load.image('nextStep', 'assets/images/nextStep.png')
  },
  create: function() {
    this.state.start('HomeState');
  }
};

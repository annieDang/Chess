'use strict';
var game = new Phaser.Game(640, 640, Phaser.AUTO);

game.state.add('play', new Play());
game.state.add('home', new MenuState());
game.state.add('preload', new Preload());
game.state.add('boot', new Boot());
game.state.start('boot');

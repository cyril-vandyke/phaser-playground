import RainbowText from 'objects/RainbowText';
import Player from 'objects/Player';
import Stage from 'objects/Stage';

class GameState extends Phaser.State {

	init() {
		this.player;
		this.stage;
		this.debugMode = false;
		this.cursors = this.game.input.keyboard.createCursorKeys();
	}

	preload() {
		this.load.atlasXML('spritesheet', 'assets/spritesheet_complete.png', 'assets/spritesheet_complete.xml');
		this.load.image('sky','assets/sky.png');
		this.load.image('ground', 'assets/platform.png');
    	this.load.image('star', 'assets/star.png');
    	this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	}

	create() {
		const gameHeight = 750;
		const gameWidth = 1000;
		const playerHeight = 64;


		//  We're going to be using physics, so enable the Arcade Physics system
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//  A simple background for our game
		var sky = this.game.add.sprite(0, 0, 'sky');
		sky.scale.setTo(1.3);
		
		this.player = new Player(this.game, {
			x: 300,
			y:0
		});

		this.stage = new Stage(this.game, {
			x:100,
			y:500
		});

		this.bindButtonEvents();
	}

	update() {
		const playerOnGround = this.game.physics.arcade.collide(this.player, this.stage);

		this.player._update(this.cursors, playerOnGround);
	}

	render(){
		if (this.debugMode) {
			this.game.debug.bodyInfo(this.player, 32, 32);
			this.game.debug.body(this.player);
		} else {
			this.game.debug.reset();
		}
	}
	bindButtonEvents(){
		document.getElementById("debug_button").onclick = () => {
			this.debugMode = !this.debugMode;
		}
	}
}

export default GameState;

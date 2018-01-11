import RainbowText from 'objects/RainbowText';
import Player from 'objects/Player';
import Stage from 'objects/Stage';

class GameState extends Phaser.State {

	init() {
		this.player;
		this.player2;
		this.stage;
		this.debugMode = false;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.wasd = {
			up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
		  };
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
		}, this.determinePlayerColor());

		this.player2 = new Player(this.game, {
			x: 700,
			y:0
		}, this.determinePlayerColor());

		this.p1text = this.game.add.text(0,0, "Player 1", { font: "12px Arial", fill: "#000",  align: "center" });
		this.p2text = this.game.add.text(0,0, "Player 2", { font: "12px Arial", fill: "#000",  align: "center" });
		this.p1text.anchor.set(0.5);
		this.p2text.anchor.set(0.5);

		this.stage = new Stage(this.game, {
			x:100,
			y:500
		});

		this.bindButtonEvents();
	}

	update() {
		const playerOnGround = this.game.physics.arcade.collide(this.player, this.stage);
		const player2OnGround = this.game.physics.arcade.collide(this.player2,this.stage);

		this.player._update(this.cursors, playerOnGround);
		this.p1text.x = this.player.x;
		this.p1text.y = this.player.y - 15;
		this.player2._update(this.wasd, player2OnGround);
		this.p2text.x = this.player2.x;
		this.p2text.y = this.player2.y - 15;
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
	determinePlayerColor(){
		var color;
		//randomly select a color for our little dude between Blue, Green, Pink, Yellow.
        switch(Math.floor(Math.random() * 4)){
            case 0:
				color = "alienBlue";
                break;
            case 1:
				color = "alienGreen";
                break;
            case 2:
				color = "alienYellow";
                break;
            case 3:
				color = "alienPink";
                break;
            default:
				color = "alienPink";
		};
		return color;
	}
}

export default GameState;

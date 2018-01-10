class Player extends Phaser.Sprite {

    constructor(game, position, color) {
        super(game, position.x, position.y, 'spritesheet', color + '_stand.png');
        
        this.playerColor = color;
        this.game.physics.arcade.enable(this);
        this.body.gravity.y = 400;
        this.body.collideWorldBounds = true;
        this.body.setSize(128, 128, 0, 128); // my assets are weirdly tall

        this.scale.setTo(0.5);
        this.anchor.setTo(0.5);

        this.animations.add('walk', [ this.playerColor + '_walk1.png', this.playerColor + '_walk2.png'], 6, true);
        
        this.game.stage.addChild(this);
    }
    
    _update(cursors, playerOnGround) {
        this.body.velocity.x = 0;
		if (cursors.left.isDown)
		{
			this.body.velocity.x = -300;
			this.animations.play('walk');
			this.scale.x = -0.5;
		}
		else if (cursors.right.isDown)
		{
			this.body.velocity.x = 300;
			this.animations.play('walk');
			this.scale.x = 0.5;
		}
		else
		{
			this.animations.stop();
			this.frameName = this.playerColor + '_stand.png';
		}
	
		if (cursors.up.isDown && this.body.touching.down && playerOnGround)
		{
			this.body.velocity.y = -500;
		}

		if (this.body.velocity.y !== 0) {
			this.animations.stop();
            this.frameName = this.playerColor + '_jump.png';
		}
    }
}

export default Player;
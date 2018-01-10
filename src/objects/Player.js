class Player extends Phaser.Sprite {

    constructor(game, position) {
        super(game, position.x, position.y, 'spritesheet', 'alienPink_stand.png');
        

        this.game.physics.arcade.enable(this);
        this.body.gravity.y = 400;
        this.body.collideWorldBounds = true;
        this.body.setSize(128, 128, 0, 128); // my assets are weirdly tall

        this.scale.setTo(0.5);
        this.anchor.setTo(0.5);

        this.animations.add('walk', ['alienPink_walk1.png','alienPink_walk2.png'], 6, true);
        
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
			this.frameName = 'alienPink_stand.png';
		}
	
		if (cursors.up.isDown && this.body.touching.down && playerOnGround)
		{
			this.body.velocity.y = -500;
		}

		if (this.body.velocity.y !== 0) {
			this.animations.stop();
			this.frameName = 'alienPink_jump.png';
		}
    }
}

export default Player;
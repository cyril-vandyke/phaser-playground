class Player extends Phaser.Sprite {

    constructor(game, position, color) {
        super(game, position.x, position.y, 'spritesheet', color + '_stand.png');
        
        this.playerColor = color;
        this.game.physics.arcade.enable(this);
        this.body.gravity.y = 800;
        this.body.collideWorldBounds = true;
        this.body.setSize(100, 128, 14, 128);

        this.scale.setTo(0.5);
        this.anchor.setTo(0.5);

        //Set some properties?
        this.hasDoubleJump = true;
        this.upPressed = false;
        
        this.animations.add('walk', [ this.playerColor + '_walk1.png', this.playerColor + '_walk2.png'], 6, true);
        
        this.game.stage.addChild(this);
    }
    
    _update(cursors, playerOnGround) {
        this.body.velocity.x = 0;
        if(playerOnGround && this.body.touching.down)
        {
            this.hasDoubleJump = true;
        }
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
        else if (cursors.down.isDown && playerOnGround)
        {
            this.animations.stop();
            this.frameName = this.playerColor + '_duck.png';
        }
		else
		{
			this.animations.stop();
			this.frameName = this.playerColor + '_stand.png';
		}
        
		if (cursors.up.isDown && !this.upPressed)
		{
            this.upPressed = true;
            if(playerOnGround)
            {
                this.body.velocity.y = -500;
            } 
            else if(!playerOnGround && this.hasDoubleJump)
            {
                this.body.velocity.y = -500;
                this.hasDoubleJump = false;
            }
        }
        if (!cursors.up.isDown && this.upPressed)
        {
            //If up isn't pressed, reset the flag
            this.upPressed = false;
        }

		if (this.body.velocity.y !== 0) {
			this.animations.stop();
            this.frameName = this.playerColor + '_jump.png';
		}
    }
}

export default Player;
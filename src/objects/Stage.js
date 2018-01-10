class Stage extends Phaser.Group {

    constructor(game,position)
    {
        super(game);
        const doorXAdjust = 400;
        this.enableBody = true;

        //Create bottom stage;
        for(var i = 0; i < 4; i++)
        {
            this.create(position.x + i*200, position.y, 'ground');
        }
        
        //Create platforms
        this.create(position.x + 100, position.y - 150, 'ground');
        this.create(position.x + 500, position.y - 150, 'ground');
        this.create(position.x + 300, position.y - 300, 'ground');
        this.forEach((stagePiece) => {
            stagePiece.scale.setTo(0.5);
            stagePiece.body.immovable = true;
        });
    }
}

export default Stage;
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)

        // add object to existing scene
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(100, 100)
        this.body.setCollideWorldBounds(true)

        this.moveSpeed = 2

    }

    create() {

        this.anims.create({
            key: 'larry_run',
            frames: [
                { key: 'larryIdle' },
                { key: 'larryRun1' },
                { key: 'larryRun2' },
            ],//pp
            frameRate: 2, 
            repeat: -1
        })
    }

    update() {

        
        //l/r movement

        if(keyLEFT.isDown) {
            this.x -= this.moveSpeed
        } else if(keyRIGHT.isDown) {
            this.x += this.moveSpeed
        }
    }

    reset() {
        this.y = game.config.height - borderUISize - borderPadding
    }
}
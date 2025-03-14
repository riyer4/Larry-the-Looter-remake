class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)

        // add object to existing scene
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(130, 120)
        this.body.setCollideWorldBounds(true)

        this.moveSpeed = 6

    }

    create() {


    }

    update() {

        
    }

    reset() {
        this.y = game.config.height - borderUISize - borderPadding
    }
}
class Loot extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)
        this.points = pointValue


    }

    update() {

    }

    reset() {
        
    }
}
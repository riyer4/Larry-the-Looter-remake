class Play extends Phaser.Scene {
    constructor () {
        super("playScene")

    }

    create() {

        this.level1 = this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(5)

        this.cameras.main.setBackgroundColor(0x000000)

    
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.player = new Player(this, 0, 330, 'larryIdle', 0).setOrigin(0, 0)

        //this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)

         //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
         //this.cameras.main.startFollow(this.player, true, 0.25, 0.25)

         //this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
 
 

    }

    update() {

        this.player.update()


    }

    // checkCollision(rocket, ship) {

    //     //simple AABB (?) checking

    //     if (rocket.x < ship.x + ship.width && 
    //         rocket.x + rocket.width > ship.x && 
    //         rocket.y < ship.y + ship.height && 
    //         rocket.height + rocket.y > ship.y) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
}
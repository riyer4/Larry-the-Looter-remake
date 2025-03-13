class Play extends Phaser.Scene {
    constructor () {
        super("playScene")

    }

    create() {

        this.p1Score = 0

        this.level1 = this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(5)

        this.cameras.main.setBackgroundColor(0x000000)

    
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySTEAL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        
        
        this.brokenWindow = this.add.sprite(game.config.width/2 + 70, game.config.height/2 - 50, 'brokenWindow', 0).setDepth(0).setScale(2.5)

        this.stereo = this.add.sprite(game.config.width/2 + 70, game.config.height/2 - 50, 'stereo', 0).setDepth(0).setInteractive()
        this.tv = this.add.sprite(game.config.width/2 - 30, game.config.height/2 - 50, 'tv', 0).setDepth(0).setInteractive()


        this.window = this.add.sprite(game.config.width/2 + 70, game.config.height/2 - 50, 'window', 0).setDepth(1).setScale(2.5).setInteractive()

        this.player = new Player(this, 0, 240, 'larryIdle', 0).setOrigin(0, 0).setScale(1.6).setDepth(2)

  


        //this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)

         this.cameras.main.setBounds(0, 0, this.level1.widthInPixels, this.level1.heightInPixels)
         this.cameras.main.startFollow(this.player, true, 0.25, 0.25)

         //this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
 
 

    }

    update() {

        this.player.update()

        // stealing game mechanics

        if (this.checkCollision(this.player, this.window) && Phaser.Input.Keyboard.JustDown(keySTEAL)) {
            this.window.alpha = 0
            
        }

        if (this.window.alpha == 0 && Phaser.Input.Keyboard.JustDown(keySTEAL)) {

            this.stereo.alpha = 0
        }

        

    }

    checkCollision(player, item) {

        if (player.x < item.x + item.width && 
            player.x + player.width > item.x && 
            player.y < item.y + item.height && 
            player.height + player.y > item.y) {
            return true
        } else {
            return false
        }
    }
}
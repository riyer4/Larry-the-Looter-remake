class Play extends Phaser.Scene {
    constructor () {
        super("playScene")

    }

    create() {

        this.p1Score = 0

        this.level1 = this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(5)

        this.cameras.main.setBackgroundColor(0x000000)
        
        this.brokenWindow = this.add.sprite(game.config.width/2 + 70, game.config.height/2 - 50, 'brokenWindow', 0).setDepth(0).setScale(2.5)

        this.stereo = this.add.sprite(game.config.width/2 + 70, game.config.height/2 - 50, 'stereo', 0).setDepth(0).setInteractive()
        this.tv = this.add.sprite(game.config.width/2 - 30, game.config.height/2 - 50, 'tv', 0).setDepth(0).setInteractive()


        this.window = this.add.sprite(game.config.width/2 + 70, game.config.height/2 - 50, 'window', 0).setDepth(1).setScale(2.5).setInteractive()

        this.window2 = this.add.sprite(game.config.width/2 + 770, game.config.height/2 - 50, 'window', 0).setDepth(1).setScale(2.5).setInteractive()


        this.player = new Player(this, 0, 240, 'larryIdle', 0).setOrigin(0, 0).setScale(1.6).setDepth(2)

  


        //this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)

         this.cameras.main.setBounds(0, 0, 3200, this.level1.heightInPixels)
         this.cameras.main.startFollow(this.player, false, 1, 1)

         this.physics.world.setBounds(0, 0, this.level1.widthInPixels, this.level1.heightInPixels)
 
         //animation

         this.anims.create({
            key: 'larry_run',
            frames: [
                { key: 'larryIdle' },
                { key: 'larryRun1' },
                { key: 'larryIdle' },
                { key: 'larryRun2' },
            ],
            frameRate: 6, 
            repeat: -1
        })
 
        this.player.on('animationcomplete', () => {
            this.player.setTexture('larryIdle')
        })


        //keys 

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySTEAL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        

    }

    update() {


        //l/r movement

        if(keyLEFT.isDown) {
            this.player.x -= this.player.moveSpeed
            this.player.anims.stop()
            this.player.setTexture('larryIdle')
        } else if(keyRIGHT.isDown) {
            this.player.x += this.player.moveSpeed
            this.player.anims.play('larry_run', true)
        } else {
            this.player.anims.stop()
            this.player.setTexture('larryIdle')

        }

        // world bounds


        this.player.x = Phaser.Math.Clamp(this.player.x, 0, 3120 - this.player.width)

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
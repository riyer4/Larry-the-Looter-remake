class Play extends Phaser.Scene {
    constructor () {
        super("playScene")

    }

    create() {

        this.p1Score = 0

        this.level1 = this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(5)

        this.cameras.main.setBackgroundColor(0x000000)
        
        this.brokenWindow = this.add.sprite(game.config.width/2 + 70, game.config.height/2 - 50, 'brokenWindow', 0).setDepth(0).setScale(2.5)

        this.stereo = new Loot(this, game.config.width/2 + 70, game.config.height/2 - 50, 'stereo', 0, 100).setDepth(0).setInteractive()
        this.tv = new Loot(this, game.config.width/2 - 30, game.config.height/2 - 50, 'tv', 0, 200).setDepth(0).setInteractive()


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


        //hs 

        this.stolen_highscore = 0
        let stolen_highscoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#000',
            color: '#fff',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 200
        }

        this.stolen_highscoreLeft = this.add.text(borderUISize - borderPadding*2, borderUISize*7 + borderPadding*20, `Highscore: ${this.stolen_highscore}`, stolen_highscoreConfig)

        this.stolen_highscoreLeft.setScrollFactor(0)

        //score 

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        this.scoreLeft.setScrollFactor(0)


        //keys 

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyINTERACT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        keySTEAL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        keyDODGE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        // time

        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 135
        }


        this.gameOver = false

        this.gameTime = this.game.settings.gameTimer // writing down initial time

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'lmao', scoreConfig).setOrigin(0.5)
            this.gameOver = true

        }, null, this)

        this.timeLeft = this.add.text(borderUISize + borderPadding*40, borderUISize + borderPadding*2, `Time: ${this.gameTime}`, timeConfig)

        this.timeLeft.setScrollFactor(0)


    }

    update() {

        // hs mods

        this.stolen_highscoreLeft.text = `Highscore: ${localStorage.getItem('stolen_highscore')}` 
        {
            if (this.p1Score > localStorage.getItem('stolen_highscore')) {
            localStorage.setItem('stolen_highscore', this.p1Score)
            }  
        }

        //timer mods
        if (this.gameOver) {
            this.gameTime = 0
        } else {
            this.gameTime -= 8.25 // subtracting 1 second per frame
        }
        this.timeLeft.text = `Time: ${Math.floor(this.gameTime / 1000)}`


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


        this.player.x = Phaser.Math.Clamp(this.player.x, 0, 3120 - this.player.width) //learned this online 

        // stealing game mechanics

        if (this.checkCollision(this.player, this.window) && Phaser.Input.Keyboard.JustDown(keyINTERACT)) {
            this.window.alpha = 0
            
        }

        if (this.window.alpha == 0 && this.stereo.alpha > 0 && Phaser.Input.Keyboard.JustDown(keySTEAL)) {
            this.moreBooty(this.stereo)
        }

        if (this.window.alpha == 0 && this.tv.alpha > 0 && Phaser.Input.Keyboard.JustDown(keySTEAL)) {
            this.moreBooty(this.tv)
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

    moreBooty(loot) {

        loot.alpha = 0

        //score stuff

        this.p1Score += loot.points
        this.scoreLeft.text = this.p1Score

        loot.destroy()
    }
}
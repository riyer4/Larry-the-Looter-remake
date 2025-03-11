class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene")
    }

    

    preload() {
    
    // image + sprite loading

    // for menu

        this.load.image('menu', './assets/png/menu.png')
        this.load.image('road', './assets/png/menu_road.png')
        this.load.image('larryMain', './assets/png/larry_main.png')
        this.load.image('larryMainRun', './assets/png/larry_main_run.png')
        this.load.image('creditsMain', './assets/png/credits_main.png')
        this.load.image('controlsMain', './assets/png/controls_main.png')


    // for other scenes

        // button image

        this.load.image('button', './assets/png/button.png')

    // for game

        // movement

        this.load.image('larryIdle', './assets/png/larry_idle.png')
        this.load.image('larryRun', './assets/png/larry_run.png')
        this.load.image('larryRun1', './assets/png/larry_run1.png')
        this.load.image('larryRun2', './assets/png/larry_run2.png')

        //interaction items

        this.load.image('window', './assets/png/window.png')
        this.load.image('brokenWindow', './assets/png/broken_window.png')
        this.load.image('stereo', './assets/png/stereo.png')
        this.load.image('tv', './assets/png/tv.png')
        

    // main background

        this.load.image('bg', './assets/png/bg.png')



    //audio!!

        this.load.audio('bgm', './assets/audio/ltl_music.wav')
        this.load.audio('noises', './assets/audio/noises.mp3')
        this.load.audio('countdown', './assets/audio/countdown.mp3')
        this.load.audio('powerup', './assets/audio/powerup.mp3')
        this.load.audio('select', './assets/audio/select.mp3')


    





    

    }



    create() {

        //audio 

        this.anims.create({
            key: 'larry',
            frames: [
                { key: 'larryMain' },
                { key: 'larryMainRun' }
            ],
            frameRate: 2, 
            repeat: -1
        });

        this.mainScreen = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0)
        this.road = this.add.image(30, 160, 'road').setOrigin(0, 0).setScale(2.4)
        this.larryMainSprite = this.add.sprite(170, 380, 'larryMain')

        this.larryMainSprite.play('larry')

        // moving the animation across the screen

        this.startX = 170
        this.endX = 470
        this.moveX = 20

        this.larryMainSprite.on('animationrepeat', () => {
            if (this.larryMainSprite.x < this.endX) {
                this.larryMainSprite.x += this.moveX
            } else {
                this.larryMainSprite.x = this.startX
            }
        })



        let menuConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '18px',
            backgroundColor: '#f0f14e',
            color: '#000',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 0
        }

        this.add.text(150, 300, '[SPACE] to Start', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#ff901f'
        this.add.text(330, 300, '[C] for Controls', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#ff5f85'
        this.add.text(500, 300, '[X] for Credits', menuConfig).setOrigin(0.5)
        

        // highscore

        this.stolen_highscore = 0
        let stolen_highscoreConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            color: '#fff',
            backgroundColor: '#c700b5',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
                left: 5
            },

            fixedWidth: 200
        }
        this.stolen_highscoreLeft = this.add.text(2, 453, `Highscore: ${this.stolen_highscore}`, stolen_highscoreConfig)


        //keys

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyCONTROLS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
        keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //music

        if (!this.game.music) {
            this.game.music = this.sound.add('bgm', { loop: true, volume: 0.3 });
            this.game.music.play();
        } else if (!this.game.music.isPlaying) {
            this.game.music.play();
        }


    }

    
    update() {

        // hs mods 

        this.stolen_highscoreLeft.text = `Highscore: ${localStorage.getItem('stolen_highscore')}` 
        {
            if (this.p1Score > localStorage.getItem('stolen_highscore')) {
            localStorage.setItem('stolen_highscore', this.p1Score)
            }  
        }

        if (Phaser.Input.Keyboard.JustDown(keySTART)) {

            this.sound.play('select')
            this.scene.start('playScene')    
        }

        if (Phaser.Input.Keyboard.JustDown(keyCONTROLS)) {

            this.sound.play('select')
            this.scene.start('controlsScene')    
        }

        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {

            this.sound.play('select')
            this.scene.start('creditsScene')    
        }
    }
}
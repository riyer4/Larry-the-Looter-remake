class Credits extends Phaser.Scene {
    constructor () {
        super("creditsScene")
    }

    create() {


        this.creditsScreen = this.add.tileSprite(0, 0, 640, 480, 'creditsMain').setOrigin(0, 0)

        this.button = this.add.image(game.config.width/2, 310, 'button').setScale(0.5)

        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)


        let creditsConfig = {
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

        this.add.text(320, 440, '[M] -> Menu', creditsConfig).setOrigin(0.5)
        creditsConfig.backgroundColor = '#ff901f'
        creditsConfig.fontSize = '22px'
        this.add.text(320, 170, 'Click the image for original video!', creditsConfig).setOrigin(0.5)


        //make image interactive

        this.button.setInteractive()

        this.button.on('pointerup', () => {
            window.open('https://www.youtube.com/watch?v=Apne-itN6gE&ab_channel=eexot')
        })

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            this.scene.start('menuScene')    
        }
    }

}
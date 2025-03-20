class End extends Phaser.Scene {
    constructor () {
        super("endScene")
    }


    create(data) {

        //bg image

        this.endScreen = this.add.tileSprite(0, 0, 640, 480, 'end').setOrigin(0, 0)

        // score

        this.finalScore = data.finalScore || 0

        let finalScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffd900',
            color: '#000',
            allig: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },

            fixedWidth: 135
        }


        this.finalScoreText = this.add.text(250, 300, `${this.finalScore}`, finalScoreConfig).setOrigin(0, 0)


        // back to main menu

        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        let controlsConfig = {
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

        this.add.text(320, 400, '[M] -> Menu', controlsConfig).setOrigin(0.5)

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            this.scene.start('menuScene')    
        }
    }


}
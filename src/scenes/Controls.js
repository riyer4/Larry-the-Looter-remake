class Controls extends Phaser.Scene {
    constructor () {
        super("controlsScene")
    }

    create() {

        this.controlsScreen = this.add.tileSprite(0, 0, 640, 480, 'controlsMain').setOrigin(0, 0)


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

        controlsConfig.fontSize = '25px'
        controlsConfig.backgroundColor = ''

        this.add.text(320, 180, 'Press the <-> arrows to move', controlsConfig).setOrigin(0.5)
        this.add.text(320, 230, '[E] to interact with objects', controlsConfig).setOrigin(0.5)
        this.add.text(320, 280, '[C] to collect items', controlsConfig).setOrigin(0.5)
        this.add.text(320, 330, '[D] to dodge', controlsConfig).setOrigin(0.5)


    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            this.scene.start('menuScene')    
        }
    }


}
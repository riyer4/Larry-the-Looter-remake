class Credits extends Phaser.Scene {
    constructor () {
        super("creditsScene")
    }

    create() {


        this.creditsScreen = this.add.tileSprite(0, 0, 640, 480, 'creditsMain').setOrigin(0, 0)

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

        this.add.text(320, 400, '[M] -> Menu', creditsConfig).setOrigin(0.5)

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyMENU)) {

            this.scene.start('menuScene')    
        }
    }

}
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

    }

    update() {

    }


}
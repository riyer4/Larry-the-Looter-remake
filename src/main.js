// Ria Iyer
// Larry the Looter (from the Simpsons)\
// Link for the original video:
// https://www.youtube.com/watch?v=Apne-itN6gE&ab_channel=ThEwAvEsHaPa
// Total Time Taken: 20 hrs
// Sources:
// main audio sources came from pixabay
// new loop function sourced from phaser documentation

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    render: {
        pixelArt: true
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [ Menu, Controls, Credits, Play ]
}

let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyLEFT, keyRIGHT, keySTART, keyCREDITS, keyCONTROLS, keyMENU, keySTEAL

// UI sizes!!

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

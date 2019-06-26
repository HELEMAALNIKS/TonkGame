export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('heart', require('../assets/heart.png'))
        this.load.image('background', require('../assets/background.png'))
        this.load.image('star', require('../assets/star.png'))
        this.load.image('bomb', require('../assets/bomb.png'))
        this.load.image('tonk', require('../assets/tonk.png'))
        this.load.image('ice', require('../assets/platform_ice.png'))
        this.load.image('platform', require('../assets/platform_grass.png'))
        this.load.image('ground', require('../assets/platform_ground.png'))
        this.load.image('alien_hat', require('../assets/alien4ushankahat.png'))
        this.load.image('hammer', require('../assets/hamerspritesheetclean.png'))
        this.load.image('hammerup', require('../assets/hammerupnew.png'))
        this.load.image('hammerdown', require('../assets/hammerdownnew.png'))
        this.load.image('putinplaatje', require('../assets/putin.png'))

        this.load.audio('slavking', 'assets/SLAV_KING_Boris_vs._DJ_Blyatman.hd.mp3');
    
        this.load.on('complete', () => {
            console.log("everything is loaded")
            // add code here to switch to the start scene
            this.scene.start("StartScene")
        })
    }
}
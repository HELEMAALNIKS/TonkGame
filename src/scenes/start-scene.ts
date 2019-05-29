import { listeners } from "cluster";

export class StartScene extends Phaser.Scene {

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'background').setOrigin(0, 0)

        // add another image here

        // add text here

        this.add.text(720, 300, 'Tonk Game', { fontFamily: 'FUTURA', fontSize: 70, color: '#FA5858' }).setOrigin(0.5).setStroke('#FF0000', 16)

        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', () => {
            this.scene.start('Level1')
        })
    }
}

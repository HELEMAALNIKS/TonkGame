import { listeners } from "cluster";
import { Game } from "../app";

export class StartScene extends Phaser.Scene {

    private buttonListener : EventListener
    private putin : object
    
    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        this.buttonListener = () => this.nextScene()
        document.addEventListener("joystick0button0", this.buttonListener)

        this.add.image(0, 0, 'background').setOrigin(0, 0)

        // add another image here

        // add text here

        this.add.text(720, 300, 'Tonk Game', { fontFamily: 'FUTURA', fontSize: 70, color: '#FA5858' }).setOrigin(0.5).setStroke('#FF0000', 16)

        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', () => {
            this.nextScene()
            
        })

       var putinplaatje = this.add.image(100,200,"putinplaatje")
    }

    public update() {
        console.log("update");
        (this.game as Game).Arcade.Joysticks.forEach(j => j.update())
    }
    private nextScene() {
        console.log("button") 
        document.removeEventListener("joystick0button0", this.buttonListener)
        this.scene.start('GameScene')
    }
}



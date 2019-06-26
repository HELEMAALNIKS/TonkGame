import { listeners } from "cluster";
import { Game } from "../app";

export class GameOverScene extends Phaser.Scene {

    private buttonListener : EventListener

    constructor() {
        super({key: "GameOverScene"})
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

        this.add.text(720, 300, 'GAME OVER', { fontFamily: 'FUTURA', fontSize: 100, color: '#FA5858' }).setOrigin(0.5).setStroke('#FF0000', 16)
        this.add.text(720, 400, 'Click to play again', { fontFamily: 'FUTURA', fontSize: 60, color: '#FA5858' }).setOrigin(0.5).setStroke('#FF0000', 16)

        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', () => {
            this.nextScene()
            
        })
    }

    public update() {
        console.log("update");
        (this.game as Game).Arcade.Joysticks.forEach(j => j.update())
    }
    private nextScene() {
        console.log("button") 
        document.removeEventListener("joystick0button0", this.buttonListener)
        this.scene.start('StartScene')
    }
}

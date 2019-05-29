import { GameScene } from "../scenes/game-scene"
import { Scenes } from "phaser";
export class Level2 extends Phaser.Scene { 

    private gamescene: GameScene

    constructor() {
        super({ key: "Level2" })
    }
    
    create(): void {
        this.gamescene = new GameScene()
        console.log("wekrt dit?")
    }
    
}


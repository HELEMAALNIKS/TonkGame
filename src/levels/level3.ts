import { GameScene } from "../scenes/game-scene"
import { Scenes } from "phaser";
export class Level3 extends Phaser.Scene { 

    private gamescene: GameScene

    constructor() {
        super({ key: "Level3" })
    }
    
    create(): void {
        this.gamescene = new GameScene()
        console.log("wekrt dit?")
    }
    
}


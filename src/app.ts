import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { StartScene } from "./scenes/start-scene"
import { GameScene } from "./scenes/game-scene"
import { EndScene } from "./scenes/end-scene"
import { Arcade } from "./arcade/arcade"
import { GameOverScene } from "./scenes/game-over-scene"

const config: GameConfig = {
    width: 1440,
    height: 900,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [BootScene, StartScene, GameScene, EndScene, GameOverScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false, 
            gravity: { y: 400 }
        }
    },
    render: { pixelArt: true }
};

export class Game extends Phaser.Game {
    private arcade          : Arcade
    public get Arcade()     : Arcade    { return this.arcade            }

    constructor(config: GameConfig) {
        super(config)

        this.arcade = new Arcade(this)
    }
}

window.addEventListener("load", () => new Game(config))


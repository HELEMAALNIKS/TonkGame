import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { StartScene } from "./start-scene";
import { Enemy } from "../objects/enemy"
import { Grounds } from "../objects/ground";


export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private enemy : Enemy
    private ground: Phaser.GameObjects.Group

    constructor() {
        super({ key: "GameScene" })
    }

    preload() : void {
        this.load.json('levels', 'assets/levels.json')
    }

    init(): void {
        //this.registry.set("score", 0)

        this.physics.world.bounds.width     = 5760
        this.physics.world.bounds.height    = 900
    }

    create(): void {

        // achtergrond herhalen
        for (let b = 0; b < this.physics.world.bounds.width; b=b+3420) {
            const element = this.physics.world.bounds.width[b];
            this.add.image(b, 0, 'background').setOrigin(0, 0)
        
        }
        
        // Dit voegt de player toe
        this.player = new Player(this)

        this.loadEnemies()
        // Dit voegt een enemy toe
        this.enemy = new Enemy(this)

        //platforms initieren
        this.ground = this.add.group({ runChildUpdate: true })

        //ground herhalen
        for (let i = 0; i < this.physics.world.bounds.width; i=i+1400) {
            const element = this.physics.world.bounds.width[i];
            let groundLength = i + 800
            // console.log(groundLength)
            this.ground.addMultiple([
                new Grounds(this, groundLength, 859, "ground"),
            ], true)
        }
        
       // define collisions for bouncing, and overlaps for pickups
        // this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.ground)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemy, this.ground)
        this.physics.add.collider(this.enemy, this.platforms)

        //camera
        this.cameras.main.setSize(1440, 900) // canvas size
        this.cameras.main.setBounds(0, 0, 5760, 900) //world size
        this.cameras.main.startFollow(this.player)
    }
    
    private loadEnemies() {
        
        let levels = this.cache.json.get('levels')
        // console.log(levels.level1.platforms[1].x)
        this.platforms = this.add.group({ runChildUpdate: true })

        let level = 1
        for (let i = 0; i < 3; i++) {
            const element = 3[i];
            console.log(levels.level1.platforms[i].x)
            this.platforms.addMultiple([
                new MovingPlatform(this, levels.level1.platforms[i].x, levels.level1.platforms[i].y, levels.level1.platforms[i].texture),
            ], true)
        }


    }
    update(){
        this.player.update()
        this.enemy.update()
        
    }

}

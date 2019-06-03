import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { StartScene } from "./start-scene";
import { Enemy } from "../objects/enemy"

export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private enemy : Enemy

    constructor() {
        super({ key: "GameScene" })
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
            console.log(b)
            this.add.image(b, 0, 'background').setOrigin(0, 0)
        
        }

        // 11 STARS
        this.stars = this.physics.add.group({
        })
        //Waarom is dit nodig voor de player? Navragen aan bob.
        
        // Dit voegt de player toe
        this.player = new Player(this)

        // Dit voegt een enemy toe
        this.enemy = new Enemy(this)

        //platforms initieren
        this.platforms = this.add.group({ runChildUpdate: true })

        //ground herhalen
        for (let i = 0; i < this.physics.world.bounds.width; i=i+1400) {
            const element = this.physics.world.bounds.width[i];
            let groundLength = i + 800
            console.log(groundLength)
            this.platforms.addMultiple([
                new Platform(this, groundLength, 859, "ground"),
            ], true)
        }

        //platforms ophalen per level
        //https://stackoverflow.com/questions/43726218/how-to-loop-through-a-json-object-with-typescript-angular2
        function levelPlatforms() {
            let level = 1
            if (level == 1) {
                for (let level1 = 0; level1 < array.length; level1++) {
                    const element = array[level1];
                    
                }
            }
        }
        
        // while (level = 1) {
        //     for (let level1 = 0; level1 < array.length; level1++) {
        //         const element = array[level1];
                
        //         this.platforms.addMultiple([
        //             new Platform(this, x, y, "platform"),
        //         ], true)
                
        //     }
        // }
        
       // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemy, this.platforms)
        
        //this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

        //camera
        this.cameras.main.setSize(1440, 900) // canvas size
        this.cameras.main.setBounds(0, 0, 5760, 900) //world size
        this.cameras.main.startFollow(this.player)
    }
    
    // private collectStar(player : Player , star) : void {
    //     this.stars.remove(star, true, true)
    //     this.registry.values.score++
        

    //     // TO DO check if we have all the stars, then go to the end scene
    //     //this.add.text(80, 50, `${score}`, { fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff' }).setOrigin(0.5)
    // }

    update(){
        this.player.update()

        //dit zorgt dat de enemy links en rechts loopt
        setInterval(() => this.enemy.walkleft(),  100/300) 
        setInterval(() => this.enemy.walkright(),  100/100)
        
    }

}

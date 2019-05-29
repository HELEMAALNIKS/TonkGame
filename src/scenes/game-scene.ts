import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { StartScene } from "./start-scene";

export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        //this.registry.set("score", 0)

        this.physics.world.bounds.width     = 5760
        this.physics.world.bounds.height    = 900
    }

    create(): void {

        for (let b = 0; b < this.physics.world.bounds.width; b=b+2880) {
            const element = this.physics.world.bounds.width[b];
            console.log(b)
            this.add.image(b, 0, 'background').setOrigin(0, 0)
        
        }

        // this.add.image(0, 0, 'background').setOrigin(0, 0)
        // this.add.image(2880, 0, 'background').setOrigin(0, 0)       

        //TODO:
        //Uitzoeken hoe achtergrond herhaald kan worden
    

        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        this.add.image(40, 50, 'star')
        


        // TODO add player
        this.player = new Player(this)



        /*this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            // new Platform(this, 800, 874, "ground"),
            // new Platform(this, 2400, 874, "ground"),
            // new Platform(this, 3800, 874, "ground"),
            // new Platform(this, 5200, 874, "ground"),
            new Platform(this, 100, 550, "platform"),
            new Platform(this, 300, 500, "platform"),
            new MovingPlatform(this, 400, 300, "ice")
        ], true)*/

        for (let i = 0; i < this.physics.world.bounds.width; i=i+1400) {
            const element = this.physics.world.bounds.width[i];
            this.platforms = this.add.group({ runChildUpdate: true })
            let groundLength = i + 800
            console.log(groundLength)
            this.platforms.addMultiple([
                new Platform(this, groundLength, 874, "ground"),
            // new Platform(this, 800, 874, "ground"),
            // new Platform(this, 2400, 874, "ground"),
            // new Platform(this, 3800, 874, "ground"),
            // new Platform(this, 5200, 874, "ground"),
            ], true)
        }

        // TODO aan bob vragen waarom de player door de grond heen zakt ¯\_(ツ)_/¯ 
        
       // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

        //camera
        this.cameras.main.setSize(1440, 900) // canvas size
        this.cameras.main.setBounds(0, 0, 5760, 900) //world size
        this.cameras.main.startFollow(this.player)
    }
    

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        

        // TO DO check if we have all the stars, then go to the end scene
        //this.add.text(80, 50, `${score}`, { fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff' }).setOrigin(0.5)
    }

    

    update(){
        this.player.update()
        
    }

}

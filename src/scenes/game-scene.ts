import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { StartScene } from "./start-scene";
//import { myVar } from "../objects/player"
import { Enemy } from "../objects/enemy"
import { Grounds } from "../objects/ground";
import { Game } from "../app";
import { Heart } from "../objects/heart"
import { Hammer } from "../objects/hammer";
import { GameOverScene } from "./game-over-scene";




export class GameScene extends Phaser.Scene {
   

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group

    private enemies : Phaser.Physics.Arcade.Group

    private ground: Phaser.GameObjects.Group
    private jumpListener: EventListener
    private attackListener : EventListener
    private audioListener : EventListener

  
    private heartOne : Heart
    private heartTwo : Heart
    private heartThree : Heart

    private hammer : Hammer

    private cursors: Phaser.Input.Keyboard.CursorKeys   
    private Hit : boolean

    private  overlapCollider



    constructor() {
        super({ key: "GameScene" })

        document.addEventListener("joystick0button8", () => this.leave())
        document.addEventListener("joystick0button9", () => this.leave())
       // document.addEventListener("joystick0button2", () => this.attack())

        
    }

    private leave(){
        window.location.href = "http://hr-cmgt.github.io/arcade-server"
    }

    preload() : void {
        this.load.json('levels', 'assets/levels.json')
      //  this.load.spritesheet('hammer', 'hamerspritesheetclean.png', 37, 45, 18)
    }

    init(): void {
        //this.registry.set("score", 0)

        this.physics.world.bounds.width     = 5760
        this.physics.world.bounds.height    = 900
    }

    create(): void {
        // button event voor jump toevoegen
        this.jumpListener = () => this.jump()
        document.addEventListener("joystick0button0", this.jumpListener)

        this.audioListener = () => this.startSound()
        document.addEventListener("joystick0button5", this.audioListener)


        // button event voor slaan
        this.attackListener = () => this.attack()
        document.addEventListener("joystick0button2", this.attackListener)

        // achtergrond herhalen
        for (let b = 0; b < this.physics.world.bounds.width; b=b+3420) {
            const element = this.physics.world.bounds.width[b];
            this.add.image(b, 0, 'background').setOrigin(0, 0)
        }
    
        // Hartje toevoegen
       
 

      // x = player x - coordinaten
     //   this.add.text(70, 30, `X 1`, { fontFamily: 'FUTURA', fontSize: 30, color: 'black' })   

        // 11 STARS
        this.stars = this.physics.add.group({
        })
        //Waarom is dit nodig voor de player? Navragen aan bob.
        
        // Dit voegt de player toe
        this.player = new Player(this)

        this.loadPlatforms()

        // Dit voegt de hammer toe
        this.hammer = new Hammer(this, this.player, 'hammerup')
      
       

        //platforms initieren
        this.ground = this.add.group({ runChildUpdate: true })
        this.enemies = this.add.group({ runChildUpdate: true })

        this.enemies.add(new Enemy(this, 1000, 200, "alien_hat"))
        this.enemies.add(new Enemy(this, 4000, 200, "alien_hat"))
        this.enemies.add(new Enemy(this, 2500, 200, "alien_hat"))
        this.enemies.add(new Enemy(this, 2000, 200, "alien_hat"))
        this.enemies.add(new Enemy(this, 1800, 200, "alien_hat"))
        this.enemies.add(new Enemy(this, 3300, 200, "alien_hat"))
        this.enemies.add(new Enemy(this, 3000, 200, "alien_hat"))



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
        this.physics.add.collider(this.enemies, this.ground)
        this.physics.add.collider(this.enemies, this.platforms, this.onBouncePlatform)
     
        this.physics.add.collider(this.player, this.enemies, this.colliderer)
      
        this.physics.add.overlap(this.hammer, this.enemies, (hammer : Hammer, enemy : Enemy) => this.hammerColliderer(hammer, enemy));
        

        //camera
        this.cameras.main.setSize(1440, 900) // canvas size
        this.cameras.main.setBounds(0, 0, 5760, 900) //world size
        this.cameras.main.startFollow(this.player)

        

        this.heartOne   = new Heart(this, this.player, -30  , 'heart')
        this.heartTwo   = new Heart(this, this.player, 0    , 'heart')
        this.heartThree = new Heart(this, this.player, 30   , 'heart')

        this.Hit = false

        this.addEnemy()

    
    }
    private jump(): void {
        console.log("Jump")
        this.player.jump()
    }

    private startSound(){
        let music = this.sound.add('slavking')
        music.play()
    }

    
    private enableHammer(){
        
        this.hammer.setTexture('hammerup')
        this.Hit = false
        this.hammer.notHit()
        console.log("Kan weer slaan")

    }

    public attack(){
        
        if (!this.Hit) {
            console.log("Attack")
            this.hammer.setTexture('hammerdown')
            
            this.Hit = true
            this.hammer.Hit()
            console.log("kan niet slaan")
            
            this.time.delayedCall(100, () => this.enableHammer(), [], this)
        }
    }

    public addEnemy(){
        this.enemies.add(new Enemy(this, Math.random() * 10000, Math.random() * 100, "alien_hat"))
        console.log("hoi")
        this.time.delayedCall(600, () => this.addEnemy(), [], this)
    }
        // this.hammer.x = this.player.x + 60
        // this.hammer.y = this.player.y 
     //  this.hammer this.hammer(this,100,100,'hammerdown')

        //het plaatje moet veranderen

        //als hammer en enemy coliden, 
            //moet de enemy verdwijnen
        //het plaatje moet weer normaal
            
    

    private onBouncePlatform(enemy : Enemy, platform : Platform) {
        if(platform.body.touching.left || platform.body.touching.right) {
            enemy.onCollision()
        }
    }
    
    private loadPlatforms() {
        
        let levels = this.cache.json.get('levels')
        // console.log(levels.level1.platforms[1].x)
        this.platforms = this.add.group({ runChildUpdate: true })

        let level = 1
        for (let i = 0; i < 14; i++) {
            const element = 3[i];
            console.log(levels.level1.platforms[i].x)
            this.platforms.addMultiple([
                new Platform(this, levels.level1.platforms[i].x, levels.level1.platforms[i].y, levels.level1.platforms[i].texture),
            ], true)
        }
    }

    private gameOver(){
        this.scene.start("GameOverScene")
    }
    

        // Nieuwe optie toevoegen om ook het type platform in te stellen:
        // let getal = 3
        //     let platform : any
        //     switch (getal) {
        //         case 1: 
        //             console.log("dit is 1");
        //             platform = new Platform(this, levels.level1.platforms[i].x, levels.level1.platforms[i].y, levels.level1.platforms[i].texture)
        //             break
        //         case 2: 
        //             console.log("dit is 2");
        //             platform = new MovingPlatform(this, levels.level1.platforms[i].x, levels.level1.platforms[i].y, levels.level1.platforms[i].texture)
        //             break
        //     }


    colliderer(object1: Player, object2: Enemy){
            object1.x = 70;
            console.log("Geraakt")
            object1.health -= 1
    }

    public hammerColliderer(object1: Hammer, object2: Enemy){
        console.log("can hit? "+this.Hit);
        
        if(this.Hit) {
            console.log("Dit werkt")
            // object2.x = -200000
            object2.destroy()
        }
    }

    update(){
        this.player.update()
        this.hammer.update()

        if (this.hammer.cursors.down.isDown) {
            this.attack()
        } 
        
        for(let joystick of (this.game as Game).Arcade.Joysticks){
            joystick.update()
            
            // just log the values
            // if(joystick.Left)  console.log('LEFT')
            // if(joystick.Right) console.log('RIGHT')
            // if(joystick.Up)    console.log('UP')
            // if(joystick.Down)  console.log('Down')
            
            // use the values to set X and Y velocity of a player
            this.player.setVelocityX(joystick.X * 400)
            // this.player.setVelocityY(joystick.Y * 400)
        
    
        }
            //dit zorgt dat de enemy links en rechts loopt
            

            // for (const enemy of this.enemies.getChildren()) {
            //     let e = enemy as Enemy
            //     e.update
            // }

        this.heartOne.update()
        this.heartTwo.update()
        this.heartThree.update()
           
        if(this.player.health == 2){
            this.heartThree.setVisible(false)
        }
        else if(this.player.health == 1){
            this.heartTwo.setVisible(false)
        }


        else if(this.player.health == 0){
            console.log("Game over")
            this.heartOne.setVisible(false)
            this.gameOver()
        }

       // this.hammer.setTexture("hammerdown")

        // this.heartOneX = this.player.x
        // this.heartOneY = this.player.y - 100

        // this.heartOne set
      
    
       


    }
  
}
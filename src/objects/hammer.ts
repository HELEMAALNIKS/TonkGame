import { GameScene } from "../scenes/game-scene";
import { Player } from "./player";

export class Hammer extends Phaser.Physics.Arcade.Sprite  {

    public cursors: Phaser.Input.Keyboard.CursorKeys
    public div:HTMLElement
    private direction : number = 1
    public game : GameScene
    private player : Player
    private offsetX: number = 30
    private offsetY: number = -100
    
  
    constructor(scene, player:Player, texture:string) {
        super(scene, player.x + 30, player.y - 100, texture)
        this.player = player
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setGravityY(-400)

        this.setCollideWorldBounds(true)
        // this.setBounce(0.2)
        // this.setDragX(600)
        
    }
    
    public Hit() {
        this.offsetX = 120
        this.offsetY = -60
    }

    public notHit() {
        this.offsetX = 30
        this.offsetY = - 100
    }

    public update(): void {


        this.x = this.player.x + this.offsetX
        this.y = this.player.y + this.offsetY
        // this.setVelocityX(500 * this.direction)
        
    // this.x =  .player.y + this.offsetY
        
    }
      
    public jump() {

    }
    // public onCollision() {
    //     this.direction *= -1
    // }
   
    }
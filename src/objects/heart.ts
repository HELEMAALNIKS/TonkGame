import { Player } from "./player";

export class Heart extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    public div:HTMLElement
    private direction : number = 1
  
    private player : Player
    private offsetX : number = 0
    private offsetY : number = 0

    constructor(scene, player:Player, offsetX : number, texture:string) {
        super(scene, player.x + offsetX, player.y - 100, "heart")

        this.player = player
        this.offsetX = offsetX
        this.offsetY = -100
        // this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        // this.scene.physics.add.existing(this)

        // this.setCollideWorldBounds(true)
        // this.setBounce(0.2)
        // this.setDragX(600)
        
        this.update()
    
    }
    

    public update(): void {
        console.log(this.player.x);
        
        this.x = this.player.x + this.offsetX
        this.y = this.player.y + this.offsetY

        // this.x = 1000
        // this.setVelocityX(500 * this.direction)
    }
       
    public onCollision() {
        this.direction *= -1
    }
   
    }
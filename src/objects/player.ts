import { Enemy } from "./enemy";
import {Arcade} from "./arcade"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys   
    public health = 3
    private enemy : Enemy 
    public div:HTMLElement
    private arcade: Arcade;

    constructor(scene) {
        super(scene, 100, 450, "tonk")
        
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.2)
        this.setDragX(5000)
        this.setGravityY(1000)
        this.setGravityX(200)
       
        this.update()
       
    }

   
    public update(): void {
        
        if (this.cursors.left.isDown) {
            this.setVelocityX(-400)
            this.flipX = true
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(400)
            this.flipX = false
        } 
        
        // jump when the body is touching the floor
        // for(let joystick of this.arcade.Joysticks){
        //     joystick.update()

            //console.log("hey")
        
        let grounded = this.body.touching.down 
        if (this.cursors.space.isDown && grounded) {
            this.setVelocityY(-1000)
        }
    
        //export var myVar = this.health;

        // let grounded = this.body.touching.down 
        // if ( joystick.Up && grounded) {
        //     this.setVelocityY(-200)
        // }}
        
    }
}



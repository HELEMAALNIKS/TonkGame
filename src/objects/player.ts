import {Arcade} from "./arcade"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private arcade: Arcade;

    constructor(scene) {
        super(scene, 100, 450, "tonk")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.2)
        this.setDragX(600)
    }

    public update(): void {
        
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            this.flipX = true
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            this.flipX = false
        } 
        

        // jump when the body is touching the floor
        // for(let joystick of this.arcade.Joysticks){
        //     joystick.update()

            //console.log("hey")
        
        // let grounded = this.body.touching.down 
        // if ( joystick.Up && grounded) {
        //     this.setVelocityY(-200)
        // }}
        
    }
}



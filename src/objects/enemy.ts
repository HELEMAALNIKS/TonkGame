import { delay } from "q";

export class Enemy extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys

    constructor(scene) {
        super(scene, 1800, 450, "tonk")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.2)
        this.setDragX(600)
    }
    
    
    public update(): void {
        
       if(this.x > 1000) {

           this.setVelocityX(-200) 
         
         
    
        }
        else {
            
            this.setVelocityX(200) 
        }
        }
        
    }


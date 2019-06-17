export class Enemy extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    public div:HTMLElement
  
    constructor(scene) {
        super(scene, 1800, 450, "alien_hat")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.2)
        this.setDragX(600)
        
        this.update
    
    }
    walkleft(){
        this.setVelocityX(-1000)
    }
    walkright(){
        this.setVelocityX(1000)
    }
    

    public update(): void {
    
    }
        
   
    }
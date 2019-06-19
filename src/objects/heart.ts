export class Heart extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    public div:HTMLElement
    private direction : number = 1
  
    constructor(scene, x: number, y: number, texture:string) {
        super(scene, x, y, "heart")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.2)
        this.setDragX(600)
        
        this.update
    
    }
    

    public update(): void {
        this.setVelocityX(500 * this.direction)
    }
       
    public onCollision() {
        this.direction *= -1
    }
   
    }
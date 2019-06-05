export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 100, 450, "tonk");
        this.x = 200;
        this.y = 400;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        this.setDragX(5000);
        this.setGravityY(1000);
        this.setGravityX(200);
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        this.update();
    }
    getRectangle() {
        return this.div.getBoundingClientRect();
    }
    update() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-400);
            this.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(400);
            this.flipX = false;
        }
        // jump when the body is touching the floor
        let grounded = this.body.touching.down;
        if (this.cursors.space.isDown && grounded) {
            this.setVelocityY(-1000);
        }
    }
}

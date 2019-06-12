export class MovingPlatform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, friction = 1) {
        super(scene, x, y, texture);
        this.scene.physics.add.existing(this);
        let body = this.body;
        body.setAllowGravity(false);
        this.setGravity(0);
        this.setImmovable(true);
        // moving platform
        this.setVelocityX(30);
        // friction 0 to 1 (ice has low friction) // no effect?
        // this.setFrictionX(friction)
        this.startPosition = x;
    }
    update() {
        if (this.x >= this.startPosition + 150) {
            this.setVelocityX(-50);
        }
        else if (this.x <= this.startPosition - 150) {
            this.setVelocityX(50);
        }
    }
}

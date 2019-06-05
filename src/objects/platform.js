export class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, friction = 1) {
        super(scene, x, y, texture);
        this.scene.physics.add.existing(this);
        let body = this.body;
        body.setAllowGravity(false);
        this.setGravity(0);
        this.setImmovable(true);
        // friction 0 to 1 (ice has low friction) // has no effecct
        // this.setFrictionX(-10)
    }
}

class Game {
    constructor() {
        let mario = new Mario();
    }
}
window.addEventListener("load", () => new Game());
class Mario {
    constructor() {
        // properties
        this.lives = 5;
        this.hasGrown = false;
    }
    //methods
    jump() {
    }
    moveBy() {
    }
    shoot() {
    }
    die() {
        //respawn
        //play sounds
        //live --
        this.lives--;
        console.log(this.lives);
    }
}
//# sourceMappingURL=main.js.map
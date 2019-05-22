class Gamescene {
    constructor() {
    }
}
class Hammer {
    constructor() {
    }
}
class Loadscene {
    constructor() {
    }
}
class Tonk {
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
class Gamescene {
    constructor() {
        new Tonk();
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
        console.log("Tonk was created!");
        this.div = document.createElement("tonk");
        document.body.appendChild(this.div);
        this.div.style.transform = `translate(10px, 10px)`;
    }
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
        /*this.lives--
        console.log(this.lives)*/
    }
}
//# sourceMappingURL=main.js.map
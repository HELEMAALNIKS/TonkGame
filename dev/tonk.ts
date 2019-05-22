class Tonk {
    // properties
    lives : number = 5
    hasGrown :boolean = false
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
        this.lives--
        console.log(this.lives)
    }
}
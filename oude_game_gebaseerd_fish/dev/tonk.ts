class Tonk {

    div: HTMLElement
    
    constructor() {
        console.log("Tonk was created!")
        this.div = document.createElement("tonk")
        document.body.appendChild(this.div)
        this.div.style.transform = `translate(10px, 10px)`
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
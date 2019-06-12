import { Player } from "../objects/player";
import { Platform } from "../objects/platform";
import { Enemy } from "../objects/enemy";
import { Grounds } from "../objects/ground";
export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }
    preload() {
        this.load.json('levels', 'assets/levels.json');
    }
    init() {
        //this.registry.set("score", 0)
        this.physics.world.bounds.width = 5760;
        this.physics.world.bounds.height = 900;
    }
    create() {
        // achtergrond herhalen
        for (let b = 0; b < this.physics.world.bounds.width; b = b + 3420) {
            const element = this.physics.world.bounds.width[b];
            this.add.image(b, 0, 'background').setOrigin(0, 0);
        }
        // Hartje toevoegen
        this.add.image(40, 50, 'heart');
        this.add.text(70, 30, `X 1`, { fontFamily: 'FUTURA', fontSize: 30, color: 'black' });
        // 11 STARS
        this.stars = this.physics.add.group({});
        //Waarom is dit nodig voor de player? Navragen aan bob.
        // Dit voegt de player toe
        this.player = new Player(this);
        this.loadPlatforms();
        // Dit voegt een enemy toe
        this.enemy = new Enemy(this);
        //platforms initieren
        this.ground = this.add.group({ runChildUpdate: true });
        //ground herhalen
        for (let i = 0; i < this.physics.world.bounds.width; i = i + 1400) {
            const element = this.physics.world.bounds.width[i];
            let groundLength = i + 800;
            // console.log(groundLength)
            this.ground.addMultiple([
                new Grounds(this, groundLength, 859, "ground"),
            ], true);
        }
        // define collisions for bouncing, and overlaps for pickups
        // this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemy, this.ground);
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.player, this.enemy, this.colliderer);
        //camera
        this.cameras.main.setSize(1440, 900); // canvas size
        this.cameras.main.setBounds(0, 0, 5760, 900); //world size
        this.cameras.main.startFollow(this.player);
    }
    loadPlatforms() {
        let levels = this.cache.json.get('levels');
        // console.log(levels.level1.platforms[1].x)
        this.platforms = this.add.group({ runChildUpdate: true });
        let level = 1;
        for (let i = 0; i < 5; i++) {
            const element = 3[i];
            console.log(levels.level1.platforms[i].x);
            this.platforms.addMultiple([
                new Platform(this, levels.level1.platforms[i].x, levels.level1.platforms[i].y, levels.level1.platforms[i].texture),
            ], true);
        }
    }
    // Nieuwe optie toevoegen om ook het type platform in te stellen:
    // let getal = 3
    //     let platform : any
    //     switch (getal) {
    //         case 1: 
    //             console.log("dit is 1");
    //             platform = new Platform(this, levels.level1.platforms[i].x, levels.level1.platforms[i].y, levels.level1.platforms[i].texture)
    //             break
    //         case 2: 
    //             console.log("dit is 2");
    //             platform = new MovingPlatform(this, levels.level1.platforms[i].x, levels.level1.platforms[i].y, levels.level1.platforms[i].texture)
    //             break
    //     }
    colliderer(object1, object2) {
        object1.x = 700;
        console.log("Geraakt");
    }
    update() {
        this.player.update();
        //dit zorgt dat de enemy links en rechts loopt
        setInterval(() => this.enemy.walkleft(), 100 / 300);
        setInterval(() => this.enemy.walkright(), 100 / 100);
    }
}

import {
    Actor,
    Vector,
    Keys,
    CollisionType,
    SpriteSheet,
    Animation
} from "excalibur";

import { Resources } from "./Resources.js";

export class Player extends Actor {

    constructor(x, y, engine) {

        super({
            pos: new Vector(x, y),
            width: 30,
            height: 50,
            collisionType: CollisionType.Active,
            anchor: new Vector(0.5, 1),
            z: 5
        });
        this.engine = engine
        this.groundY = y;

        this.jumpForce = -700;
        this.gravity = 1800;

        this.onGround = true;
    }

    onInitialize() {

        const runningSheet = SpriteSheet.fromImageSource({
            image: Resources.Player_Running,
            grid: {
                rows: 2,
                columns: 2,
                spriteWidth: Resources.Player_Running.width / 2,
                spriteHeight: Resources.Player_Running.height / 2
            }
        });

        this.animRunning = Animation.fromSpriteSheet(
            runningSheet,
            [0,1,2,3],
            120
        );

        const jumpingSheet = SpriteSheet.fromImageSource({
            image: Resources.Player_Jumping,
            grid: {
                rows: 3,
                columns: 3,
                spriteWidth: Resources.Player_Jumping.width / 3,
                spriteHeight: Resources.Player_Jumping.height / 3
            }
        });

        this.animJumping = Animation.fromSpriteSheet(
            jumpingSheet,
            [0,1,2,3,4,5,6,7,8],
            80
        );

        this.graphics.use(this.animRunning);
        this.graphics.scale = new Vector(2,2);

        this.on("collisionstart", (event) => {
            const name = event.other.owner.constructor.name;

            if (name === "Spike" || name === "Spike_Block") {

                this.scene.engine.isGameOver = true;

                console.log("💀 GAME OVER");
            }
        });
    }

    onPreUpdate(engine, delta) {

        const dt = delta / 1000;

        const camera = engine.currentScene.camera;

        const leftBound = camera.pos.x - 1000;
        if (this.pos.x < leftBound) {
            engine.isGameOver = true;
        }

        this.vel.x = 0;

        this.vel.y += this.gravity * dt;

        if (this.pos.y >= this.groundY) {

            this.pos.y = this.groundY;
            this.vel.y = 0;
            this.onGround = true;

        } else {

            this.onGround = false;
        }

        if (
            this.onGround &&
            (
                engine.input.keyboard.wasPressed(Keys.Space) ||
                engine.input.keyboard.wasPressed(Keys.Up)
            )
        ) {

            this.vel.y = this.jumpForce;
        }

        if (this.onGround) {
            this.graphics.use(this.animRunning);
        } else {
            this.graphics.use(this.animJumping);
        }
    }
}
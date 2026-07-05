import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./Resources.js";

export class Block extends Actor {

    constructor(x, y) {

        super({
            pos: new Vector(x, y),
            width: Resources.Block.width,
            height: Resources.Block.height,
            collisionType: CollisionType.Fixed,
            anchor: new Vector(0.5, 1),
            z: 2
        });

        this.speed = 6;
    }

    onInitialize() {
        this.graphics.use(Resources.Block.toSprite());
        this.scale = new Vector(0.2, 0.2);
    }

    onPreUpdate() {

        this.pos.x -= this.speed;

        if (this.pos.x < -200) {
            this.kill();
        }
    }
}
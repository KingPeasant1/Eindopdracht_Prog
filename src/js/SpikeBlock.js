import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./Resources.js";

export class Spike_Block extends Actor {

    constructor(x, y) {

        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50,
            collisionType: CollisionType.Fixed,
            anchor: new Vector(0.5, 1),
            z: 2
        });

        this.speed = 6;
    }

    onInitialize() {
        this.graphics.use(Resources.Spike_Block.toSprite());
        this.scale = new Vector(1, 1);
    }

    onPreUpdate() {

        this.pos.x -= this.speed;

        if (this.pos.x < -200) {
            this.kill();
        }
    }
}
import { Spike } from "./Spike.js";
import { Block } from "./Block.js";
import { Spike_Block } from "./SpikeBlock.js";

export class Obstacle {

    constructor(game) {
        this.game = game;

        this.patterns = [
            // [],  

            [],

            [{ type: "spike", x: 0 }],

            [{ type: "spike", x: 0 }, { type: "spike", x: 110 }],

            // [{ type: "spike", x: 0 }, {type: "block", x: 100}, { type: "spike", x: 250 }],

            // [{ type: "spike_block", x: 0 }],

            [{type: "block", x: 0}],

            [{ type: "block", x: -100 }, { type: "spike", x: 0 }],

            // [{ type: "spike_block", x: 0 }, { type: "spike", x: 140 }]

        ];
    }

    spawnPattern(startX, groundY) {

        const pattern =
            this.patterns[Math.floor(Math.random() * this.patterns.length)];

        for (const object of pattern) {

            const x = startX + object.x;

                let y = groundY;

            if (object.type === "block") {
                y = groundY - 120;
            }

            switch (object.type) {

                case "spike":
                    this.game.add(new Spike(x, y));
                    break;

                case "block":
                    this.game.add(new Block(x, y));
                    break;

                case "spike_block":
                    this.game.add(new Spike_Block(x, y));
                    break;
            }
        }

        console.log("pattern:", pattern);
    }
}
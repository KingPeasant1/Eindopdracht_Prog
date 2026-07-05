import { Label, Color, Font, Vector } from "excalibur";

export class Score {

    constructor(game) {
        this.game = game;

        this.score = 0;
        this.running = true;

        this.label = new Label({
            text: "Score: 0",
            pos: new Vector(0, 0),
            color: Color.White,
            font: new Font({
                size: 30
            }),
            z: 9
        });

        this.label.anchor = new Vector(1, 0);

        this.label.coordPlane = "screen";

        this.game.add(this.label);
    }

    start() {
        this.running = true;
    }

    stop() {
        this.running = false;
    }

    reset() {
        this.score = 0;
        this.label.text = "Score: 0";
    }

    update(delta) {

        if (!this.running) return;

        this.score += delta * 0.01;

        this.label.text = "Score: " + Math.floor(this.score);

        this.label.pos = new Vector(
            this.game.drawWidth - 20,
            20
        );
    }
}
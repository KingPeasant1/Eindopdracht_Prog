import { Scene, Label, Vector, Color, Font, Keys } from "excalibur";

export class GameOver extends Scene {

    onInitialize(engine) {

        const text = new Label({
            text: "GAME OVER",
            pos: new Vector(950, 400),
            color: Color.Red,
            font: new Font({ size: 80 })
        });

        this.add(text);
    }
}
import { Engine, DisplayMode, Actor, Vector, Label, Color, Font } from "excalibur";

import { Player } from "./Player.js";
import { Resources, ResourceLoader } from "./Resources.js";
import { Obstacle } from "./Obstacle.js";
import { Score } from "./score.js";
import { GameOver } from "./GameOver.js";

const game = new Engine({
    width: 1900,
    height: 940,
    displayMode: DisplayMode.FitScreen
});

game.add("gameover", new GameOver());

let bg1;
let bg2;

const score = new Score(game);
const obstacleManager = new Obstacle(game);

const scrollSpeed = 6;
let spawnTimer = 0;
let spawnDelay = 2000;

game.start(ResourceLoader).then(() => {
    game.showDebug(true);
    let gameOverLabel;

    game.isGameOver = false;

    const player = new Player(350, 850);
    game.add(player);

    game.currentScene.camera.zoom = 1;
    game.currentScene.camera.pos = new Vector(950, 470);

    bg1 = new Actor({
        pos: new Vector(950, 470),
        width: 1900,
        height: 940,
        z: -1
    });

    bg1.graphics.use(Resources.Background.toSprite());
    game.add(bg1);

    bg2 = new Actor({
        pos: new Vector(2850, 470),
        width: 1900,
        height: 940,
        z: -1
    });

    bg2.graphics.use(Resources.Background.toSprite());
    game.add(bg2);

    game.onPreUpdate = (_, delta) => {

        score.update(delta);

        if (game.isGameOver) {
            game.goToScene("gameover");
            return;
        }

        bg1.pos.x -= scrollSpeed;
        bg2.pos.x -= scrollSpeed;

        if (bg1.pos.x <= -950) {
            bg1.pos.x = bg2.pos.x + 1900;
        }

        if (bg2.pos.x <= -950) {
            bg2.pos.x = bg1.pos.x + 1900;
        }

        spawnTimer += delta;

        if (spawnTimer >= spawnDelay) {
            spawnTimer = 0;

            obstacleManager.spawnPattern(
                game.drawWidth + 200,
                850
            );
        }
    };
});
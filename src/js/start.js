import { Engine, DisplayMode } from "excalibur";

import { Menu } from "./menu.js";
import { Game } from "./game.js";
import { GameOver } from "./gameOver.js";

const game = new Engine({
    width: 1900,
    height: 940,
    displayMode: DisplayMode.FitScreen
});

// scenes registreren
game.add("menu", new Menu());
game.add("game", new Game());
game.add("gameover", new GameOver());

game.start().then(() => {
    game.goToScene("menu");
});
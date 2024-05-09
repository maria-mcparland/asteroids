import Phaser from "phaser";

import { SceneKeys } from "./consts/SceneKeys";
import registerScenes from "./registerScenes";
import "./main.css";
const config = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  dom: {
    createContainer: true,
  },
  mode: Phaser.Scale.FIT,

  width: "100%",
  height: "100%",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
game.config.swagUrl = process.env.SWAG_URL;
registerScenes(game);

let params = new URLSearchParams(document.location.search);
let points = params.get("points");

game.scene.start(SceneKeys.TitleScreen, { points: points });

export default game;

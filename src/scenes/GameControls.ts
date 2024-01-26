import Phaser from "phaser";
import FireButton from "../UI/FireButton";
import { GameEvents } from "../consts/GameEvents";

export default class GameControls extends Phaser.Scene {
  preload() {}

  create() {
    const x = this.scale.width * 0.7;
    const y = this.scale.height * 0.9;

    const fireButton = this.add
      .dom(x, y - 30, FireButton())
      .addListener("click")
      .on("click", () => {
        this.game.events.emit(GameEvents.FireButton);
      });
    fireButton.alpha = 0;

    const timeline = this.tweens.createTimeline();
    timeline.add({
      targets: fireButton,
      alpha: 1,
      ease: "Sine.easeOut",
      duration: 700,
      offset: 300,
    });

    timeline.play();
  }
}

import Phaser from "phaser";
import FireButton from "../UI/FireButton";
import { GameEvents } from "../consts/GameEvents";
import VirtualJoystick from "phaser3-rex-plugins/plugins/virtualjoystick.js";

export default class GameControls extends Phaser.Scene {
  preload() {}

  create() {
    const x = this.scale.width * 0.57;
    const y = this.scale.height * 0.9;

    const xJoyStick = this.scale.width * 0.43;
    const yJoyStick = this.scale.height * 0.9;

    var joyStick = new VirtualJoystick(this, { x: xJoyStick, y: yJoyStick });

    //@ts-ignore
    joyStick.on("update", () => {
      this.game.events.emit(GameEvents.JoyStick, joyStick.angle);
    });
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

    timeline.add({
      targets: joyStick,
      alpha: 1,
      ease: "Sine.easeOut",
      duration: 700,
      offset: 300,
    });

    timeline.play();
  }
}

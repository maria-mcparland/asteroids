import Phaser from "phaser";

import { SceneKeys } from "../consts/SceneKeys";
import PlayAgainButton from "../UI/PlayAgainButton";
import BackToTitleButton from "../UI/BackToTitleButton";
import ShopButton from "../UI/ShopButton";
export default class GameOver extends Phaser.Scene {
  points: number = 0;
  currentPoints: number = 0;

  preload() {}

  init(data) {
    this.points = data.score;
    this.currentPoints = data.currentPoints;
  }
  create() {
    this.cameras.main.setBackgroundColor("rgba(255,0,0,1)");

    const width = this.scale.width;
    const height = this.scale.height;
    const x = this.scale.width * 0.5;

    let fontSize = Math.min(width * 0.18, 150);
    const title = this.add.text(x, height * 0.2, "Game Over", {
      fontFamily: "Righteous",
      fontSize: `${fontSize}px`,
      align: "center",
    });
    title.setOrigin(0.5, 0.5);
    title.alpha = 0;
    title.scale = 0;

    fontSize = Math.min(width * 0.18, 50);
    const score = this.add.text(
      x,
      height * 0.4,
      `Current Score: ${this.points}`,
      {
        fontFamily: "Righteous",
        fontSize: `${fontSize}px`,
        align: "center",
      }
    );
    score.setOrigin(0.5, 0.5);
    score.alpha = 0;
    score.scale = 0;

    const totalPoints = this.add.text(
      x,
      height * 0.5,
      `Total Points: ${this.currentPoints}`,
      {
        fontFamily: "Righteous",
        fontSize: `${fontSize - 20}px`,
        align: "center",
      }
    );
    totalPoints.setOrigin(0.5, 0.5);
    totalPoints.alpha = 0;
    totalPoints.scale = 0;

    const y = this.scale.height * 0.8;

    const playAgainButton = this.add
      .dom(x, y - 80, PlayAgainButton())
      .addListener("click")
      .on("click", () => {
        this.scene.start(SceneKeys.Game);
      });
    playAgainButton.alpha = 0;

    const backToTitleButton = this.add
      .dom(x, y + 80, BackToTitleButton())
      .addListener("click")
      .on("click", () => {
        this.scene.start(SceneKeys.TitleScreen);
      });
    backToTitleButton.alpha = 0;

    const shopButton = this.add.dom(x, y, ShopButton);
    shopButton.addListener("click").on("click", () => {
      const points = localStorage.getItem("points");
      const params = new URLSearchParams();
      params.set("points", points || "0");
      const url = `https://shop.unicorn-payments-dev.com/?${params.toString()}`;
      window.open(url, "_blank");
    });

    const timeline = this.tweens.createTimeline();

    timeline.add({
      targets: title,
      alpha: 1,
      scale: 1,
      ease: "Sine.easeOut",
      duration: 300,
    });

    timeline.add({
      targets: score,
      alpha: 1,
      scale: 1,
      ease: "Sine.easeOut",
      duration: 300,
    });

    timeline.add({
      targets: totalPoints,
      alpha: 1,
      scale: 1,
      ease: "Sine.easeOut",
      duration: 300,
    });
    timeline.add({
      targets: playAgainButton,
      alpha: 1,
      ease: "Sine.easeOut",
      duration: 700,
      offset: 100,
    });
    timeline.add({
      targets: shopButton,
      ease: "Quad.easeOut",
      duration: 400,
      offset: 350,
    });

    timeline.add({
      targets: backToTitleButton,
      alpha: 1,
      ease: "Sine.easeOut",
      duration: 700,
      offset: 300,
    });

    timeline.play();
  }
}

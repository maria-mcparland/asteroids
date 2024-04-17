import IPointsService from "../../types/IPointsService";
import IAsteroid from "../../types/IAsteroid";

import { AsteroidSize } from "../AsteroidSize";
import EncrpytionService from "./EncryptionService";

export default class PointsService implements IPointsService {
  private encrpytionService = new EncrpytionService();

  private totalPoints = 0;
  private overallPoints = this.gatherPointsFromLocalStorage();

  get total() {
    return this.totalPoints;
  }
  get overall() {
    return this.overallPoints;
  }

  addForAsteroid(asteroid: IAsteroid) {
    const points = this.forAsteroid(asteroid);
    this.totalPoints += points;
    const pointsStored = this.gatherPointsFromLocalStorage();
    this.overallPoints = pointsStored + points;
    this.updatePointsFromLocalStorage(this.overallPoints);
    return points;
  }

  forAsteroid(asteroid: IAsteroid) {
    switch (asteroid.asteroidSize) {
      default:
      case AsteroidSize.Dust:
        return 0;

      case AsteroidSize.Large:
        return 20;

      case AsteroidSize.Medium:
        return 40;

      case AsteroidSize.Small:
        return 100;
    }
  }

  reset() {
    this.totalPoints = 0;
  }

  updatePointsFromLocalStorage(newPointTotal: number) {
    const encryptedPoints = this.encrpytionService.encryptData(
      newPointTotal.toString()
    );
    localStorage.setItem("points", encryptedPoints);
  }

  gatherPointsFromLocalStorage() {
    const pointsStored = localStorage.getItem("points");
    if (!pointsStored) {
      const encryptedPoints = this.encrpytionService.encryptData("0");
      localStorage.setItem("points", encryptedPoints);
      this.overallPoints = 0;
    } else {
      this.overallPoints = parseInt(
        this.encrpytionService.decryptData(pointsStored)
      );
    }
    return this.overallPoints;
  }
}

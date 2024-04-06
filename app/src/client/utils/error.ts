export default class WeatherAppError extends Error {
  public constructor(msg: string) {
    super(msg);
    this.name = this.constructor.name;
  }
}

export abstract class Base {
  /**
   * The maximum point on the X axis that this instance can occupy.
   */
  public get mx(): number {
    return this.dx + this.width
  }

  /**
   * The maximum point on the Y axis that this instance can occupy.
   */
  public get my(): number {
    return this.dy + this.height
  }

  /**
   * The central point on the X axis.
   */
  public get cx(): number {
    return this.dx + this.width / 2
  }

  /**
   * The central point on the Y axis.
   */
  public get cy(): number {
    return this.dy + this.height / 2
  }

  constructor (
    public dx: number,
    public dy: number,
    public width: number,
    public height: number
  ) {}
}

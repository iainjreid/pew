import { Base } from "./base"
import { createCtx } from "../utils/ctx"

export abstract class Layer extends Base {
  /**
   * The 2D context containing the drawn image.
   */
  readonly ctx = ((_) => (this.drawContent(_), _))(createCtx(this.width, this.height))

  public abstract drawContent(ctx: CanvasRenderingContext2D): void
}

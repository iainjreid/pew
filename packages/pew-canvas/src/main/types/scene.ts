import { Base } from "./base"
import { Layer } from "./layer"
import { createCtx } from "../utils/ctx"

export class Scene extends Base {
  /**
   * The 2D context upon which this Scene will be drawn.
   */
  readonly ctx = createCtx(this.width, this.height)

  /**
   * An array of child Layers.
   */
  readonly layers: Layer[] = []

  constructor(dx: number = 0, dy: number = 0, width: number = innerWidth, height: number = innerHeight) {
    super(dx, dy, width, height)
  }

  public addLayer(layer: Layer): void {
    this.layers[this.layers.length] = layer
  }

  public mountScene(target: HTMLElement): void {
    target.appendChild(this.ctx.canvas)
  }

  public drawRegion(dx: number, dy: number, width: number, height: number): void {
    this.ctx.clearRect(dx, dy, width, height)

    const mx = dx + width
    const my = dy + height

    for (const layer of this.layers) {
      if (dx < layer.mx && mx > layer.dx && dy < layer.my && my > layer.dy) {
        const sx = Math.max(0, dx - layer.dx)
        const sy = Math.max(0, dy - layer.dy)
        const sWidth = Math.min(layer.width, layer.width - (layer.mx - mx))
        const sHeight = Math.min(layer.height, layer.height - (layer.my - my))

        this.ctx.drawImage(layer.ctx.canvas, sx, sy, sWidth, sHeight, layer.dx + sx, layer.dy + sy, sWidth, sHeight)
      }
    }
  }
}

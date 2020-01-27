import { Scene, Layer } from "@chaffity/pew-canvas";

const game = new Scene(0, 0, innerWidth, innerHeight);

function randomColorHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class Ball extends Layer {
  public color = randomColorHex()

  public drawContent(ctx: CanvasRenderingContext2D): void {
    const radius = ctx.canvas.width / 2

    ctx.beginPath()
    ctx.arc(radius, radius, radius, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

game.mountScene(document.body)

const n = 15
for (let i1 = 0; i1 < n; i1++) {
  for (let i2 = 0; i2 < n; i2++) {
    game.addLayer(new Ball(i1 * Math.floor(innerWidth / n), i2 * Math.floor(innerHeight / n), 50, 50))
  }
}

window.addEventListener("click", (ev) => {
  game.drawRegion(game.ctx, ev.pageX - 100, ev.pageY - 100, 200, 200)
})

window.game = game;

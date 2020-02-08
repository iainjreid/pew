import { Layer } from "@chaffity/pew-canvas"
import { pythagoras, radiansToDegrees, getAngleBetweenThreePoints, adjacentLength, oppositeLength } from "@chaffity/pew-utils"

export abstract class Entity extends Layer {
  public friction = {
    value: <number | null>null
  }

  public gravity = {
    /**
     * The horizontal position of the gravity.
     */
    dx: <number | null>null,

    /**
     * The vertical  position of the gravity.
     */
    dy: <number | null>null,

    value: <number>0
  }

  public vector = {
    /**
     * The horizontal value of the vector.
     */
    sx: <number>0,

    /**
     * The vertical value of the vector.
     */
    sy: <number>0,

    /**
     * The magnitude of the vector.
     */
    get magnitude(): number {
      return pythagoras(this.sx, this.sy)
    }
  }

  public updateObject(): void {
    // Process friction
    if (this.friction.value) {
      this.vector.sx = +(this.vector.sx * this.friction.value).toFixed(2)
      this.vector.sy = +(this.vector.sy * this.friction.value).toFixed(2)
    }

    // Process gravity
    if (this.gravity.value) {
      const pointA = { dx: this.gravity.dx || this.dx, dy: this.dy }
      const pointB = { dx: this.dx, dy: this.gravity.dy || this.dy }

      const angle = radiansToDegrees(getAngleBetweenThreePoints(pointA, pointB, this))
      const lengthX = oppositeLength(angle, this.gravity.value)
      const lengthY = adjacentLength(angle, this.gravity.value)

      lengthX && (this.vector.sx += this.dx < pointA.dx ? lengthX : -lengthX)
      lengthY && (this.vector.sy += this.dy < pointB.dy ? lengthY : -lengthY)
    }

    // Process vector
    this.dx += this.vector.sx
    this.dy += this.vector.sy
  }
}

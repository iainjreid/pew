'use strict'

import { Platform, View } from '../../packages/pew/src/main/engine'

/**
 * @todo Add check to ensure total energy in the view is constant over time.
 */

 window.setFPS = (fps) => Platform.config.fpsTarget = fps;

class Ball extends View.Item.with('vectors', 'gravity') {
  constructor () {
    // Set a random position
    super(Platform.utils.randomNumberBetween(60, window.innerWidth - 100), Platform.utils.randomNumberBetween(60, window.innerHeight - 100), 12, 12)

    this.color = Platform.utils.randomColorHex()

    // Set a random trajectory
    this.setVectorX(Platform.utils.randomNumberBetween(-3, 3))
    this.setVectorY(Platform.utils.randomNumberBetween(-3, 3))
  }

  draw (ctx) {
    const radius = this.getWidth() / 2

    ctx.beginPath()
    ctx.arc(radius, radius, radius, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

const layer = View.createLayer()

const marker = new class extends View.Item {
  constructor () {
    super(window.innerWidth / 2, window.innerHeight / 2, 4, 4)
  }

  draw (ctx) {
    const radius = this.getWidth() / 2

    ctx.beginPath()
    ctx.arc(radius, radius, radius, Math.PI * 2, false)
    ctx.fillStyle = '#000'
    ctx.fill()
    ctx.closePath()
  }
}()

const entities = []
layer.addEntity(marker)

for (let i = 0; i < 10; i++) {
  entities.push(layer.addEntity(new Ball()))
}

Platform.loop.add(() => {
  const {upArrow, downArrow, leftArrow, rightArrow} = Platform.input.keyboard
  const {dx, dy} = marker.getCoordinates()

  if (upArrow) {
    marker.setDyCoordinate(dy - 5)
  }

  if (downArrow) {
    marker.setDyCoordinate(dy + 5)
  }

  if (leftArrow) {
    marker.setDxCoordinate(dx - 5)
  }

  if (rightArrow) {
    marker.setDxCoordinate(dx + 5)
  }

  for (let entity of entities) {
    entity.setGravity({ dx, dy })
  }
})

Platform.loop.start()

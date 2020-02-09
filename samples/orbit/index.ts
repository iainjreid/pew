'use strict'

import { Entity, Loop, Scene, keyboard, randomColorHex, randomNumberBetween } from "@chaffity/pew"

class Ball extends Entity {
  constructor () {
    // Set a random position
    super(randomNumberBetween(60, window.innerWidth - 100), randomNumberBetween(60, window.innerHeight - 100), 20, 20)

    // Set a random trajectory
    this.vector.sx = randomNumberBetween(-2, 2)
    this.vector.sy = randomNumberBetween(-2, 2)

    // Set the gravity value
    this.gravity.value = randomNumberBetween(1, 4) / 100
  }

  drawContent (ctx: CanvasRenderingContext2D) {
    const radius = 5

    ctx.beginPath()
    ctx.arc(radius, radius, radius, Math.PI * 2, false)
    ctx.fillStyle = randomColorHex()
    ctx.fill()
    ctx.closePath()
  }
}

const scene = new Scene()
const loop = new Loop()

const marker = new class extends Entity {
  constructor () {
    super(window.innerWidth / 2, window.innerHeight / 2, 4, 4)
  }

  drawContent (ctx: CanvasRenderingContext2D) {
    const radius = 3

    ctx.beginPath()
    ctx.arc(radius, radius, radius, Math.PI * 2, false)
    ctx.fillStyle = '#000'
    ctx.fill()
    ctx.closePath()
  }
}()

const entities: Entity[] = []

scene.addLayer(marker)
loop.add(() => {
  scene.drawRegion(0, 0, innerWidth, innerHeight)
}, scene, 0)

for (let i = 0; i < 10; i++) {
  const ball = new Ball()
  entities.push(ball)
  scene.addLayer(ball)
  loop.add(ball.updateObject, ball, 0)
}

loop.add(() => {
  if (keyboard.upArrow) {
    marker.dy -= 5
  }

  if (keyboard.downArrow) {
    marker.dy += 5
  }

  if (keyboard.leftArrow) {
    marker.dx -= 5
  }

  if (keyboard.rightArrow) {
    marker.dx += 5
  }

  for (let entity of entities) {
    entity.gravity.dx = marker.dx
    entity.gravity.dy = marker.dy
  }
}, null, 0)

scene.mountScene(document.body)
loop.start()

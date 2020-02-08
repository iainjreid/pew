'use strict'

export interface Point {
  dx: number;
  dy: number;
}

let uid = 0

/**
 * @description This method will return a unique string.
 *
 * @returns {String} The unique string
 */
export function generateUid (): string {
  return (uid++).toString(36)
}

export function randomX (): number {
  return randomNumberBetween(100, window.innerWidth - 100)
}

export function randomY (): number {
  return randomNumberBetween(100, window.innerHeight - 100)
}

export function randomNumberBetween (a: number, b: number): number {
  return Math.floor(Math.random() * (b - a + 1) + a)
}

export function randomColorHex (): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

export function getDotProduct (a: number[], b: number[]): number {
  let v = 0
  let i = a.length

  while (i--) {
    v += a[i] * b[i]
  }

  return v
}

export function pythagoras (a: number, b: number): number {
  return Math.sqrt(a * a + b * b)
}

export function adjacentLength (angle: number, hypotenuse: number): number {
  return Math.cos(angle * Math.PI / 180) * hypotenuse
}

export function oppositeLength (angle: number, hypotenuse: number): number {
  return Math.sin(angle * Math.PI / 180) * hypotenuse
}

export function getAngleBetweenThreePoints (a: Point, b: Point, c: Point): number {
  const ab: [number, number] = [b.dx - a.dx, b.dy - a.dy]
  const bc: [number, number] = [c.dx - b.dx, c.dy - b.dy]

  return Math.acos(-getDotProduct(ab, bc) / (pythagoras(...ab) * pythagoras(...bc)))
}

export function getCenterBetweenTwoPoints (a: Point, b: Point): Point {
  return {
    dx: (a.dx + b.dx) / 2,
    dy: (a.dy + b.dy) / 2
  }
}

export function degreesToRadians (degrees: number): number {
  return degrees * Math.PI / 180
}

export function radiansToDegrees (radians: number): number {
  return radians * 180 / Math.PI
}

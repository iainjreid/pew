export function createCtx(width: number, height: number): CanvasRenderingContext2D {
  const canvas = document.createElement('canvas')

  canvas.width = width
  canvas.height = height

  return canvas.getContext('2d') as CanvasRenderingContext2D
}

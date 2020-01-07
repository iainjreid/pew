'use strict'

// Dependencies
import * as config from '../config'

/**
 * @description The loop maintains a consistant frame-rate throughout the lifecycle of the application.
 */

let tasks = []
let renders = []
let shouldRun
let tasksTime = 0
let tasksTicks = 0
let rendersTime = 0
let rendersTicks = 0

/**
 * @description This method will add the supplied function to the processing cycle.
 *
 * @param {Function} fn - The function to add to the processing cycle
 *
 * @returns {Object} The loop object
 */
export function add (fn, priority = 60, scope, isRender = false) {
  // Ensure that a function has been provided
  if (typeof fn !== 'function') {
    throw Error('Only functions may be added to the loop')
  }

  if (isRender) {
    renders.push({ fn, priority, scope })

    // Sort the renders by priority
    renders = renders.sort((a, b) => a.priority < b.priority)
  } else {
    tasks.push({ fn, priority, scope })

    // Sort the task by priority
    tasks = tasks.sort((a, b) => a.priority < b.priority)
  }
}

/**
 * @description This method will start the processing cycle.
 *
 * @returns {Object} The loop object
 */
export function start () {
  shouldRun = true

  window.requestAnimationFrame(() => {
    processTasks()
    processRenders()
  })
}

/**
 * @description This method will stop the processing cycle.
 *
 * @returns {Object} The loop object
 */
export function stop () {
  shouldRun = false
}

function processTasks () {
  if (!shouldRun) {
    return
  }

  // Process Recording - start
  const processingStart = performance.now()

  for (let task of tasks) {
    task.fn.call(task.scope)
  }

  // Process Recording - end
  const processingEnd = performance.now()

  // Process Details
  if (config.performanceDetails) {
    tasksTime += processingEnd - processingStart
  }

  tasksTicks++

  setTimeout(processTasks, 10 - (processingEnd - processingStart))
}

function processRenders () {
  if (!shouldRun) {
    return
  }

  // FPS Recording - start
  const fpsStart = performance.now()

  for (let render of renders) {
    render.fn.call(render.scope)
  }

  // FPS Recording - end
  const fpsEnd = performance.now()
  
  // FPS Details
  if (config.performanceDetails) {
    rendersTime += fpsEnd - fpsStart
  }

  rendersTicks++

  setTimeout(processRenders, 1000 / config.fpsTarget - (fpsEnd - fpsStart))
}

window.onerror = stop

// FPS Details
if (config.performanceDetails) {
  let stats

  if (config.debugBox) {
    stats = document.body.appendChild(document.createElement('div'))

    stats.style.position = 'absolute'
    stats.style.left = '10px'
    stats.style.bottom = '10px'
    stats.style.background = 'white'
    stats.style.padding = '10px'
  }

  let startTime = performance.now()
  let totalTime

  setInterval(() => {
    totalTime = performance.now() - startTime
    tasksTime = (tasksTime / totalTime) * 1000
    tasksTicks = (tasksTicks / totalTime) * 1000

    const debugMsg =
      `(Actual duration: ${roundNumber(totalTime)}ms)\n\n` +
      `RENDERS: [${roundNumber(rendersTicks)}] \n\n` +
      `- Time spent rendering: ${roundNumber(rendersTime)}ms\n` +
      `- Average frame duration: ${roundNumber(totalTime / rendersTicks)}ms\n` +
      `TASKS: [${roundNumber(tasksTicks)}]\n\n` +
      `- Time spent processing: ${roundNumber(tasksTime)}ms\n` +
      `- Average tick duration: ${roundNumber(tasksTime / tasksTicks)}ms`

    if (config.debugBox) {
      stats.innerHTML = debugMsg
    } else {
      console.debug(debugMsg)
    }

    startTime = performance.now()
    tasksTime = 0
    tasksTicks = 0
    rendersTime = 0
    rendersTicks = 0
  }, 1000)
}

function roundNumber (number) {
  return Math.round(number * 1000) / 1000
}

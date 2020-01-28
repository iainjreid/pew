import { Behavior } from "./types/behavior";

/**
 * @description This static method attempts to emulate similar functionality to that found in Scala Traits. There are
 *              a limited set of static properties available on this class that can be mixed in with the basic
 *              functionality already available.
 *
 * @param {*} properties
 *
 * @returns {Item} A new Item with extra functionality from the properties specified
 */
export function applyBehaviors<T, U1>(superclass: T, behaviours: [Behavior<T, U1>]): T & U1 {
  return behaviours.reduce<T & U1>((x, f) => f(x), superclass as any)
}

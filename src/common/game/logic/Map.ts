function props<T>(object: Object, f: (value: T, key: any) => any) {
  const newObject = {}
  for (const prop in object) {
    newObject[prop] = f(object[prop], prop)
  }
  return newObject
}

function interval<T, R>(array: T[], f: (a: T, b: T) => R): R[] {
  const result = []
  array.forEach((element, index) => {
    const isFirstElement = index === 0
    if (isFirstElement) {
      return
    }
    const previousElement = array[index - 1]
    result.push(f(previousElement, element))
  })
  return result
}

export default {
  props,
  interval,
}

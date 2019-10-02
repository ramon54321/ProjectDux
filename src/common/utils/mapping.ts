export function mapProps<T>(object: Object, f: (x: T) => any) {
  const newObject = {}
  for (const prop in object) {
    newObject[prop] = f(object[prop])
  }
  return newObject
}

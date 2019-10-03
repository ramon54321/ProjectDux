export default class Queue<T> {
  private data: T[] = []
  enqueue(element: T) {
    this.data.push(element)
  }
  dequeue(f?: (e: T) => void): T | undefined {
    const element = this.data.shift()
    if (f) {
      f(element)
    }
    return element
  }
  dequeueAll(f: (e: T) => void) {
    let element = this.dequeue()
    while (element) {
      f(element)
      element = this.dequeue()
    }
  }
}

import * as UUID from 'uuid'

export function generateId(): string {
  return UUID.v4()
}

export function generateShortId(): string {
  return getShortId(generateId())
}

export function getShortId(longId: string): string {
  return longId.substr(0, 8)
}

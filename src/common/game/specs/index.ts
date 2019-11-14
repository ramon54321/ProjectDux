import { Specs } from "../types/Specs"
import { UnitType } from "../types/State"

const Rifleman = {
  displayName: 'Rifleman',
  speed: 5,
  turnRadius: 5,
}

const specsMap: { [P in keyof Specs]: Specs[P] } = {
  Rifleman,
}

function getSpecs<T extends UnitType>(type: T): Specs[T] {
  return specsMap[type]
}

export default {
  getSpecs,
}

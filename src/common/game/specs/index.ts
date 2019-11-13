import { Specs } from "../types/Specs"
import { UnitType } from "../types/State"

const specsMap: SpecMap = {
  Rifleman: {
    speed: 5,
    turnRadius: 5,
  }
}

type SpecMap = { [P in keyof Specs]: Specs[P] }

function getSpecs<T extends UnitType>(type: T): Specs[T] {
  return specsMap[type]
}

export default {
  getSpecs,
}

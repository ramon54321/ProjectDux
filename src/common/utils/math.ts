export const inverseLerp = (a: number, b: number, x: number) => (x - a) / (b - a)
export const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t

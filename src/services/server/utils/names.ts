const firstnames = [
  'James',
  'Andrew',
  'Jonny',
  'Henry',
  'John',
  'Chester',
  'Victor',
  'Brandon',
  'Alexander',
  'Michael',
  'Andy',
  'Anson',
  'Aires',
  'Atwell',
  'Baker',
  'Bryce',
  'Randal',
  'Robin',
  'Rob',
  'Robson',
  'Wendy',
  'Jaxon',
  'Justin',
  'Jason',
  'Kolton',
]

const lastnames = [
  'van der Berg',
  'Smith',
  'Washington',
  'Bennett',
  'Wood',
  'Barnes',
  'Ross',
  'Henderson',
  'Coleman',
  'Jenkins',
  'Powell',
  'Long',
  'Hughes',
  'Patterson',
  'Flores',
  'Perry',
  'Simmons',
  'Foster',
  'Gonzales',
  'Butler',
]

const initials = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Y'
]

const getRandomInArray = (x: any[]) => x[Math.floor(Math.random() * x.length)]

export function generateRandomName(): string {
  const firstname = getRandomInArray(firstnames)
  const lastname = getRandomInArray(lastnames)
  const initial = getRandomInArray(initials)
  return `${firstname} ${initial}. ${lastname}`
}

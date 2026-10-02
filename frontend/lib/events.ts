export type EventCategory = 'Tech' | 'Arts' | 'Career' | 'Sports' | 'Community'

export type CampusEvent = {
  id: string
  title: string
  category: EventCategory
  description: string
  date: string
  startTime: string
  endTime: string
  location: string
  seatsLeft: number
  image: string
  imageAlt: string
}

export const EVENTS: CampusEvent[] = [
  {
    id: 'hack-2026',
    title: 'HackU 2026: 24-Hour Hackathon',
    category: 'Tech',
    description: 'Build, ship and pitch an app with your squad. Mentors, prizes and free food all night.',
    date: '2026-10-17',
    startTime: '08:00',
    endTime: '08:00',
    location: 'Engineering Hall, Room 301',
    seatsLeft: 42,
    image: '/events/tech-hackathon.png',
    imageAlt: 'Students collaborating on laptops around a table in a bright classroom during a hackathon',
  },
  {
    id: 'sunset-fest',
    title: 'Sunset Sounds Music Fest',
    category: 'Arts',
    description: 'An evening of student bands, acoustic sets and food stalls on the main lawn.',
    date: '2026-10-24',
    startTime: '17:00',
    endTime: '22:00',
    location: 'University Oval Lawn',
    seatsLeft: 180,
    image: '/events/music-fest.png',
    imageAlt: 'A student band performing on an outdoor stage at golden hour in front of a cheering crowd',
  },
  {
    id: 'career-fair',
    title: 'Fall Career & Internship Fair',
    category: 'Career',
    description: 'Meet 60+ employers, get your résumé reviewed and land your next internship.',
    date: '2026-10-29',
    startTime: '09:00',
    endTime: '16:00',
    location: 'Student Center Atrium',
    seatsLeft: 95,
    image: '/events/career-fair.png',
    imageAlt: 'Students speaking with recruiters at company booths inside a bright university atrium',
  },
  {
    id: 'green-campus',
    title: 'Green Campus Tree Planting',
    category: 'Community',
    description: 'Help plant 500 native saplings and earn community service hours.',
    date: '2026-11-07',
    startTime: '07:00',
    endTime: '11:00',
    location: 'North Campus Field',
    seatsLeft: 12,
    image: '/events/tree-planting.png',
    imageAlt: 'Smiling students wearing gloves planting tree saplings together on a sunny campus field',
  },
  {
    id: 'fun-run',
    title: 'Run for a Cause 5K Fun Run',
    category: 'Sports',
    description: 'Lace up for a 5K loop around campus. All proceeds go to student scholarships.',
    date: '2026-11-14',
    startTime: '05:30',
    endTime: '09:00',
    location: 'Main Gate to Sports Complex',
    seatsLeft: 230,
    image: '/events/sports-fun-run.png',
    imageAlt: 'Students in green event shirts and race bibs running along a tree-lined campus road',
  },
  {
    id: 'art-exhibit',
    title: 'Fresh Frames Student Art Exhibit',
    category: 'Arts',
    description: 'Opening night for paintings, sculpture and digital work from fine arts majors.',
    date: '2026-11-20',
    startTime: '18:00',
    endTime: '21:00',
    location: 'Fine Arts Gallery, Building C',
    seatsLeft: 60,
    image: '/events/art-exhibit.png',
    imageAlt: 'Visitors viewing colorful paintings and sculptures in a bright white university gallery',
  },
]

export const CATEGORIES: Array<EventCategory | 'All'> = ['All', 'Tech', 'Arts', 'Career', 'Sports', 'Community']

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`
}

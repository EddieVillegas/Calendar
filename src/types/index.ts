export type Reminder = {
    id: string
    date: string
    text: string
    color: string
    city: string
}

export type Reminders = Reminder[]

export type CityWeather = {
  temp: number
  description: string
  icon: string
}
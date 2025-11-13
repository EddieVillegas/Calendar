import {z} from 'zod'

export type Response = {
  weather: Weather | null,
  error: string,
  isLoading: boolean
}

export type Reminder = {
  id: string
  date: string
  text: string
  color: string
  city: string
}

export type Reminders = Reminder[]

export type CityWeather = {
  name: string,
  local_names: Record<string, string>,
  lat: string,
  lon: string,
  country: string
}

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
  weather: z.array(z.object({
    description: z.string()
  }))
})

export type Weather = z.infer<typeof Weather>
  
  
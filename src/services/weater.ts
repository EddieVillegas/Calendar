import type { CityWeather } from "../types"

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

export async function fetchWeatherByCity(
    city: string
): Promise<CityWeather | null> {
  if (!city || !API_KEY) return null

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`

  const res = await fetch(url)
  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return {
    temp: data.main?.temp ?? NaN,
    description: data.weather?.[0]?.description ?? '',
    icon: data.weather?.[0]?.icon ?? ''
  }
}

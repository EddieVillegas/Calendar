import type { CityWeather, Weather } from "../types"

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL


async function fetchData(
  url: string
){
  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  return data
}

export async function fetchWeatherByCity(
    city: string
): Promise<CityWeather[] | null> {
  if (!city || !API_KEY) return null
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(API_KEY)}`
  return fetchData(url)
}

export async function fetchWeatherByLatLon(
  lat: string | null | undefined ,
  lon: string | null | undefined
): Promise<Weather | null> {
  const base_url = 'https://api.openweathermap.org/data/2.5/weather'
  if(!lat || !lon) return null
  const url = `${base_url}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  return fetchData(url)
}
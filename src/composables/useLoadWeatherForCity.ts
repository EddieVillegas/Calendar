import { ref } from "vue"
import type { Response, Weather } from "../types"
import { fetchWeatherByCity, fetchWeatherByLatLon } from "../services/weater"

const weather = ref<Weather | null>(null)
const loadingWeather = ref(false)
const weatherError = ref<string>('')

export async function useLoadWeatherForCity(
    city: string
): Promise<Response>{
  if (!city) {
    weather.value = null
  }
  try {
    loadingWeather.value = true
    weatherError.value = ''
    const resultCity = await fetchWeatherByCity(city)
    if (!resultCity) {
      weatherError.value = 'No se pudo obtener el clima para esta ciudad.'
    }
    const resultWather = resultCity && await fetchWeatherByLatLon(resultCity[0]?.lat, resultCity[0]?.lon)
    if(!resultWather){
      weatherError.value = 'No se pudo obtener el clima para esta ciudad.'
    }
    weather.value = resultWather
  } catch (e) {
    weatherError.value = 'Error al consultar el clima.'
    weather.value = null
  } finally {
    loadingWeather.value = false
  }

  return {
      weather: weather.value,
      error: weatherError.value,
      isLoading: loadingWeather.value,
  }
}
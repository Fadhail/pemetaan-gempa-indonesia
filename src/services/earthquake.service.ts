import { Earthquake } from '@/types/earthquake'
import { JSONParser } from '@/lib/json-parser'

const BMKG_API_URL = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json'

export class EarthquakeService {
  static async fetchLatestEarthquakes(): Promise<Earthquake[]> {
    try {
      const response = await fetch(BMKG_API_URL)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const jsonData = await response.json()
      const earthquakes = JSONParser.parseEarthquakeJSON(jsonData)

      console.log('Fetched earthquakes:', earthquakes.length)
      return earthquakes
    } catch (error) {
      console.error('Failed to fetch earthquakes:', error)
      throw error
    }
  }
}

import { Earthquake } from '@/types/earthquake'

interface RawEarthquakeData {
  Tanggal?: string
  Jam?: string
  DateTime?: string
  Coordinates?: string
  Lintang?: string
  Bujur?: string
  Magnitude?: string
  Kedalaman?: string
  Wilayah?: string
  Potensi?: string
  Dirasakan?: string
  Shakemap?: string
}

interface BMKGApiResponse {
  Infogempa: {
    gempa: RawEarthquakeData | RawEarthquakeData[]
  }
}

export class JSONParser {
  static parseEarthquakeJSON(jsonData: BMKGApiResponse): Earthquake[] {
    try {
      console.log('Raw JSON Response:', jsonData)

      if (!jsonData.Infogempa || !jsonData.Infogempa.gempa) {
        console.warn('Invalid JSON structure: missing Infogempa.gempa')
        return []
      }

      const gempaArray = Array.isArray(jsonData.Infogempa.gempa)
        ? jsonData.Infogempa.gempa
        : [jsonData.Infogempa.gempa]

      console.log('Found earthquakes:', gempaArray.length)

      const earthquakes: Earthquake[] = gempaArray
        .map((gempa) => ({
          tanggal: gempa.Tanggal ?? null,
          jam: gempa.Jam ?? null,
          dateTime: gempa.DateTime ?? null,
          coordinates: gempa.Coordinates ?? null,
          lintang: gempa.Lintang ?? null,
          bujur: gempa.Bujur ?? null,
          magnitude: gempa.Magnitude ?? null,
          kedalaman: gempa.Kedalaman ?? null,
          wilayah: gempa.Wilayah ?? null,
          potensi: gempa.Potensi ?? null,
          dirasakan: gempa.Dirasakan ?? null,
          shakemap: gempa.Shakemap ?? null,
        }))
        .filter((earthquake) => earthquake.tanggal || earthquake.jam || earthquake.magnitude)

      console.log('Parsed earthquakes:', earthquakes)
      return earthquakes
    } catch (error) {
      console.error('Error parsing JSON:', error)
      throw new Error('Failed to parse earthquake JSON data')
    }
  }
}

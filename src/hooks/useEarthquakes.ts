'use client'

import { useState, useEffect } from 'react'
import { Earthquake, FetchState } from '@/types/earthquake'
import { EarthquakeService } from '@/services/earthquake.service'

export function useEarthquakes(): FetchState<Earthquake> {
  const [data, setData] = useState<Earthquake[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const earthquakes = await EarthquakeService.fetchLatestEarthquakes()
        setData(earthquakes)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, isLoading, error }
}

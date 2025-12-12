export interface Earthquake {
  tanggal: string | null
  jam: string | null
  dateTime: string | null
  coordinates: string | null
  lintang: string | null
  bujur: string | null
  magnitude: string | null
  kedalaman: string | null
  wilayah: string | null
  potensi: string | null
  dirasakan: string | null
  shakemap: string | null
}

export interface FetchState<T> {
  data: T[]
  isLoading: boolean
  error: string | null
}

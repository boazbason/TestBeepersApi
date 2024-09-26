export interface Beeper {
  id: string,
  name: string,
  status: string,
  created_at: Date,
  deteonated_at?: Date,
  latitude?: number,
  longitude?: number
}


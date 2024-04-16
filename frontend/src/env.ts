import {z} from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_MOVIE_DATABASE_API: z.string().url(),
  VITE_MOVIE_DATABASE_TOKEN: z.string(),
  VITE_ENABLE_API_DELAY: z.string().transform(value => value === 'true')
})

export const env = envSchema.parse(import.meta.env)
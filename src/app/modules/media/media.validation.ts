import { z } from 'zod'

export const create_media_zod_schema = z.object({
  body: z.object({
    description: z.string({ required_error: 'String is required' }),
    image: z.string({ required_error: 'Cover image is required' }),
    like: z.array(
      z.object({
        userId: z.string(),
        userName: z.string(),
        userImage: z.string(),
      })
    ),
    comments: z.array(
      z.object({
        userId: z.string(),
        userName: z.string(),
        userImage: z.string(),
      })
    ),
  }),
})

export const update_media_zod_schema = z.object({
  body: z.object({
    description: z.string({ required_error: 'String is required' }).optional(),
    image: z.string({ required_error: 'Cover image is required' }).optional(),
  }),
})

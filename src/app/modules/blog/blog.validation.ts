import { z } from 'zod'

export const create_blog_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    name: z.string({ required_error: 'Name is required' }),
    profile: z.string({ required_error: 'Profile is required' }),
    description: z.string({ required_error: 'Description is required' }),
    image: z.array(z.string({ required_error: 'Image is required' })),
    tags: z.array(z.string({ required_error: 'Tags is required' })),
  }),
})

export const update_blog_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    name: z.string({ required_error: 'Name is required' }).optional(),
    profile: z.string({ required_error: 'Profile is required' }).optional(),
    description: z.string({ required_error: 'Description is required' }),
    image: z
      .array(z.string({ required_error: 'Image is required' }))
      .optional(),
    tags: z.array(z.string({ required_error: 'Tags is required' })).optional(),
  }),
})

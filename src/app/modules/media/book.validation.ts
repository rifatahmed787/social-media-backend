import { z } from 'zod'

export const create_book_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    author: z.string({ required_error: 'Author is required' }),
    genre: z.string({ required_error: 'Genre is required' }),
    publisher: z.string({ required_error: 'Publisher is required' }),
    language: z.string({ required_error: 'Language is required' }),
    pages: z.number({ required_error: 'Pages is required' }),
    rating: z.number({ required_error: 'Ratings is required' }),
    price: z.number({ required_error: 'Price is Required' }),
    description: z.string({ required_error: 'String is required' }),
    cover_image: z.string({ required_error: 'Cover image is required' }),
    keynotes: z.array(z.string({ required_error: 'Keynotes is required' })),
    publication_date: z.string({
      required_error: 'Publication Date is required',
    }),
  }),
})

export const update_book_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    author: z.string({ required_error: 'Author is required' }).optional(),
    genre: z.string({ required_error: 'Genre is required' }).optional(),
    publisher: z.string({ required_error: 'Publisher is required' }).optional(),
    language: z.string({ required_error: 'Language is required' }).optional(),
    pages: z.number({ required_error: 'Pages is required' }).optional(),
    rating: z.number({ required_error: 'Ratings is required' }).optional(),
    price: z.number({ required_error: 'Price is required' }).optional(),
    description: z.string({ required_error: 'String is required' }).optional(),
    cover_image: z
      .string({ required_error: 'Cover image is required' })
      .optional(),
    keynotes: z
      .array(z.string({ required_error: 'Keynotes is required' }))
      .optional(),
    publication_date: z
      .string({
        required_error: 'Publication Date is required',
      })
      .optional(),
  }),
})

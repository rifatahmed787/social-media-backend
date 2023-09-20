import { Schema, Types, model } from 'mongoose'
import { BookModel, IBook } from './media.interface'

// And a schema that knows about IUserMethods

const BookSchema = new Schema<IBook, BookModel>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  language: { type: String, required: true },
  pages: { type: Number, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  cover_image: { type: String, required: true },
  keynotes: { type: [String], required: true },
  publication_date: { type: String, required: true },
  added_by: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
})

//validateBookOwnership
BookSchema.statics.validateBookOwnership = async function (
  book_id: Types.ObjectId,
  owner_id: Types.ObjectId
): Promise<Partial<IBook> | null> {
  const book = await Book.findOne({
    _id: new Types.ObjectId(book_id),
    added_by: new Types.ObjectId(owner_id),
  }).lean()

  return book
}

//isBookAvailable
BookSchema.statics.isBookAvailable = async function (
  id: Types.ObjectId
): Promise<Partial<IBook> | null> {
  return await Book.findById(id).lean()
}

export const Book = model<IBook, BookModel>('Book', BookSchema)

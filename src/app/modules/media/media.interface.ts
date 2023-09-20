import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type IBook = {
  title: string
  author: string
  genre: string
  publisher: string
  language: string
  pages: number
  price: number
  rating: number
  description: string
  cover_image: string
  keynotes: string[]
  publication_date: string
  added_by: Types.ObjectId | IUser
}

export type BookModel = {
  validateBookOwnership(
    book_id: Types.ObjectId,
    owner_id: Types.ObjectId
  ): Promise<Partial<IBook> | null>
  isBookAvailable(id: Types.ObjectId | string): Promise<Partial<IBook> | null>
} & Model<IBook>

export type IBookFilter = {
  title?: string
  author?: string
  genre?: string
  publication_date?: string
  searchTerm?: string
}

export type IBookFilteringItems = {
  all_genre: string[]
  all_publication_date: string[]
}

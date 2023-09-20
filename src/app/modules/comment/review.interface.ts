import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'
import { IBook } from '../media/media.interface'

export type IReview = {
  _id?: Types.ObjectId
  rating: number
  review: string
  reviewed_by: Types.ObjectId | IUser
  book_id: Types.ObjectId | IBook
}

// Create a new Model type that knows about IUserMethods when available here...
export type ReviewModel = {
  isBookReviewedByUser(book_id: string, user_id: string): Promise<boolean>
} & Model<IReview>

// User filter type
export type IReviewFilter = {
  rating?: string
  book_id?: string
}

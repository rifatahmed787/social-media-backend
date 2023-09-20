import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'
import { IMedia } from '../media/media.interface'

export type IReview = {
  _id?: Types.ObjectId
  rating: number
  review: string
  reviewed_by: Types.ObjectId | IUser
  media_id: Types.ObjectId | IMedia
}

// Create a new Model type that knows about IUserMethods when available here...
export type ReviewModel = {
  isMediaReviewedByUser(media_id: string, user_id: string): Promise<boolean>
} & Model<IReview>

// User filter type
export type IReviewFilter = {
  rating?: string
  media_id?: string
}

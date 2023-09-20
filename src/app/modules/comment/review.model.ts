import { Schema, Types, model } from 'mongoose'
import { IReview, ReviewModel } from './review.interface'

// And a schema that knows about IUserMethods
const ReviewSchema = new Schema<IReview, ReviewModel>({
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  reviewed_by: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  media_id: { type: Schema.Types.ObjectId, required: true, ref: 'Media' },
})

//isPhone Number Exist
ReviewSchema.statics.isMediaReviewedByUser = async function (
  media_id: string,
  user_id: string
): Promise<boolean> {
  const isExist = await Review.findOne({
    book_id: new Types.ObjectId(media_id),
    reviewed_by: new Types.ObjectId(user_id),
  })

  return isExist ? true : false
}

export const Review = model<IReview, ReviewModel>('Review', ReviewSchema)

import { User } from '../user/user.model'
import { IReview } from './review.interface'
import { Types } from 'mongoose'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { Review } from './review.model'
import { IUser } from '../user/user.interface'
import { Media } from '../media/media.model'

// Create new user
const post_review = async (review_data: IReview): Promise<IReview | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    review_data?.reviewed_by as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // book checking checking
  const isBookExist = await Media.findById(review_data.media_id)

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Media not found')
  }

  const created_review = await Review.create(review_data)

  return created_review
}

// get_reviews_by_id
const get_reviews_by_id = async (
  mediaID: string
): Promise<IReview[] | null> => {
  // book checking checking
  const isBookExist = await Media.isMediaAvailable(mediaID)

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Media not found')
  }

  const media_reviews = await Review.find({ media_id: mediaID })
    .populate('book_id')
    .populate('reviewed_by')

  return media_reviews
}

export const ReviewServices = {
  post_review,
  get_reviews_by_id,
}

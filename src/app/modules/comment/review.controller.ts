import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { ReviewServices } from './review.services'
import { IReview } from './review.interface'

// post review]
const postReview = catchAsync(async (req: Request, res: Response) => {
  const { ...review_data } = req.body

  review_data.reviewed_by = req.logged_in_user._id

  const result = await ReviewServices.post_review(review_data)

  sendResponse<IReview, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Your reviewed added successfully !',
  })
})

// getBookReviews
const getBookReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.get_reviews_by_id(
    req.query?.bookID as string
  )

  sendResponse<IReview[], null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book reviews ',
  })
})

export const ReviewController = {
  postReview,
  getBookReviews,
}

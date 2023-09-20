import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { ReviewController } from './review.controller'

import express from 'express'
import { review_post_zod_schema } from './review.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(review_post_zod_schema),
  authHandler(),
  ReviewController.postReview
)

router.get('/', ReviewController.getBookReviews)

export const ReviewRoute = router

import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { BookController } from './media.controller'
import {
  create_book_zod_schema,
  update_book_zod_schema,
} from './book.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  authHandler(),
  requestValidationHandler(create_book_zod_schema),
  BookController.createBook
)

router.get('/', BookController.allBooks)
router.get('/latest-ten', BookController.latestTenBooks)
router.get('/best-seller', BookController.bestSeller)
router.get('/unique-filter-items', BookController.uniqueFilteringData)

router.get('/:id', BookController.bookDetails)

router.patch(
  '/:id',
  authHandler(),
  requestValidationHandler(update_book_zod_schema),
  BookController.updateBook
)
router.delete('/:id', authHandler(), BookController.deleteBook)

export const BookRoute = router

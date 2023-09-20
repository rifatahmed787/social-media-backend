import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { BookServices } from './book.services'
import pick from '../../../shared/pick'
import { book_filter_keys } from './media.constant'
import { pagination_keys } from '../../../constant/common'

// Create Book
const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...book_data } = req.body
  const user_data = req.logged_in_user
  const result = await BookServices.create_new_book(book_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book created successfully',
  })
})

//  updateBook
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id: book_id } = req.params
  const { _id: owner_id } = req.logged_in_user

  const { ...book_data } = req.body
  const result = await BookServices.update_book(book_data, book_id, owner_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book updated successfully',
  })
})

//  Get all books
const allBooks = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, book_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await BookServices.gel_all_books(filers, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Books retrieved successfully',
  })
})
//  Get all latestTenBooks
const latestTenBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.latest_ten_books()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Books retrieved successfully',
  })
})

//best seller
const bestSeller = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.bestSeller()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Books retrieved successfully',
  })
})

//  Get all books
const uniqueFilteringData = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.get__unique_filtering_items()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Filtering Items retrieved successfully',
  })
})

//   Get   Book Details
const bookDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await BookServices.get_book_details(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book details retrieved successfully',
  })
})

//  Delete   Book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id: book_id } = req.params
  const { _id: seller_id } = req.logged_in_user
  const result = await BookServices.delete_book(book_id, seller_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book deleted successfully',
  })
})

export const BookController = {
  createBook,
  bookDetails,
  updateBook,
  deleteBook,
  allBooks,
  uniqueFilteringData,
  latestTenBooks,
  bestSeller,
}

import { pagination_map } from '../../../helpers/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'
import { filter_book_conditions } from './media.condition'
import ApiError from '../../errors/ApiError'
import {
  IBook,
  IBookFilter,
  IBookFilteringItems as IBookUniqueFilteringItems,
} from './media.interface'
import { Book } from './media.model'
import { User } from '../user/user.model'
import { IUser } from '../user/user.interface'
import httpStatus from 'http-status'
import { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'

// Create new book
const create_new_book = async (
  book_data: IBook,
  user_data: JwtPayload
): Promise<IBook | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    user_data?._id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const created_book = await Book.create(book_data)

  return created_book
}

//  gel_all_books
const gel_all_books = async (
  filers: IBookFilter,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<IBook[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // and conditions (for search and filter)
  const IsConditions = filter_book_conditions(filers) ?? {}

  //
  const all_books = await Book.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)

  const total = await Book.countDocuments(IsConditions)

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: all_books,
  }
}

//  latestTenBooks
const latest_ten_books = async (): Promise<IBook[] | null> => {
  //
  const latest_books = await Book.find({}).sort({ _id: -1 }).limit(10)

  return latest_books
}

//best seller
const bestSeller = async (): Promise<IBook[] | null> => {
  const fiveStar = await Book.find({ rating: { $gte: 4 } })
    .sort({ rating: -1 })
    .limit(9)

  return fiveStar
}

//  gel_all_genre
const get__unique_filtering_items =
  async (): Promise<GenericResponse<IBookUniqueFilteringItems> | null> => {
    // and conditions (for search and filter)
    const all_genre = await Book.distinct('genre')
    const all_publication_date = await Book.distinct('publication_date')
    return {
      data: { all_genre, all_publication_date },
    }
  }

//book detail
const get_book_details = async (id: string): Promise<IBook | null> => {
  const isExist = await Book.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  //
  const book_details = await Book.findById(id).populate('added_by')

  return book_details
}

// Update book
const update_book = async (
  book_data: Partial<IBook>,
  book_id: Types.ObjectId | string,
  owner_id: Types.ObjectId
): Promise<IBook | null> => {
  // book User checking

  if (
    !(await Book.validateBookOwnership(book_id as Types.ObjectId, owner_id))
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not valid owner for this book'
    )
  }

  const updated_book_data = await Book.findByIdAndUpdate(book_id, book_data, {
    new: true,
  }).populate('added_by')

  if (!updated_book_data) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to update book data'
    )
  }

  return updated_book_data
}

//  Delete book
const delete_book = async (
  book_id: string | Types.ObjectId,
  owner_id: Types.ObjectId
): Promise<IBook | null> => {
  // book User checking
  if (
    !(await Book.validateBookOwnership(book_id as Types.ObjectId, owner_id))
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not valid owner for this book'
    )
  }

  const book = await Book.findByIdAndDelete(book_id).populate('added_by')

  if (!book) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to delete book')
  }

  return book
}

export const BookServices = {
  create_new_book,
  update_book,
  gel_all_books,
  get_book_details,
  delete_book,
  get__unique_filtering_items,
  latest_ten_books,
  bestSeller,
}

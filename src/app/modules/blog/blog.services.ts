import { pagination_map } from '../../../helpers/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'

import ApiError from '../../errors/ApiError'
import { User } from '../user/user.model'
import { IUser } from '../user/user.interface'
import httpStatus from 'http-status'
import { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'
import { IBlog, IBlogFilter } from './blog.interface'
import { Blog } from './blog.model'
import { filter_blog_conditions } from './blog.condition'

// Create new blog
const create_new_blog = async (
  blog_data: IBlog,
  user_data: JwtPayload
): Promise<IBlog | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    user_data?._id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const created_blog = await Blog.create(blog_data)

  return created_blog
}

//  gel_all_blogs
const gel_all_blog = async (
  filers: IBlogFilter,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<IBlog[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // and conditions (for search and filter)
  const IsConditions = filter_blog_conditions(filers) ?? {}

  //
  const all_blogs = await Blog.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)

  const total = await Blog.countDocuments(IsConditions)

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: all_blogs,
  }
}

//  latestTenblogs
const latest_ten_blogs = async (): Promise<IBlog[] | null> => {
  //
  const latest_blogs = await Blog.find({}).sort({ _id: -1 }).limit(10)

  return latest_blogs
}

//blog detail
const get_blog_details = async (id: string): Promise<IBlog | null> => {
  const isExist = await Blog.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found')
  }

  //
  const blog_details = await Blog.findById(id).populate('added_by_id')

  return blog_details
}

// Update blog
const update_blog = async (
  blog_data: Partial<IBlog>,
  blog_id: Types.ObjectId | string,
  owner_id: Types.ObjectId
): Promise<IBlog | null> => {
  // blog User checking

  if (
    !(await Blog.validateBlogOwnership(blog_id as Types.ObjectId, owner_id))
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not valid owner for this blog'
    )
  }

  const updated_blog_data = await Blog.findByIdAndUpdate(blog_id, blog_data, {
    new: true,
  }).populate('added_by_id')

  if (!updated_blog_data) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to update blog data'
    )
  }

  return updated_blog_data
}

//  Delete blog
const delete_blog = async (
  blog_id: string | Types.ObjectId,
  owner_id: Types.ObjectId
): Promise<IBlog | null> => {
  // blog User checking
  if (
    !(await Blog.validateBlogOwnership(blog_id as Types.ObjectId, owner_id))
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not valid owner for this blog'
    )
  }

  const blog = await Blog.findByIdAndDelete(blog_id).populate('added_by_id')

  if (!blog) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to delete blog')
  }

  return blog
}

export const BlogServices = {
  create_new_blog,
  update_blog,
  gel_all_blog,
  get_blog_details,
  delete_blog,
  latest_ten_blogs,
}

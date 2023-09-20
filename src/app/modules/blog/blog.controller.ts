import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { blog_filter_keys } from './blog.constant'
import { pagination_keys } from '../../../constant/common'
import { BlogServices } from './blog.services'

// Create blog
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { ...blog_data } = req.body
  const user_data = req.logged_in_user
  const result = await BlogServices.create_new_blog(blog_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Blog created successfully',
  })
})

//  updateblog
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id: blog_id } = req.params
  const { _id: owner_id } = req.logged_in_user

  const { ...blog_data } = req.body
  const result = await BlogServices.update_blog(blog_data, blog_id, owner_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Blog updated successfully',
  })
})

//  Get all blogs
const allBlogs = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, blog_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await BlogServices.gel_all_blog(filers, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Blogs retrieved successfully',
  })
})
//  Get all latestTenblogs
const latestTenBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.latest_ten_blogs()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Blogs retrieved successfully',
  })
})

//   Get   blog Details
const blogDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await BlogServices.get_blog_details(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Blog details retrieved successfully',
  })
})

//  Delete   blog
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id: blog_id } = req.params
  const { _id: seller_id } = req.logged_in_user
  const result = await BlogServices.delete_blog(blog_id, seller_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Blog deleted successfully',
  })
})

export const BlogController = {
  createBlog,
  blogDetails,
  updateBlog,
  deleteBlog,
  allBlogs,
  latestTenBlogs,
}

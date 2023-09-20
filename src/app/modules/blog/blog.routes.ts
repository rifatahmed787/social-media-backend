import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { BlogController } from './blog.controller'
import {
  create_blog_zod_schema,
  update_blog_zod_schema,
} from './blog.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  authHandler(),
  requestValidationHandler(create_blog_zod_schema),
  BlogController.createBlog
)

router.get('/', BlogController.allBlogs)
router.get('/latest-ten', BlogController.latestTenBlogs)
router.get('/:id', BlogController.blogDetails)

router.patch(
  '/:id',
  authHandler(),
  requestValidationHandler(update_blog_zod_schema),
  BlogController.updateBlog
)
router.delete('/:id', authHandler(), BlogController.deleteBlog)

export const BlogRoute = router

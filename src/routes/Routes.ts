import express from 'express'
import { UserRoute } from '../app/modules/user/user.routes'
import { AuthRoute } from '../app/modules/auth/auth.route'
import { UploadRoute } from '../app/modules/cloudinary/upload.route'

import { ReviewRoute } from '../app/modules/comment/review.route'

import { MediaRoute } from '../app/modules/media/media.routes'
import { BlogRoute } from '../app/modules/blog/blog.routes'

const router = express.Router()

const all_routes = [
  { path: '/auth', router: AuthRoute },
  { path: '/upload', router: UploadRoute },
  { path: '/', router: UserRoute },
  { path: '/users', router: UserRoute },
  { path: '/medias', router: MediaRoute },
  { path: '/reviews', router: ReviewRoute },

  { path: '/blog', router: BlogRoute },
]

all_routes.map(item => router.use(item.path, item.router))

export default router
